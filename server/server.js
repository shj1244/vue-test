require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

// 앱 초기화
const app = express();
const port = process.env.VUE_APP_SERVER_PORT || 3000;
const webServer = http.createServer(app);

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

// 글로벌
global.MEMBER_PHOTO_PATH = path.join(__dirname, './upload/memberPhoto');
// MEMBER_PHOTO_PATH 폴더가 없으면 파일폴더를 생성 - 서버에 따로 폴더를 생성하지 않아도 됨.
fs.mkdirSync(MEMBER_PHOTO_PATH, {recursive: true});

//passport
const passport = require('./plugins/passport');
passport(app);


// 멤버이미지
const thumbnail = require('./plugins/thumbnail');
app.use('/upload/:_path', thumbnail(path.join(__dirname, './upload')));

// 정적 폴더
app.use(express.static(path.join(__dirname, "../dist")));

// api router
const memberRouter = require('./api/member')
app.use('/api/member', memberRouter)
// 위에 두줄을 app.use('/api/member', require('./api/member'))
app.use('/api/*', (req, res) => {
	res.json({ err: '요청하신 API가 없습니다.' });
})

// Vue SSR
const { createBundleRenderer } = require('vue-server-renderer');
const exp = require('constants');
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
	};

	const stream = renderer.renderToStream(ctx);
	stream.on('end', () => {
		const memSize = Object.entries(process.memoryUsage())[0][1];
		//console.log("스트림 렌더 종료 MemSize", (memSize / 1024 / 1024).toFixed(4));
			
		if(process.platform == 'linux'){
			if(memSize > 150000000) {
				process.emit('SIGINT');
			}
		}
	}).pipe(res);
});

// 서버 응답
webServer.listen(port, () => {
	process.send('ready');
	console.log(`http://localhost:${port}`)
});


process.on('SIGINT', function(){
	isDisableKeepAlive= true;
	webServer.close(function(){
		console.log('server Closed');
		process.exit(0);
	})
})