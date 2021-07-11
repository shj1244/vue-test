import { createApp } from './main';
import "./plugin-client/vue-toast";
import "./plugin-client/vue-progressbar";
import "./plugin-client/ezNotify";

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
	app.$mount('#app');
});