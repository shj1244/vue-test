const rules = {
    min({label, len=3, info=null}){
        return v => !!v ? v.length >= len || info || `[${label}] ${len} 자 이상 입력하세요.` : true;
    },
    require({label}){
        return v => !!v || `[${label}] 필수 입력입니다.`;
    },
    alphaNum() {
        return v => !!v ? /^[a-zA-Z0-9_]+$/.test(v) || '영어와 숫자만 입력하세요.' : true;
    },
    pattern({label, pattern, info=null}){
        return v => !!v ? pattern.test(v) || info || `[${label}] 형식에 맞게 입력하세요.` : true;
    },
    matchValue(origin, info=null){
        return v =>  v===origin || info || '비밀번호가 일치하지 않습니다.';
    },
    id(options){
        const defaultOptions = {
            label : "아이디",
            len : 3,
            info : null,
            required :true
        };
        const opt = Object.assign(defaultOptions, options);
        const ruleArr = [];
        if(opt.required){
            ruleArr.push(rules.require(opt))
        }
        ruleArr.push(rules.min(opt));
        ruleArr.push(rules.alphaNum());
        return ruleArr;
    },
    name(options){
        const defaultOptions = {
            label : "이름",
            len : 2,
            info : null,
            required :true
        };
        const opt = Object.assign(defaultOptions, options);
        const ruleArr = [];
        if(opt.required){
            ruleArr.push(rules.require(opt))
        }
        ruleArr.push(rules.min(opt));
        return ruleArr;
    },
    password(options){
        const defaultOptions = {
            label : "비밀번호",
            info : null,
            required :true,
            len : 6,
            pattern : /^.*(?=^.{6,}$)(?=.*\d)(?=.*[a-zA-z]).*$/ //특수문자 포함하려면 (?.*[$@3!?]) 추가하면 된다.
        };
        const opt = Object.assign(defaultOptions, options);
        const ruleArr = [];
        if(opt.required){
            ruleArr.push(rules.require(opt))
        }
        ruleArr.push(rules.min(opt));
        ruleArr.push(rules.pattern(opt));
        return ruleArr;
    },
    email(options){
        const defaultOptions = {
            label : "이메일",
            info : null,
            required :true,
            pattern : /.+@.+\..+/
        };
        const opt = Object.assign(defaultOptions, options);
        const ruleArr = [];
        if(opt.required){
            ruleArr.push(rules.require(opt))
        }
        ruleArr.push(rules.pattern(opt));
        return ruleArr;
    },
    date(options) {
        const defaultOptions = {
        label : "날짜",
        info : 'YYYY-MM-DD 형식에 맞게 입력하세요.',
        required :true,
        pattern : /^\d{4}-\d{2}-\d{2}$/
        };
        const opt = Object.assign(defaultOptions, options);
        const ruleArr = [];
        if(opt.required){
            ruleArr.push(rules.require(opt))
        }
        ruleArr.push(rules.pattern(opt));
        return ruleArr;
    },
    phone(options) {
        const defaultOptions = {
        label : "전화번호",
        info : null,
        required :true,
        pattern : /^(\d{2,3}-)?\d{3,4}-\d{4}$/
        };
        const opt = Object.assign(defaultOptions, options);
        const ruleArr = [];
        if(opt.required){
            ruleArr.push(rules.require(opt))
        }
        ruleArr.push(rules.pattern(opt));
        return ruleArr;
    },
}

module.exports = rules;