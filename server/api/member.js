const router = require('express').Router();
const passport = require('passport');
const { modelCall } = require('../../util/lib');
const memberModel = require('./_model/memberModel');
const jwt = require('../plugins/jwt');
const fs = require('fs');

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
                    member.mb_login_at = data.mb_login_at;
                    member.mb_login_ip = data.mb_login_ip;
                    res.cookie('token', token, {httpOnly :true});
                    // 이미지가 있는지 확인
                    //if(fs.existsSync(`${MEMBER_PHOTO_PATH}/${member.mb_id}.jpg`)){
                    //    member.mb_image = true;
                    //}
                    res.json({ member, token });
                }
            })
        }
    })(req, res);
})

// 인증
router.get('/auth', (req, res) => {
    //console.log('auth',req.user);
    //res.json(req.user || false);
    const member = req.user || null;
    const token  = req.cookies.token || null;
    res.json({member,token});
})

// 로그아웃
router.get('/signOut', (req,res)=>{
    res.clearCookie('token');
    res.json(true);
})

// 아이디 찾기
router.get('/findId', async(req,res)=>{
    //console.log('query===>',req.query);
    const result = await modelCall(memberModel.findId, req.query);
    res.json(result);
});

// 비밀번호 찾기
router.get('/findPw', async(req,res)=>{
    //console.log('query===>',req.query);
    const result = await modelCall(memberModel.findPw, req);
    res.json(result);
});

module.exports = router;