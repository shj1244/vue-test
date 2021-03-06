require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
require('./plugins/pm2Bus');

(async function(){ //전체 함수 시작지점
// 앱 초기화
const app = express();
const port = process.env.VUE_APP_SERVER_PORT || 3000;
const webServer = http.createServer(app);


// logger
const logger = require('./plugins/logger');
global.$logger = logger;

const socket = require('./plugins/socket');
socket(webServer);

// 설치정보 - DB 정보 유무 판단


// 설정정보 로드
const configModel = require('./api/_model/configModel');
//console.log("설정 로그 전");
await configModel.load();
//console.log("설정 로그 후");

// setInterval(()=>{
// 	console.log('test site == ', siteConfig.test1);
// 	console.log('test clie == ', clientConfig.test1)
// }, 5000);

let isDisableKeepAlive = false;
app.use((req, res, next)=>{
	if(isDisableKeepAlive){
		//console.log('Kee Alive', isDisableKeepAlive);
		res.set('Connection', 'close');
	}
	next();
})
//const jwt = require('./plugins/jwt');
//console.log(jwt.getRandToken(32)) --얻은값으로 .env에 SECRET_KEY=55IAYrdPTbFknbVfbartG2YdFkvByQEt
//console.log(jwt.generatePassword('abcd1234'))

// 파비콘
app.use((req, res, next) =>{
	if(req.path.indexOf('favicon.ico') > -1 ){
		const favicon = fs.readFileSync(path.join(__dirname, '../dist/favicon.ico'));
		res.status(200).end(favicon);
		return;
	}
	next();
})

// 파서
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fileUpload = require('express-fileupload');
app.use(fileUpload()); //req.files
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// 세션
const session = require('express-session');
app.use(session({
	secret : siteConfig.SECRET_KEY, // 쿠기 변조 방지에 대한 해쉬
	resave :true, // 세션을 언제나 저장하는 여부
	saveUninitialized :false, // 세션 저장전 초기화 안함
}))

// 글로벌
global.MEMBER_PHOTO_PATH = path.join(__dirname, './upload/memberPhoto');
// MEMBER_PHOTO_PATH 폴더가 없으면 파일폴더를 생성 - 서버에 따로 폴더를 생성하지 않아도 됨.
fs.mkdirSync(MEMBER_PHOTO_PATH, {recursive: true});
global.UPLOAD_PATH = path.join(__dirname, './upload');

//passport
const passport = require('./plugins/passport');
passport(app);


// 멤버이미지
const thumbnail = require('./plugins/thumbnail');
app.use('/upload/:_path', thumbnail(path.join(__dirname, './upload')));

// 정적 폴더
app.use(express.static(path.join(__dirname, "../dist")));

// api router
//const memberRouter = require('./api/member')
const autoRoute = require('./autoRoute');
autoRoute('/api' , app)
//app.use('/api/member', memberRouter)
// 위에 두줄을 app.use('/api/member', require('./api/member'))
app.use('/api/*', (req, res) => {
	res.json({ err: '요청하신 API가 없습니다.' });
})

// Vue SSR
const { createBundleRenderer } = require('vue-server-renderer');
//const exp = require('constants');
const template = fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf-8');
const serverBundle = require(path.join(__dirname, '../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.join(__dirname, '../dist/vue-ssr-client-manifest.json'));

app.get('*', (req, res) => {
	const renderer = createBundleRenderer(serverBundle, {
		runInNewContext: false,
		template,
		clientManifest,
	});
	//console.log('process.memoryUsage()=====>',process.memoryUsage());

	const ctx = {
		url: req.url,
		title: 'Vue SSR App',
		metas: `<!-- inject more metas -->`,
		member : req.user || null,
		token :req.cookies.token || null,
		config : clientConfig,
	};

	const stream = renderer.renderToStream(ctx);
	stream.on('end', () => {
		const memSize = Object.entries(process.memoryUsage())[0][1];
		//console.log("스트림 렌더 종료 MemSize", (memSize / 1024 / 1024).toFixed(4));
		$logger.info("스트림 렌더 종료 MemSize", (memSize / 1024 / 1024).toFixed(4));
			
		if(process.platform == 'linux'){
			if(memSize > 150000000) {
				$logger.info('서버재시작');
				process.emit('SIGINT');
			}
		}
	}).pipe(res);
});

// 서버 응답
webServer.listen(port, () => {
	process.send('ready');
	$logger.info(`http://localhost:${port} 서버시작`)
});


process.on('SIGINT', function(){
	isDisableKeepAlive= true;
	webServer.close(function(){
		//console.log('server Closed');
		process.exit(0);
	})
})

})(); //전체 함수 종료지점