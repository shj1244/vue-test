const router = require('express').Router();
const { modelCall } = require('../../../util/lib');
const admBoardModel = require('../_model/admBoardModel');


router.get('/skinList', async (req, res) => {
    const result = await modelCall(admBoardModel.skinList);
    res.json(result);
});

// 게시물 가져오기
router.get('/:bo_table', async (req, res) => {
    const result = await modelCall(admBoardModel.getByTable, req);
    res.json(result);
});

// 게시물 리스트
router.get('/', async (req, res) => {
    const result = await modelCall(admBoardModel.getList, req);
    res.json(result);
});

router.post('/', async (req, res) => {
    const result = await modelCall(admBoardModel.createBoard, req);
    res.json(result);
})

// 게시물 수정
router.put('/:bo_table', async (req, res) => {
    const result = await modelCall(admBoardModel.updateBoard, req);
    res.json(result);
})

router.delete('/:bo_table', async (req, res) => {
    const result = await modelCall(admBoardModel.removeBoard, req);
    res.json(result);
})


module.exports = router;