<template>
  <component :is="curSkin" :config="config" :access="access" :wr_id="wr_id" />
</template>

<script>
import upperFirst from "lodash/upperFirst";
import { mapGetters, mapMutations, mapState } from "vuex";
import SKINS from "./skins";
import BoardError from "./BoardError.vue";

export default {
  components: { ...SKINS, BoardError },
  name: "Board",
  data() {
    return {
      config: null,
    };
  },
  computed: {
    ...mapState({
      initData: (state) => state.initData,
    }),
    ...mapGetters({
      GRANT: "user/GRANT",
    }),
    pathMatch() {
      return this.$route.params.pathMatch.split("/");
    },
    table() {
      return this.pathMatch[0];
    },
    wr_id() {
      return this.pathMatch[1];
    },
    action() {
      if (this.wr_id) {
        return this.$route.query.act || "read";
      } else {
        return this.$route.query.act || "list";
      }
    },
    access() {
      if (this.config) {
        return {
          list: this.GRANT >= this.config.bo_list_level,
          read: this.GRANT >= this.config.bo_read_level,
          write: this.GRANT >= this.config.bo_write_level,
          reply: this.GRANT >= this.config.bo_reply_level,
          comment: this.GRANT >= this.config.bo_comment_level,
          download: this.GRANT >= this.config.bo_download_level,
        };
      }
      return null;
    },
    curSkin() {
      if (this.config) {
        const prefix = upperFirst(this.config.bo_skin);
        //console.log("curSkin===>", this.action, this.access);
        if (this.action == "list" && this.access.list) {
          return `${prefix}List`;
        } else if (this.action == "write" && this.access.write) {
          return `${prefix}Form`;
        } else if (this.wr_id && this.action == "read" && this.access.read) {
          return `${prefix}Read`;
        } else {
          return "BoardError";
        }
      }
      return "BoardError";
    },
  },
  watch: {
    table() {
      this.config = null;
      this.fetchConfig();
    },
  },
  mounted() {
    //console.log("mounted==>",this.pathMatch, this.table, this.wr_id, this.action);
    //this.fetchConfig();
    console.log("initData==>", this.initData);
  },
  syncData() {
    if (this.initData && this.initData.config) {
      return this.setConfig(this.initData.config);
    } else {
      return this.fetchConfig();
    }
  },
  methods: {
    ...mapMutations(["SET_INITDATA"]),
    async fetchConfig() {
      const data = await this.$axios.get(`/api/board/config/${this.table}`);
      //console.log("fetchConfig=================>", data);
      if (this.$ssrContext) {
        // 값이 있으면 server
        //console.log("SET_INITDATA==>", data.bo_table);
        this.SET_INITDATA({ config: data });
      }
      this.setConfig(data);
    },
    setConfig(data) {
      if (data) {
        this.config = data;
      }
    },
  },
};
</script>

<style>
</style>