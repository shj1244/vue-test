const router = require('express').Router();
const passport = require('passport');
const { modelCall } = require('../../util/lib');
const memberModel = require('./_model/memberModel');
const jwt = require('../plugins/jwt');

router.get('/duplicateCheck/:field/:value', async (req, res) => {
    const result = await modelCall(memberModel.duplicateCheck, req.params);
    //console.log(req.params);
    res.json(result);
})

router.post('/', async (req, res) => {
    const result = await modelCall(memberModel.createMember, req);
    //console.log('body',req.body);
    res.json(result);
})

router.post('/loginLocal', async (req, res) => {
    //console.log(req.body);
    //return res.json(req.body);
    passport.authenticate('local', function (err, member, info) { //local은 passport.js의 LocalStrategy 호출
        if (info) {
            res.json({ err: info });
        } else {
            req.login(member, { session: false }, (err) => { //session은 기본값이 true 이고 로그인시 session을 안쓴다(cookie로만 사용)
                if (err) {
                    console.log(err);
                    res.json({ err });
                } else {
                    const token = jwt.getToken(member);
                    const data = memberModel.loginMember(req);
                    //console.log("login data", data);
                    member.mb_login_at = data.mb_login_at;
                    member.mb_login_ip = data.mb_login_ip;
                    res.json({ member, token });
                }
            })
        }
    })(req, res);
})
module.exports = router;