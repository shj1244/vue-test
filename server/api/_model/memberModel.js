const db = require('../../plugins/mysql');
const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');

const memberModel = {
    async duplicateCheck({field, value}){
        //console.log('duplicateCheck', field, value);
        //const sql = 'SELECT COUNT(*) FROM member WHERE mb_id=id'
        const sql = sqlHelper.SelectSimple(TABLE.MEMBER, {[field]: value}, ['COUNT(*) AS cnt']);
        console.log(sql);
        //return{field, value}
        const [[row]] = await db.execute(sql.query, sql.values);
        console.log(row);
        return row;
    }
}

module.exports = memberModel;