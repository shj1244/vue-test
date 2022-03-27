import { createApp } from './main';
// import "./plugin-client/vue-toast";
// import "./plugin-client/vue-progressbar";
// import "./plugin-client/ezNotify";
import "./plugin-client";
import plugins from './plugins';

const { app, router, store } = createApp();


//router index에서 처리
//if (window.__INITIAL_STATE__) {
//	store.replaceState(window.__INITIAL_STATE__);
//}
function addStyle(href) {
	const style = document.createElement('link');
	style.href = href;
	style.rel = 'stylesheet';
	style.type = 'text/css';
	document.head.append(style);

}
addStyle('/css/style.css');
addStyle('/css/ez-tiptap.min.css');

router.onReady(() => {
	//console.log('entry-client.js onReady');
	app.$mount('#app');
});