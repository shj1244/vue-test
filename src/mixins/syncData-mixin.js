import { mapState, mapMutations } from "vuex";

const serverMixin = {
    computed: {
        ...mapState({
            initFetchs: state => state.initFetchs,
        }),
    },
    serverPrefetch() {
        const { syncData } = this.$options;
        if (syncData) {
            if (this.initFetchs.indexOf(this.$vnode.tag) > -1) {
                return;
            }
            this.PUSH_FETCH(this.$vnode.tag);
            //console.log("initFetchs===>", this.initFetchs);
            return syncData.call(this);
        }
    },
    methods: {
        ...mapMutations(['PUSH_FETCH']),
    },
};

const clientMixin = {
    computed: {
        ...mapState({
            initData: state => state.initData,
        }),
    },
    async created() {
        const { syncData } = this.$options;
        if (syncData) {
            await syncData.call(this);
            setTimeout(() => {
                if (this.initData) {
                    //console.log("created initData===>", this.initData);
                    this.SET_INITDATA(null);
                }
            }, 1000);
        }
    },
    methods: {
        ...mapMutations(['SET_INITDATA']),
    },
}

export default process.env.VUE_ENV === 'server' ? serverMixin : clientMixin;