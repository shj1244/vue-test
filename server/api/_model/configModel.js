const db = require('../../plugins/mysql');
const TABLE = require('../../../util/TABLE');
const { LV , isGrant } = require('../../../util/level');
const sqlHelper = require('../../../util/sqlHelper');

const configModel = {
    async load(){
        const sql = sqlHelper.SelectSimple(TABLE.CONFIG, null, ['cf_key', 'cf_val', 'cf_client', 'cf_type']);
        const [rows] = await db.execute(sql.query);
        global.siteConfig = {};
        global.clientConfig = {};
        for(const row of rows){
            configModel.setConfigItem(row, true);
        }

        //console.log('설정로드-----------------')
        // console.log(siteConfig)
        // console.log('clientConfig-----------------')
        // console.log(clientConfig);
    },
    setConfigItem(item, isLoad = false){
        configModel.clearConfigItem(item.cf_key, isLoad); // 설정 시 먼저 기존 데이터 삭제 

        let val;
        if(item.cf_type == "Json") {
            val = JSON.parse(item.cf_val);
        } else {
            val = item.cf_val;
        }
        
        if(item.cf_client == 1) {
            clientConfig[item.cf_key] = val;
        } else {
            siteConfig[item.cf_key] = val;
        }

        // 초기 로드가 아니면 메세지를 보낸다.
        if(!isLoad) {
            process.send({
                type : 'config:update',
                data : item,
            });
        }
        //console.log('setConfigItem===>',item.cf_key,val);
    },
    clearConfigItem(cf_key, isLoad = false){
        delete clientConfig[cf_key];
        delete siteConfig[cf_key];
        if(!isLoad){
            process.send({
                type : 'config:remove',
                data : cf_key,
            });
        }
        // console.log('설정로드-----------------')
        // console.log(siteConfig)
        // console.log('clientConfig-----------------')
        // console.log(clientConfig);
    },
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
    async get(req){
        const {all} = req.query;
        let where = {};
        if(all == 'true') {
            // 관리자
            if(!isGrant(req, LV.ADMIN)){
                throw new Error('관리자 설정 목록 권한이 없습니다.')
            }
            const sort = {
                cf_group : true,
                cf_sort : true,
            }
    
            const sql = sqlHelper.SelectSimple(TABLE.CONFIG, where, [] , sort);
            const [rows] = await db.execute(sql.query, sql.values);
            return rows;
        } else {
            // 일반
            //where.cf_client = 1;
            return clientConfig;
        }
    },
    async post(data){

        const sql = sqlHelper.InsertOrUpdate(TABLE.CONFIG, data);
        const [row] = await db.execute(sql.query, sql.values);
        configModel.setConfigItem(data); // 글로벌 지정 변수 (config)
        return data; //업데이트 된 값 넘겨주기
    },
    async put(req){ // 정렬
        //{cf_key, cf_sort}
        req.body.forEach((item)=> {
            const {cf_key, cf_sort} = item;
            const sql = sqlHelper.Update(TABLE.CONFIG, {cf_sort}, {cf_key});
            db.execute(sql.query, sql.values);
            //configModel.post(item);
        })
        return true;
    },
    async remove(req){
        // 관리자
        if(!isGrant(req, LV.SUPER)){
            throw new Error('최고관리자만 삭제가 가능합니다.');
        }
        const {cf_key} = req.params;
        const sql = sqlHelper.DeleteSimple(TABLE.CONFIG, {cf_key});
        const [row] = await db.execute(sql.query, sql.values);

        configModel.clearConfigItem(cf_key); // 설정값 삭제
        return row.affectedRows == 1;
    },
    async restart(req) {
        if(!isGrant(req, LV.SUPER)){
            throw new Error('최고관리자만 서버 재시작 요청을 할 수 있습니다.')
        }
        process.send({
            type : "config:restart",
            data : 'restart'
        });
        return true;
    }
};

module.exports = configModel;