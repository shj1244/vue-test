import Vue from "vue";

export const state = () => ({ //상태관리
    member: null,
});

export const mutations = {

};

export const getters = {

};

export const actions = {
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
        const data = await $axios.post(`/api/member/loginLocal`, form)
        //console.log('signInLocal', form);
        return data
    }
}