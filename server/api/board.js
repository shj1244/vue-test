const fs = require('fs');
const router = require('express').Router();
const { isGrant, LV } = require('../../util/level');
const { modelCall, getIp } = require('../../util/lib');
const boardModel = require('./_model/boardModel');

async function isModify(config, member, data) {
    let msg = '수정권한이 없습니다.';
    if (member) {
        if (member.mb_level >= LV.SUPER || member.mb_id == wrItem.mb_id) {
            msg = '';
        }
    } else { // 비회원
        // 세션에 비밀번호 정보를 입력
        // TODO : 비밀번호가 맞는지 확인.
    }
    return msg;
}

// 게시판 설정 불러오기
router.get('/config/:bo_table', async (req, res) => {
    const { bo_table } = req.params;
    const result = await modelCall(boardModel.getConfig, bo_table);
    res.json(result);
});

// 에디터 이미지 업로드
router.post('/imageUpload/:bo_table', async (req, res) => {
    const { bo_table } = req.params;
    const { bf_desc } = req.body;
    const result = await modelCall(boardModel.uploadFile, bo_table, bf_desc, req.files.upFile);
    res.json(result)
});

// 에디터 이미지 취소
router.put('/imgCancle/:bo_table', async (req, res) => {
    const { bo_table } = req.params;
    let cnt = 0;
    for (const file of req.body) {
        await modelCall(boardModel.removeFile, bo_table, file);
        cnt++;
    }
    res.json({ cnt });
})

// 신규 게시물 작성
router.post('/write/:bo_table', async (req, res) => {
    const data = req.body;
    const { bo_table } = req.params;
    data.wr_ip = getIp(req);

    // 설정파일 불러와서 쓰기권한이 있는지 체크
    const config = await modelCall(boardModel.getConfig, bo_table);
    const grant = isGrant(req, config.bo_write_level);
    if (!grant) {
        return res.json({ err: '게시물 작성 권한이 없습니다.' });
    }
    //console.log("data===>",typeof data, "...data",data);

    const result = await modelCall(boardModel.writeInsert, bo_table, data, req.files);
    res.json(result);
});

// 게시물 수정
router.put('/write/:bo_table/:wr_id', async (req, res) => {
    //console.log("board.js 게시물 수정====>")
    const data = req.body;
    const { bo_table, wr_id } = req.params;
    data.wr_ip = getIp(req);
    // 권한 확인
    const config = await modelCall(boardModel.getConfig, bo_table);
    const modifyMsg = await isModify(config, req.user, data);
    if (modifyMsg) {
        return res.json({ err: modifyMsg });
    }

    const result = await modelCall(boardModel.writeUpdate, bo_table, wr_id, data, req.files);
    res.json(result);
});

// 게시판 목록 반환
router.get('/list/:bo_table', async (req, res) => {
    const { bo_table } = req.params;
    // 설정파일 불러와서 쓰기권한이 있는지 체크
    const config = await modelCall(boardModel.getConfig, bo_table);
    const grant = isGrant(req, config.bo_write_level);
    if (!grant) {
        return res.json({ err: '게시물 목록 보기 권한이 없습니다.' });
    }
    const options = req.query;
    const result = await modelCall(boardModel.getList, bo_table, config, options, req.user);
    res.json(result);
});

// 해당 게시물 아이디 내용 반환
router.get('/read/:bo_table/:wr_id', async (req, res) => {
    const { bo_table, wr_id } = req.params;

    // 설정파일 불러와서 쓰기권한이 있는지 체크
    const config = await modelCall(boardModel.getConfig, bo_table);
    const grant = isGrant(req, config.bo_write_level);
    if (!grant) {
        return res.json({ err: '게시물 보기 권한이 없습니다.' });
    }

    const result = await modelCall(boardModel.getItem, bo_table, wr_id, req.user);
    res.json(result);
});

router.get('/download/:bo_table/:filename', async (req, res) => {
    const { bo_table, filename } = req.params;
    const config = await modelCall(boardModel.getConfig, bo_table);
    const grant = isGrant(req, config.bo_write_level);
    if (!grant) {
        return res.status(403).end('No file download permission');
    }
    const { src } = req.query;
    const srcFile = `${UPLOAD_PATH}/${bo_table}/${src}`;
    if (!fs.existsSync(srcFile)) {
        return res.status(404).end("File not found.");
    }
    res.download(srcFile, filename);
    //return res.status(400).json({err : 'file not found'});
});

router.delete('/:bo_table/:wr_id', async(req, res) => {
    const {bo_table, wr_id} = req.params;
    const {token} = req.query;
    res.json({bo_table, wr_id, token})
})

module.exports = router;