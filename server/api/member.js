const router = require('express').Router();
const { modelCall } = require('../../util/lib');
const memberModel = require('./_model/memberModel');

router.get('/duplicateCheck/:field/:value', async (req, res) => {
    const result = await modelCall(memberModel.duplicateCheck, req.params);
    //console.log(req.params);
    res.json(result);
}) 

router.post('/',async (req, res)=>{
    const result = await modelCall(memberModel.createMember, req);
    //console.log('body',req.body);
    res.json(req.body);
})

module.exports = router;