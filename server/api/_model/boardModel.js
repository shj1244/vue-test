const path = require('path');
const fs = require('fs');
const db = require('../../plugins/mysql');
const jwt = require('../../plugins/jwt');

const tagModel = require('./tagModel');
const goodModel = require('./goodModel');

const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');
const moment = require('../../../util/moment');
const { getSummary } = require('../../../util/lib');

const boardModel = {
    async getConfig(bo_table) {
        //console.log("board.js boardmodel bo_table==>",bo_table);
        const sql = sqlHelper.SelectSimple(TABLE.BOARD, { bo_table });
        //console.log("board.js boardmodel sql==>",sql);
        const [[row]] = await db.execute(sql.query, sql.values);
        //console.log("board.js boardmodel row==>",row);
        if (!row) {
            throw new Error(`${bo_table} 게시판이 없습니다.`);
        }
        try {
            row.bo_category = JSON.parse(row.bo_category);
            row.wr_fields = JSON.parse(row.wr_fields);
            row.bo_sort = JSON.parse(row.bo_sort);
        } catch (e) { }
        return row;
    },
    async uploadFile(bo_table, bf_desc, file, wr_id = 0) {
        const ext = path.parse(file.name).ext;
        const time = new Date().getTime();
        const dest = `${UPLOAD_PATH}/${bo_table}/${file.md5}${time}${ext}`;
        file.mv(dest);
        const bf_src = path.parse(dest).base;
        const payload = {
            bo_table,
            wr_id,
            bf_name: file.name,
            bf_src,
            bf_desc,
            bf_type: file.mimetype,
            bf_size: file.size,
            bf_createat: moment().format('LT'),
        }

        const sql = sqlHelper.Insert(TABLE.BOARD_FILE, payload);
        const [rows] = await db.execute(sql.query, sql.values);
        const result = {
            bf_id: rows.insertId,
            bf_src
        }
        return result;
    },
    async removeFile(bo_table, file) {
        const { bf_id, bf_src } = file;
        const filePath = `${UPLOAD_PATH}/${bo_table}/${bf_src}`;
        const cachePath = `${UPLOAD_PATH}/${bo_table}/.cache`;
        const baseName = path.parse(bf_src).name;
        // 파일 삭제
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // 썸네일 삭제
        if (fs.existsSync(cachePath)) {
            const cacheDir = fs.readdirSync(cachePath); // 하나의 데이터씩 나누어 출력 
            // 캐쉬파일 삭제
            for (const p of cacheDir) {
                if (p.startsWith(baseName)) {
                    try {
                        fs.unlinkSync(`${cachePath}/${p}`);
                    } catch (e) {
                        console.log(`delete ${p} error`, e.message);
                    }
                }
            }

        }
        // DB에서 삭제
        const sql = sqlHelper.DeleteSimple(TABLE.BOARD_FILE, { bf_id });
        await db.execute(sql.query, sql.values);
    },
    async writeInsert(bo_table, data, files) {
        // 에디터에서 업로드 한 이미지 목록
        let upImages = [];
        if (data.upImages) {
            upImages = JSON.parse(data.upImages);
        }
        //const upImages = JSON.parse(data.upImages);
        delete data.upImages;
        // 태그 목록

        //console.log("data.wrTags===>", typeof data, "...wrTags==>", data.wrTags);
        let wrTags = [];
        if (data.wrTags) {
            wrTags = JSON.parse(data.wrTags);
            //console.log("wrTags===>", wrTags);
            delete data.wrTags;
        }


        // 게시판 테이블 명
        const table = `${TABLE.WRITE}${bo_table}`;

        // 게시글에 대한 그룹 , 정렬, 깊이
        if (data.wr_parent == 0) { // 새글
            const grpQuery = `SELECT MAX(wr_grp) AS wr_grp FROM ${table} WHERE wr_reply=${data.wr_reply}`;
            let [[{ wr_grp }]] = await db.execute(grpQuery);
            data.wr_grp = wr_grp ? wr_grp + 1 : 1;
            data.wr_order = 0;
            data.wr_dep = 0;
        } else { // 답글
            const grpQuery = `SELECT wr_grp, wr_order, wr_dep FROM ${table} WHERE wr_id=${data.wr_parent}`;
            const [[parent]] = await db.execute(grpQuery);
            data.wr_grp = parent.wr_grp;
            data.wr_order = parent.wr_order + 1;
            data.wr_dep = parent.wr_dep + 1;
            const uSql = `UPDATE ${table} SET wr_order=wr_order+1 
                          WHERE wr_reply = ${data.wr_reply} 
                          AND wr_grp = ${parent.wr_grp}
                          AND wr_order >= ${data.wr_order}`
            await db.execute(uSql);
        }

        // 게시판 작성일
        data.wr_createat = moment().format('LT');
        data.wr_updateat = moment().format('LT');

        // 요약정보
        data.wr_summary = getSummary(data.wr_content, 250);

        if (data.wr_password) { // 비회원 암호
            data.wr_password = jwt.generatePassword(data.wr_password);
        }

        const sql = sqlHelper.Insert(table, data);
        const [rows] = await db.execute(sql.query, sql.values);
        const wr_id = rows.insertId; // 게시물 아이디

        // 태그 등록
        await tagModel.registerTags(bo_table, wr_id, wrTags);

        // 첨부 파일 등록
        if (files) {
            const keys = Object.keys(files);
            for (const key of keys) {
                const file = files[key];
                await boardModel.uploadFile(bo_table, "", file, wr_id);
            }
        }

        // 게시물 내용에서 에디터 이미지가 있는지 여부 확인해서 없는것들을 제거 (작성해서 이미지를 업로드했는데 다른이미지로 바꿀 경우)
        await boardModel.clearImages(bo_table, wr_id, data.wr_content, upImages);
        return { wr_id };

    },
    async writeUpdate(bo_table, wr_id, data, files) {
        //console.log("writeupdate===>");
        const table = `${TABLE.WRITE}${bo_table}`;
        delete data.wr_id;

        // 기존 첨부파일
        let wrFiles = [];
        if (data.wrFiles) {
            const wrFiles = JSON.parse(data.wrFiles);
            delete data.wrFiles;
        }

        // 기존 첨부파일에서 삭제가 침인거
        for (const wrFile of wrFiles) {
            if (wrFile.remove) {
                await boardModel.removeFile(bo_table, wrFile); // 파일 삭제
            }
        }

        // 새로운 첨부 파일 등록
        if (files) {
            const keys = Object.keys(files);
            for (const key of keys) {
                const file = files[key];
                await boardModel.uploadFile(bo_table, "", file, wr_id);
            }
        }

        // 에디터에서 업로드한 이미지 처리
        let upImages = [];
        if (data.upImages && data.wrImgs) {
            upImages = JSON.parse(data.upImages).concat(JSON.parse(data.wrImgs));
            delete data.upImages;
            delete data.wrImgs;
        }


        await boardModel.clearImages(bo_table, wr_id, data.wr_content, upImages);

        // 데이터 정리
        delete data.wr_createat; // 생성일 삭제
        if (data.wr_password) { // 비회원 암호 - 새로운 비밀번호가 있으면
            data.wr_password = jwt.generatePassword(data.wr_password);
        } else {
            delete data.wr_password; // 비밀번호 삭제
        }

        data.wr_updateat = moment().format('LT'); // 수정일 수정
        data.wr_summary = getSummary(data.wr_content, 250); // 내용 수정
        delete data.good; // 좋아요 삭제
        delete data.bad; // 싫어요 삭제
        delete data.replys; // 댓글 삭제
        delete data.goodFlag; //  삭제

        // 태그
        let wrTags = [];
        if (data.wrTags) {
            wrTags = JSON.parse(data.wrTags);
            delete data.wrTags;
        }
        
        await tagModel.registerTags(bo_table, wr_id, wrTags);

        const sql = sqlHelper.Update(table, data, { wr_id });
        const [rows] = await db.execute(sql.query, sql.values);
        return { wr_id };
    },
    async clearImages(bo_table, wr_id, wr_content, upImages) {
        for (const img of upImages) {
            if (wr_content.indexOf(img.bf_src) > -1) { // 게시물에 이미지가 있는경우
                const sql = sqlHelper.Update(TABLE.BOARD_FILE, { wr_id }, { bf_id: img.bf_id });
                await db.execute(sql.query, sql.values);
            } else { // 게시물에 이미지가 없는경우
                await boardModel.removeFile(bo_table, img);
            }
        }
    },
    async getList(bo_table, config, options, member) {
        const table = `${TABLE.VIEW}${bo_table}`;

        options.sortBy = [];
        options.sortDesc = [];
        for (const sort of config.bo_sort) {
            options.sortBy.push(sort.by);
            options.sortDesc.push(sort.desc == 1);
        }


        //getList===>",table);
        //console.log("getList options===>",options);

        const sql = sqlHelper.SelectLimit(table, options);
        const [items] = await db.execute(sql.query, sql.values);
        const [[{ totalItems }]] = await db.execute(sql.countQuery, sql.values);

        return { items, totalItems };
    },
    async getItem(bo_table, wr_id, member) {
        const table = `${TABLE.VIEW}${bo_table}`;

        const sql = sqlHelper.SelectSimple(table, { wr_id });
        const [[item]] = await db.execute(sql.query, sql.values);
        if (!item) {
            throw new Error('게시물이 없습니다.');
        }

        // 첨부파일 목록 붙이고
        const files = await boardModel.getItemFiles(bo_table, wr_id, item.wr_content);
        item.wrImgs = files.wrImgs;
        item.wrFiles = files.wrFiles;

        // 게시물 태그들 
        item.wrTags = await tagModel.getTags(bo_table, wr_id);
        // 좋아요
        if (member) {
            item.goodFlag = await goodModel.getFlag(bo_table, wr_id, member.mb_id);
        } else {
            item.goodFlag = 0;
        }

        delete item.wr_password;
        return item;
    },
    async getItemFiles(bo_table, wr_id, wr_content = "") {
        const sql = sqlHelper.SelectSimple(TABLE.BOARD_FILE, { bo_table, wr_id },
            ['bf_id', 'bf_name', 'bf_src', 'bf_desc', 'bf_type', 'bf_size']
        );
        const [rows] = await db.execute(sql.query, sql.values);
        const wrImgs = []; // 본문에 첨부된 이미지 목록
        const wrFiles = []; // 첨부파일
        for (const row of rows) {
            if (wr_content.indexOf(row.bf_src) > -1) { // 본문에 경로가 있으면
                wrImgs.push(row);
            } else { // 없으니까 첨부파일
                row.remove = false; // 수정할때 첨부파일 삭제 여부
                wrFiles.push(row);
            }
        }
        return { wrImgs, wrFiles }
    },
    async checkItem(bo_table, wr_id, password) {
        const wr_password = jwt.generatePassword(password);
        //console.log('wr_password===>', wr_password);
        const table = `${TABLE.WRITE}${bo_table}`;

        const sql = sqlHelper.SelectSimple(table, {
            wr_id, wr_password
        }, ['COUNT(*) AS cnt']);
        //console.log(sql);
        const [[{ cnt }]] = await db.execute(sql.query, sql.values);
        return cnt;
    }

};


module.exports = boardModel;