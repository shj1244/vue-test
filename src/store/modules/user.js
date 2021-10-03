import Vue from "vue";
import qs from "qs";
export const state = () => ({ //상태관리
    member: null,
});

export const mutations = {
    SET_MEMBER(state, member) {
        state.member = member;
    },
    SET_TOKEN(state, token){
        state.token = token;
    }
};

export const getters = {

};

export const actions = {
    async initUser({commit}) {
        const { $axios } = Vue.prototype;
        const data = await $axios.get('/api/member/auth');
        if(data && data.member && data.token){
            commit('SET_MEMBER', data.member);
            commit('SET_TOKEN', data.token);
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
    async updateMember({ commit }, form) {
        const { $axios } = Vue.prototype;
        const data = await $axios.patch(`/api/member`, form);
        //console.log('data',data );
        return data;
    },
    async signInLocal({ commit }, form) {
        const { $axios } = Vue.prototype;
        const data = await $axios.post(`/api/member/loginLocal`, form);
        if(data && data.member) {
            commit('SET_MEMBER', data.member);
            commit('SET_TOKEN', data.token);
            //VueCookies.set('token', data.token);
        }
        return !!data;
    },    
    async checkPassword({ commit }, form) {
        const { $axios } = Vue.prototype;
        const data = await $axios.post(`/api/member/checkPassword`, form);

        return !!data;
    },
    async signOut({commit, state}){
        const mb_name = state.member.mb_name;
        const {$axios} = Vue.prototype;
        await $axios.get('/api/member/signOut');
        commit('SET_MEMBER', null);
        commit('SET_TOKEN', null);
        //VueCookies.remove('token');
        return mb_name;
    },
    async findIdLocal(ctx,form){
        const {$axios} = Vue.prototype;
        const query = qs.stringify(form);
        const data = await $axios.get(`/api/member/findId?${query}`);
        return data;
    },
    async findPwLocal(ctx,form){
        const {$axios} = Vue.prototype;
        const query = qs.stringify(form);
        const data = await $axios.get(`/api/member/findPw?${query}`);
        return data;
    },
    async modifyPassword(ctx, form){
        const {$axios} = Vue.prototype;
        const data = await $axios.patch(`/api/member/modifyPassword`, form);
        return data;
    }
    
}