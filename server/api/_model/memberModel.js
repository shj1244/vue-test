const db = require('../../plugins/mysql');
const jwt = require('../../plugins/jwt');
const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');
const { LV } = require('../../../util/level')
const moment = require('../../../util/moment');
const { getIp } = require('../../../util/lib')

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
        member.mb_birth = moment(member.mb_birth).format('LT');
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
        //이미지 업로드 처리
        if(req.files && req.files.mb_image){
            console.log(MEMBER_PHOTO_PATH);
            req.files.mb_image.mv(`${MEMBER_PHOTO_PATH}/${payload.mb_id}.jpg`,(err)=>{
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
        console.log('가입', row)
        return row.affectedRows == 1;
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
    }
}

module.exports = memberModel;