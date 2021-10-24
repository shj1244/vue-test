const db = require('../../plugins/mysql');

const TABLE = require('../../../util/TABLE');
const { LV } = require('../../../util/level');
const sqlHelper = require('../../../util/sqlHelper')

const configModel = {
    async duplicateCheck({ field, value }) {
        const sql = sqlHelper.SelectSimple(
            TABLE.CONFIG,
            { [field]: value },
            ['COUNT(*) AS cnt']
        );
        const [[row]] = await db.execute(sql.query, sql.values);
        //console.log(row);
        return row;
    },
    async post(req){
        const data = req.body;
        const maxSql = sqlHelper.SelectSimple(
            TABLE.CONFIG, 
            {cf_group : data.cf_group}, 
            ['IFNULL(MAX(cf_sort), -1) AS max']
        );
        const [[{max}]] = await db.execute(maxSql.query, maxSql.values)
        data.cf_sort = max+1;
        console.log("save......",max)
        // 정렬규칙
        // 그룹에 0, 1, 2
        

        const sql = sqlHelper.InsertOrUpdate(TABLE.CONFIG, data);
        const [row] = await db.execute(sql.query, sql.values)
        return sql;
    }
}
module.exports = configModel;