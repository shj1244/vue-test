const fs = require('fs');
const db = require('../../plugins/mysql');
const jwt = require('../../plugins/jwt');
const sendMailer = require('../../plugins/sendMailer');
const path = require('path');

const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');
const { LV, isGrant } = require('../../../util/level')
const moment = require('../../../util/moment');
const { getIp } = require('../../../util/lib');


function clearMemberField(member) {
    delete member.mb_password;
    member.mb_create_at = moment(member.mb_create_at).format('LT');
    member.mb_update_at = moment(member.mb_update_at).format('LT');
    if (member.mb_login_at) {
        member.mb_login_at = moment(member.mb_login_at).format('LT');
    }
    if (member.mb_leave_at) {
        member.mb_leave_at = moment(member.mb_leave_at).format('LT');
    }
    if (member.mb_birth) {
        member.mb_birth = moment(member.mb_birth).format('L');
    }
    return member;
}

async function getDefaultMemberLevel() {
    const sql = sqlHelper.SelectSimple(
        TABLE.MEMBER,
        null,
        ['COUNT(*) AS cnt']
    );
    //console.log(sql);
    const [[row]] = await db.execute(sql.query, sql.values);
    //console.log(row);
    if (row.cnt > 0) {
        return LV.MEMBER;
    } else {
        return LV.SUPER;
    }

}

