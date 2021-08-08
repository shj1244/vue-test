const moment = require('moment');

//한글 설정
require('moment/locale/ko');
moment.locale('ko');

//날짜 설정
moment.updateLocale('ko',{
    longDateFormat: {
        L : 'YYYY-MM-DD',
        LT : 'YYYY-MM-DD HH:mm:ss',
    }
})


module.exports = moment;