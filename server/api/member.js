const router = require('express').Router();
const passport = require('passport');
const { modelCall } = require('../../util/lib');
const memberModel = require('./_model/memberModel');
const jwt = require('../plugins/jwt');
//const fs = require('fs');

router.get('/duplicateCheck/:field/:value', async (req, res) => {
    const result = await modelCall(memberModel.duplicateCheck, req.params);
    //console.log(req.params);
    res.json(result);
})

// 회원 정보 생성
router.post('/', async (req, res) => {
    const result = await modelCall(memberModel.createMember, req);
    //console.log('body',req.body);
    res.json(result);
})
// 회원 정보 수정
router.patch('/', async (req, res) => {
    const result = await modelCall(memberModel.updateMember, req);
    //console.log('body',req.body);
    res.json(result);
})

// 로컬 로그인
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
// 비밀번호 수정
router.patch('/modifyPassword', async(req, res)=>{
    const result = await modelCall(memberModel.modifyPassword, req.body)
    res.json(result)
});

// 구글 로그인 요청
router.get('/loginGoogle', passport.authenticate("google", { scope: ["email", "profile"] }));
// 카카오 로그인 요청
router.get('/loginKakao', passport.authenticate("kakao"));
// 네이버 로그인 요청
router.get('/loginNaver', passport.authenticate("naver"));

// 소셜 로그인 콜백
router.get('/social-callback/:provider',  (req, res)=>{
    const provider = req.params.provider;
	passport.authenticate(provider, async function (err, member) {
		// console.log("member",member);
		// console.log("err", err);
		const result = await modelCall(memberModel.socialCallback, req, res,  err, member);
		res.end(result);
	})(req, res);
});


router.post('/checkPassword', async (req, res)=>{
    const result = await modelCall(memberModel.checkPassword, req);
    res.json(result)
})

router.get('/', async(req, res) => {
    const result = await modelCall(memberModel.getMembers, req);
    res.json(result)
})

module.exports = router;