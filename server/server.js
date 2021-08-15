require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

// 앱 초기화
const app = express();
const port = process.env.VUE_APP_SERVER_PORT || 3000;
const webServer = http.createServer(app);

//const jwt = require('./plugins/jwt');
//console.log(jwt.getRandToken(32)) --얻은값으로 .env에 SECRET_KEY=55IAYrdPTbFknbVfbartG2YdFkvByQEt
//console.log(jwt.generatePassword('abcd1234'))

// 파서
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//passport
const passport = require('./plugins/passport');
passport(app);

// 정적 폴더
app.use(express.static(path.join(__dirname, "../dist")));

//api router
const memberRouter = require('./api/member')
app.use('/api/member', memberRouter)
//위에 두줄을 app.use('/api/member', require('./api/member'))
app.use('/api/*', (req, res) => {
	res.json({ err: '요청하신 API가 없습니다.' });
})

// Vue SSR
const { createBundleRenderer } = require('vue-server-renderer');
const exp = require('constants');
const template = fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf-8');
const serverBundle = require(path.join(__dirname, '../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.join(__dirname, '../dist/vue-ssr-client-manifest.json'));

const renderer = createBundleRenderer(serverBundle, {
	runInNewContext: false,
	template,
	clientManifest,
});

app.get('*', (req, res) => {
	console.log('server.js router *');

	const ctx = {
		url: req.url,
		title: 'Vue SSR App',
		metas: `<!-- inject more metas -->`,
	};

	const stream = renderer.renderToStream(ctx);

	stream.on('end', () => {
		console.log('스트림 렌더 종료');
	}).pipe(res);
});

// 서버 응답
webServer.listen(port, () => {
	console.log(`http://localhost:${port}`)
});