const memberModel = {
    async duplicateCheck({ field, value }) {
        // console.log('duplicateCheck', field, value);
        //const sql = 'SELECT COUNT(*) FROM member WHERE mb_id=id'
        const sql = sqlHelper.SelectSimple(
            TABLE.MEMBER,
            { [field]: value },
            ['COUNT(*) AS cnt']
        );
        //console.log(sql);
        //return{field, value}
        const [[row]] = await db.execute(sql.query, sql.values);
        //console.log(row);
        return row;
    },
    async createMember(req) {
        //console.log("createMember", req.body);
        //console.log("Image", req.files);

        //날짜 및 현재시간으로 나옴.
        const at = moment().format('LT');
        const ip = getIp(req);
        //console.log('IP',ip);

        const payload = {
            ...req.body,
            //mb_password : 암호화
            mb_level: await getDefaultMemberLevel(),
            mb_create_at: at,
            mb_create_ip: ip,
            mb_update_at: at,
            mb_update_ip: ip,
        };
       
        //DB에 인서트 하기 전에 이미지는 null로 설정
        delete payload.mb_image;
        const fileName = jwt.getRandToken(16);
        //이미지 업로드 처리
        if(req.files && req.files.mb_image){
            payload.mb_photo = `/upload/memberPhoto/${fileName}.jpg`
            //console.log(MEMBER_PHOTO_PATH);
            req.files.mb_image.mv(`${MEMBER_PHOTO_PATH}/${payload.fileName}.jpg`,(err)=>{
                //console.log("img upload err",err)
                if(err) {
                    console.log("Member image upload err",err)
                }
            });
        }
        //console.log('payload===>',payload);

        payload.mb_password = jwt.generatePassword(payload.mb_password);
        const sql = sqlHelper.Insert(TABLE.MEMBER, payload);
        const [row] = await db.execute(sql.query, sql.values);
        //console.log(row.affecttedRows);
        //console.log('가입', row)
        return row.affectedRows == 1;
    },
    async updateMember(req){
        
        //날짜 및 현재시간으로 나옴.
        const at = moment().format('LT');
        const ip = getIp(req);

        const payload = {
            ...req.body,
            //mb_password : 암호화
            mb_update_at: at,
            mb_update_ip: ip,
        };
       
        // 레벨은 관리자모드 admMode true
        const admMode = payload.admMode;
        const mb_id = payload.mb_id;
        const deleteImage = payload.deleteImage;
        //const mb_password = payload.mb_password;
        delete payload.admMode;
        delete payload.mb_id;
        delete payload.deleteImage;
        //delete payload.mb_password;

        // 비밀번호 값이 있으면 변경
        if(payload.mb_password){
            payload.mb_password = jwt.generatePassword(payload.mb_password);
        } else { 
            delete payload.mb_password;
        }

        // 이미지 업로드 처리
        delete payload.mb_image;
        const mb_photo = payload.mb_photo || '';
        //delete payload.mb_photo;

        const photoPathInfo = path.parse(mb_photo);
        const oldName = photoPathInfo.name;        
        const oldFile = `${MEMBER_PHOTO_PATH}/${oldName}.jpg`;
        const cachePath = `${MEMBER_PHOTO_PATH}/.cache`;
        
        if(deleteImage || req.files && req.files.mb_image){
            // true 이면 기존 이미지 삭제
            payload.mb_photo = '';
            try{
                fs.unlinkSync(oldFile);
                 const cacheDir = fs.readdirSync(cachePath); // 하나의 데이터씩 나누어 출력 
                // 캐쉬파일 삭제
                for( const p of cacheDir){
                    if(p.startsWith(oldName)){
                        try{
                            fs.unlinkSync(`${cachePath}/${p}`);
                        }catch(e){
                            console.log(`delete ${p} error`, e.message);
                        }
                    }
                }
                // cacheDir.forEach(p => {
                //     if(p.startsWith(oldName)){
                //         try{                    
                //             fs.unlinkSync(`${cacheDir}/${p}`);
                //         }catch(e){}
                //     }
                // })
            } catch(e) {
                //console.log("file delete error", e.message);
            }

        }
        //이미지 업로드 처리
        if(req.files && req.files.mb_image){
            // 새로운이미지 이름 생성
            const newName = jwt.getRandToken(16);
            payload.mb_photo = `/upload/memberPhoto/${newName}.jpg`;
            const newFile = `${MEMBER_PHOTO_PATH}/${newName}.jpg`;
            req.files.mb_image.mv(newFile,(err)=>{
                //console.log("img upload err",err)
                if(err) {
                    console.log("Member-Modify image upload err",err)
                }
            });
            
        }
        const sql = sqlHelper.Update(TABLE.MEMBER, payload, { mb_id });
        const [row] = await db.execute(sql.query, sql.values);

        return await memberModel.getMemberBy({mb_id});
    },
    async getMemberBy(form, cols = []) {
        // {mb_id : test, mb_password : hash}
        const sql = sqlHelper.SelectSimple(TABLE.MEMBER, form, cols);
        const [[row]] = await db.execute(sql.query, sql.values);
        if (!row) {
            throw new Error('존재하지 않는 회원입니다.');
        }

        return clearMemberField(row);
        //console.log(row);
    },
    loginMember(req) { //await를 안하기떄문에 async를 삭제
        const data = {
            mb_login_at: moment().format('LT'),
            mb_login_ip: getIp(req)
        };
        const { mb_id } = req.body;
        //console.log(mb_id, data);
        const sql = sqlHelper.Update(TABLE.MEMBER, data, { mb_id });
        //console.log(sql);
        db.execute(sql.query, sql.values);
        return data;
    },
    async findId(data){
        
        const sql = sqlHelper.SelectSimple(TABLE.MEMBER, data, ['mb_id']);
        const [[row]] = await db.execute(sql.query, sql.values);
        if(!row) throw new Error('일치하는 회원이 없습니다.');
        //console.log(row);
        return row;
    },
    async findPw(req){
        const data = req.query;
        //console.log(data)
        const sql = sqlHelper.SelectSimple(TABLE.MEMBER, data, ['mb_name']);
        //console.log("query===>",sql);
        const [[member]] = await db.execute(sql.query, sql.values);
        if(!member) throw new Error('일치하는 회원정보가 없습니다.');

        // 랜덤 토큰을 하나 발급하고
        // 해당 토큰 정보를 DB에 인서트
        // DB TABLE create
        // sm_id, sm_to, sm_type, sm_hash, sm_subject, sm_content, sm_create_at, sm_expire_at
        const sm_hash = jwt.getRandToken(64);
        const title = 'ezCode';
        const sm_subject = `${title} 비밀번호 찾기`;
        const sm_create_at = moment().format('LT');
        const expire_at = moment().add('30', 'm');

        const hostName = req.headers['x-forwarded-host'] || req.headers.host;
        const baseUrl = `${req.protocol}://${hostName}/modifyPassword/`;

        // {{name }} {{link}} {{time}}
        let sm_content = fs.readFileSync(__dirname + '/findPwForm.html').toString();
        sm_content = sm_content.replace('{{name}}', member.mb_name);
        sm_content = sm_content.replace('{{time}}', expire_at.format('LLLL') + '분');
        sm_content = sm_content.replace('{{link}}', baseUrl + sm_hash);

        const sm = {
            sm_to : data.mb_email,
            sm_type : 1,
            sm_hash,
            sm_subject, 
            sm_content, 
            sm_create_at, 
            sm_expire_at : expire_at.format('LT'),
        }

        // 메일발송
        try{
            await sendMailer(`${title} 관리자`, data.mb_email, sm_subject, sm_content);
            const smSql = sqlHelper.Insert(TABLE.SEND_MAIL, sm);
            await db.execute(smSql.query, smSql.values);
        } catch(e) {
            return {err : `email 발송에 실패 하였습니다.\n관리자에게 문의주세요.`};
        }

        return member;
    },
    async modifyPassword(data){
        // 유효시간이 경과한 데이터 삭제
        const delQuery = `DELETE FROM ${TABLE.SEND_MAIL} WHERE sm_type=1 AND sm_expire_at < NOW()`;
		await db.execute(delQuery);

        // 유효시간 안에 있는 해쉬로 검색
        const sql = {
            query: `SELECT sm_to FROM ${TABLE.SEND_MAIL} WHERE sm_type=? AND sm_hash=? AND sm_expire_at > NOW()`,
			values: [1, data.hash]
        };
        const [[row]] = await db.execute(sql.query, sql.values);

        if(!row){
            throw new Error('시간이 만료되었거나 이미 처리되었습니다.');
        }
        const mb_email = row.sm_to;
        const mb_password = await jwt.generatePassword(data.password);
        const upSql = sqlHelper.Update(TABLE.MEMBER, {mb_password}, {mb_email});
        const [upRes] = await db.execute(upSql.query, upSql.values);
        //console.log(upRes);

        // 처리결과 삭제
        const delSql = sqlHelper.DeleteSimple(TABLE.SEND_MAIL, {sm_hash : data.hash});
        db.execute(delSql.query, delSql.values);
        return upRes.affectedRows == 1;
    },
    async socialCallback(req, res, err, member){
        let html = fs.readFileSync(__dirname + '/socialPopup.html').toString();
        //console.log('1111111member===>',member);
        let payload = {};
        if(err){
            payload.err= err;
        }else {
            // 토큰 만들고 쿠키 생성
            const token = jwt.getToken(member);
            req.body.mb_id= member.mb_id;

            const data = memberModel.loginMember(req);
            member.mb_login_at = data.mb_login_at;
            member.mb_login_ip = data.mb_login_ip;
            res.cookie('token', token, {httpOnly :true});
            
            payload.token = token;
            payload.member = member;
        }
        html = html.replace('{{payload}}', JSON.stringify(payload));

        return html;
    },
    async loginGoole(req, profile){
        let member = null;
        try{ // 이미 회원이 있는지 확인
            member = await memberModel.getMemberBy({
                mb_email: profile.email 
            });
            
        } catch(e) { // 회원정보가 없으면 새로 db에 저장
            const at = moment().format('LT');
            const ip = getIp(req);
            const data = {
                mb_id : profile.id,
                mb_password : '',
                mb_name : profile.displayName,
                mb_email : profile.email,
                mb_level : await getDefaultMemberLevel(),
                mb_create_at: at,
                mb_create_ip: ip,
                mb_update_at: at,
                mb_update_ip: ip,
            };
            const sql = sqlHelper.Insert(TABLE.MEMBER, data);
            await db.execute(sql.query, sql.values);
            member = await memberModel.getMemberBy({
                mb_email: profile.email 
            });
        }
        return member;
    },
    async loginKakao(req, profile){
        let member = null;
        try{ // 이미 회원이 있는지 확인
            member = await memberModel.getMemberBy({
                mb_email: profile._json.kakao_account.email
            });
            
        } catch(e) { // 회원정보가 없으면 새로 db에 저장
            const at = moment().format('LT');
            const ip = getIp(req);
            const data = {
                mb_id : profile.id,
                mb_password : '',
                mb_provider : profile.provider,
                mb_name : profile._json.properties.nickname,
                mb_gender : profile._json.kakao_account.gender == 'male' ? 'M' : 'F',
                mb_email : profile._json.kakao_account.email,
                mb_photo : profile._json.properties.thumbnail_image,
                mb_level : await getDefaultMemberLevel(),
                mb_create_at: at,
                mb_create_ip: ip,
                mb_update_at: at,
                mb_update_ip: ip,
            };
            const sql = sqlHelper.Insert(TABLE.MEMBER, data);
            await db.execute(sql.query, sql.values);
            member = await memberModel.getMemberBy({
                mb_email: profile._json.kakao_account.email
            });
        }
        return member;
    },
    async loginNaver(req, profile){
        let member = null;
        try{ // 이미 회원이 있는지 확인
            member = await memberModel.getMemberBy({
                mb_email: profile._json.email
            });
            
        } catch(e) { // 회원정보가 없으면 새로 db에 저장
            const at = moment().format('LT');
            const ip = getIp(req);
            const data = {
                mb_id : profile.id,
                mb_password : '',
                mb_provider : profile.provider,
                mb_name : profile._json.nickname,
                mb_email : profile._json.email,
                mb_photo : profile._json.profile_image,
                mb_level : await getDefaultMemberLevel(),
                mb_create_at: at,
                mb_create_ip: ip,
                mb_update_at: at,
                mb_update_ip: ip,
            };
            const sql = sqlHelper.Insert(TABLE.MEMBER, data);
            await db.execute(sql.query, sql.values);
            member = await memberModel.getMemberBy({
                mb_email: profile._json.email
            });
        }
        return member;
    },
    async checkPassword(req){
        if(!req.user){
            throw new Error('로그인 되어 있지 않습니다.');

        }
        const data = {
            mb_id : req.user.mb_id,
            mb_password : await jwt.generatePassword(req.body.mb_password)
        };
        const sql = sqlHelper.SelectSimple(TABLE.MEMBER, data, ['COUNT(*) AS cnt']);
        const [[{cnt}]] = await db.execute(sql.query, sql.values);
        
        if(cnt == 0){
            throw new Error('비밀번호가 일치 하지 않습니다.');
        } else { 
            return true;
        }
    },
    async getMembers(req){
        if(!isGrant(req, LV.ADMIN)) {
            throw new Error('회원 목록 권한이 없습니다.');
        }
        
        const options = req.query;
        const sql = sqlHelper.SelectLimit(TABLE.MEMBER, options);
        const [items] = await db.execute(sql.query);
        const [[{totalItems}]] = await db.execute(sql.countQuery);
        items.forEach(item => {
            clearMemberField(item);
        });
        return { items, totalItems, sql, options };

    }
}

module.exports = memberModel;