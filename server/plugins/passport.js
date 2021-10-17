require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('../plugins/jwt');
const memberModel = require('../api/_model/memberModel');
const GoogleStrategy = require( 'passport-google-oauth2').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const {LV} = require('../../util/level')

const { 
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET, 
    CALLBACK_URL,
    KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET,
    NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET,
} = process.env;
//const CALLBACK_URL = DEV_ENV=='DEV' ? `http://localhost:${VUE_APP_SERVER_PORT}` : `https://${DB_HOST}`; 
//console.log("CALLBACK_URL====>", DEV_ENV, CALLBACK_URL)

function loginRules(member) {
    //console.log("탈퇴에러ㅓㅓㅓㅓㅓㅓㅓㅓㅓ",member)
    if(member.mb_leave_at){
        return '탈퇴 회원입니다.';
    }

    switch (member.mb_level){
        case LV.AWAIT : 
            return '대기 회원입니다.';
        case LV.BLOCK : 
            return '차단 회원입니다.';
    }
    

}

module.exports = (app) => {
    app.use(passport.initialize());

    passport.use(new LocalStrategy(
        {
            usernameField: 'mb_id',
            passwordField: 'mb_password'
        },
        async (mb_id, mb_password, done) => {
            try {
                mb_password = jwt.generatePassword(mb_password);
                const member = await memberModel.getMemberBy({ mb_id, mb_password });
                const msg = loginRules(member);
                //loginRules(member,"LocalStrategy")
                if(msg){
                    return done(null, null, msg);
                }
                return done(null, member);
            } catch (e) {
                console.log(e.message);
                return done(null, null, '아이디 또는 비밀번호가 올바르지 않습니다.');
            }
        }
    ));
    
    passport.use(new GoogleStrategy({
        clientID:     GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${CALLBACK_URL}/api/member/google-callback`,
        passReqToCallback : true
      },
      async function(request, accessToken, refreshToken, profile, done) {

        //console.log("profile===>",profile);
        if(profile && profile.id){
            const member = await memberModel.loginGoole(request,profile);
            //loginRules(member,"GoogleStrategy")
            const msg = loginRules(member);
            if(msg){
                return done(msg, null, null);
            }                
            return done(null, member);
        } else {
            return done("로그인 실패", null);
        }
        //User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //  return done(err, user);
        //});
      }
    ));

    passport.use(new KakaoStrategy({
        clientID : KAKAO_CLIENT_ID,
        clientSecret: KAKAO_CLIENT_SECRET,
        callbackURL : `${CALLBACK_URL}/api/member/kakao-callback`,
        passReqToCallback : true
        },
        async (request, accessToken, refreshToken, profile, done) => {
            if(profile && profile.id){
                const member = await memberModel.loginKakao(request,profile);
                const msg = loginRules(member);
                //loginRules(member,"KakaoStrategy")
                if(msg){
                    return done(msg, null, null);
                }                
                return done(null, member);
            } else {
                return done("로그인 실패", null);
            }
        }
    ));

    passport.use(new NaverStrategy({
        clientID:     NAVER_CLIENT_ID,
        clientSecret: NAVER_CLIENT_SECRET,
        callbackURL: `${CALLBACK_URL}/api/member/naver-callback`,
        passReqToCallback : true
      },
      async function(request, accessToken, refreshToken, profile, done) {

        //console.log("Naver profile===>",profile);
        if(profile && profile.id){
            const member = await memberModel.loginNaver(request,profile);
            const msg = loginRules(member);
            //loginRules(member,"NaverStrategy")
            if(msg){
                return done(msg, null, null);
            }  
            return done(null, member);
        } else {
            return done("로그인 실패", null);
        }
        //User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //  return done(err, user);
        //});
      }
    ));

    app.use(async( req, res, next)=>{
        const token = req.cookies.token;
        if(!token) return next();
        const {mb_id} = jwt.verify(token);
        if(!mb_id) return next();
        try{
            const member = await memberModel.getMemberBy({mb_id});
            //loginRules(member,"use")
            const msg = loginRules(member);
            if(msg){
                return next();
            }
            req.login(member, { session :false}, (err)=> { });
        } catch(e) {
            console.log('auth err', e)
        }
        next();
    });

}