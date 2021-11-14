import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		appReady : false,
		config: {
			// title : "ezCode Home",
			// footer: "ezCode all right reserved.",
			// menu : [ //메뉴구성
			// 	{
			// 		title : "Home",
			// 		icon : "mdi-home",
			// 		to : "/",
			// 		grant : 0,
			// 		newTab : false,
			// 		subItems : [
			// 			{
			// 				title : "menu1",
			// 				icon : "",
			// 				to : "/menu1",
			// 				grant : 0,
			// 				newTab : false,
			// 				subItems : [
			// 					{
			// 						title : "menu1-1",
			// 						icon : "",
			// 						to : "/menu1-1",
			// 						grant : 0,
			// 						newTab : false,
			// 						subItems : []
			// 					},
			// 					{
			// 						title : "menu1-2",
			// 						icon : "",
			// 						to : "/menu1-2",
			// 						grant : 0,
			// 						newTab : false,
			// 						subItems : []
			// 					}
			// 				]
			// 			},
			// 			{
			// 				title : "menu2",
			// 				icon : "",
			// 				to : "/menu2",
			// 				grant : 0,
			// 				newTab : false,
			// 				subItems : []
			// 			}
			// 		]
			// 	},
			// 	{
			// 		title : "About",
			// 		icon : "mdi-help",
			// 		to : "/about",
			// 		grant : 0,
			// 		newTab : false,
			// 		subItems : []
			// 	}
			// ],
		}
	},
	mutations: {
		SET_APP_READY(state){
			state.appReady = true;
		},
		SET_CONFIG(state, {key, value}) {
			if(state.config[key]){
				state.config[key] = value;
			} else {
				Vue.set(state.config, key, value);
			}
		},
	},
	actions: {
		async appInit({dispatch, commit}, ctx){
			// site 설정을 가지고 올꺼고
			if(ctx){
				const keys = Object.keys(ctx.config);
				//console.log('appInit keys : ',keys)
				for(const key of keys) {
					commit('SET_CONFIG', {key, value: ctx.config[key]});
				}

				commit('user/SET_MEMBER', ctx.member);
				commit('user/SET_TOKEN', ctx.token);
			}else{
				await dispatch('configLoad');
				await dispatch('user/initUser');
			}
			commit('SET_APP_READY');
		},
		async configDuplicateCheck(ctx, {field,value}) {
			const { $axios } = Vue.prototype;
			const data = await $axios.get(`/api/config/duplicateCheck/${field}/${value}`);
			//console.log('data',data );
			return data;
		},
		async configSave(ctx, form) {
			const { $axios } = Vue.prototype;
			const data = await $axios.post('/api/config', form);
			//console.log('data',data );
			return data;
		},
		async configLoad({commit}) {
			const {$axios} = Vue.prototype;
			const data = await $axios.get('/api/config');
			//console.log('data : ', data);
			const keys = Object.keys(data);

			for(const key of keys) {
				commit('SET_CONFIG', {key, value: data[key]});
			}
		}
	},
	modules
});

export function createStore() {
	
	return store;
}

export default store;