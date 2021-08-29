import Vue from "vue";
import VueCookies from "vue-cookies";
export const state = () => ({ //상태관리
    member: null,
});

export const mutations = {
    SET_MEMBER(state, member) {
        state.member = member;
    }
};

export const getters = {

};

export const actions = {
    async initUser({commit}) {
        //console.log('actions',{field, value} );
        const { $axios } = Vue.prototype;
        const member = await $axios.get('/api/member/auth');
        if(member){
            commit('SET_MEMBER', member);
        }
    },
    async duplicateCheck(ctx, { field, value }) {
        //console.log('actions',{field, value} );
        const { $axios } = Vue.prototype;
        const data = await $axios.get(`/api/member/duplicateCheck/${field}/${value}`);
        //console.log('data',data );
        return data;
    },
    async createMember(ctx, form) {
        const { $axios } = Vue.prototype;
        const data = await $axios.post(`/api/member`, form);
        //console.log('data',data );
        return data;
    },
    async signInLocal({ commit }, form) {
        const { $axios } = Vue.prototype;
        const data = await $axios.post(`/api/member/loginLocal`, form);
        if(data && data.member) {
            commit('SET_MEMBER', data.member);
            VueCookies.set('token', data.token);
        }
        return data;
    }
}