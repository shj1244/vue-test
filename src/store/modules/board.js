import Vue from "vue";
import axios from "axios";

export const state = () => ({
    config: null,
    list: [],
    totalItems: 0,
    read: null,
    latest: {},
});

export const mutations = {
    SET_CONFIG(state, config) {
        state.config = config;
    },
    SET_LIST(state, { items, totalItems }) {
        //console.log("list===>",items,'...',totalItems);
        state.list = items;
        state.totalItems = totalItems;
    },
    SET_READ(state, read) {
        state.read = read;
    },
    VIEW_UP(state) {
        if (state.read) {
            state.read.wr_view++;
        }
    },
    SET_LATEST(state, { table, payload }) {
        Vue.set(state.latest, table, payload);
    },

};

let axiosToken = {
    axiosSource: null
};
export const actions = {
    async getBoardConfig({ commit }, table) {
        const { $axios } = Vue.prototype;
        const data = await $axios.get(`/api/board/config/${table}`);
        if (data) {
            commit('SET_CONFIG', data)
        }
    },
    async getBoardList({ commit }, { vm, query, headers }) {
        const { $axios } = Vue.prototype;
        const { table } = vm;
        if (axiosToken.axiosSource) {
            axiosToken.axiosSource.cancel("fetchData 취소");
        }
        axiosToken.axiosSource = axios.CancelToken.source(); // 중복된 값을 보낼때 먼저 보낸건 취소요청
        try {
            const data = await $axios.get(
                `/api/board/list/${table}?${query}`,
                { headers, cancelToken: axiosToken.axiosSource.token }
            );

            if (data) {
                commit('SET_LIST', data);
                vm.pushState();
                vm.pageReady = true;
                vm.pageRouting = false;
            }
        } catch (e) {
            console.log("요청 취소 >", e.message);
        }
    },
    async getBoardRead({ commit }, { table, id, headers }) {
        const { $axios } = Vue.prototype;
        const data = await $axios.get(
            `/api/board/read/${table}/${id}`,
            { headers }
        );
        if (data) {

            commit('SET_READ', data);
        }
    },
    async getLatest({ commit }, { table, limit }) {
        const { $axios } = Vue.prototype;
        //console.log("limits ====>",limit);
        const data = await $axios.get(`/api/board/latest/${table}?limit=${limit}`)
        //console.log("data ====>",data);
        if(data){
            commit('SET_LATEST', {table, payload: data});
        }
        /*
        latest: {table : {subject : "", items: []}}
        */
    },
}
