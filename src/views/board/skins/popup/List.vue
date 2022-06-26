<template>
  <v-container fluid>
    <v-toolbar>
      <v-toolbar-title>{{ pageTitle }} </v-toolbar-title>
      <v-sheet v-if="config.bo_use_category == 1" width="150" class="ml-4">
        <cate-select :options.sync="options" />
      </v-sheet>
      <search-field :items="searchItems" :options.sync="options" />

      <v-spacer />
      <v-btn :to="`/board/${table}?act=write`" color="primary">
        <v-icon left>mdi-plus</v-icon>
        새 팝업 추가
      </v-btn>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      class="fixedTable"
    >
      <template v-slot:item.no="{ index }">
        {{ getNo(index) }}
      </template>

      <template v-slot:item.wr_title="{ item }">
        <v-btn @click="popupView(item)" block plain class="pa-0 justify-start">
          {{ item.wr_title }}
        </v-btn>
      </template>

      <template #item.wr_2="{ item }">
        {{ $moment(item.wr_2).format("YYYY-MM-DD HH:mm") }}
      </template>

      <template #item.wr_3="{ item }">
        {{ $moment(item.wr_3).format("YYYY-MM-DD HH:mm") }}
      </template>

      <template #item.wr_1="{ item }"> {{ item.wr_1 }}일 </template>

      <template #item.wr_9="{ item }">
        <div class="d-flex justify-center">
          <v-checkbox
            v-model="item.wr_9"
            true-value="1"
            false-value="0"
            readonly
          ></v-checkbox>
        </div>
      </template>

      <template #item.cmd="{ item }">
        <tooltip-btn
          label="수정"
          icon
          color="primary"
          :to="`/board/${table}/${item.wr_id}?act=write`"
        >
          <v-icon>mdi-pencil</v-icon>
        </tooltip-btn>

        <tooltip-btn
          v-if="isSuper"
          label="삭제"
          icon
          color="red"
          :loading="deleteLoading"
          @click="deleteItem(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </tooltip-btn>
      </template>
    </v-data-table>
    <popup-view
      v-if="curItem"
      :item="curItem"
      :table="table"
      @onClose="popupClose"
    ></popup-view>
  </v-container>
</template>

<script>
import qs from "qs";
import { deepCopy } from "../../../../../util/lib";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import SearchField from "../../../../components/layout/SearchField.vue";
import CateSelect from "../basic/component/CateSelect.vue";
import DisplayTime from "./component/DisplayTime.vue";
import TooltipBtn from "../../../../components/etc/TooltipBtn.vue";
import PopupView from "./component/PopupView.vue";

export default {
  components: { SearchField, CateSelect, DisplayTime, TooltipBtn, PopupView },
  name: "BasicList",
  props: {
    config: Object,
    access: Object,
  },
  title() {
    return this.pageTitle;
  },
  data() {
    return {
      loading: false,
      options: {},
      pageRouting: false,
      pageReady: false,
      deleteLoading: false,
      curItem: null,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.board.list,
      totalItems: (state) => state.board.totalItems,
    }),
    ...mapGetters("user", ["isSuper"]),
    table() {
      return this.config.bo_table;
    },
    pageTitle() {
      return this.config.bo_subject + " 관리자";
    },
    headers() {
      const headers = [
        {
          text: "No",
          value: "no",
          align: "right",
          sortable: false,
          searchable: false,
          width: "80",
        },
        // { text: "ID", value : 'wr_id' },
        // { text: "GRP", value : 'wr_grp' },
        // { text: "ORD", value : 'wr_order' },
        // { text: "DEP", value : 'wr_dep' },
        // { text: "PR", value : 'wr_parent' },
        {
          text: "팝업 제목",
          value: "wr_title",
          align: "start",
          sortable: false,
          searchable: true,
          cellClass: "text-truncate",
        },
        {
          text: "시작일시",
          value: "wr_2",
          align: "center",
          sortable: false,
          searchable: false,
          width: "142",
        },
        {
          text: "종료일시",
          value: "wr_3",
          align: "center",
          sortable: false,
          searchable: false,
          width: "142",
        },
        {
          text: "시간",
          value: "wr_1",
          align: "center",
          sortable: false,
          searchable: false,
          width: "120",
        },
        // {
        //   text: "링크",
        //   value: "wr_4",
        //   align: "center",
        //   sortable: false,
        //   searchable: false,
        //   width: "60",
        // },
        {
          text: "top",
          value: "wr_5",
          align: "center",
          sortable: false,
          searchable: false,
          width: "60",
        },
        {
          text: "left",
          value: "wr_6",
          align: "center",
          sortable: false,
          searchable: false,
          width: "60",
        },
        {
          text: "width",
          value: "wr_7",
          align: "center",
          sortable: false,
          searchable: false,
          width: "60",
        },
        {
          text: "height",
          value: "wr_8",
          align: "center",
          sortable: false,
          searchable: false,
          width: "60",
        },
        {
          text: "사용",
          value: "wr_9",
          align: "center",
          sortable: true,
          searchable: false,
          width: "100",
        },
        {
          text: "CMD",
          value: "cmd",
          align: "center",
          sortable: false,
          searchable: false,
          width: "120",
        },
      ];
      if (this.config.bo_use_category) {
        headers.splice(1, 0, {
          text: "Cate",
          value: "wr_category",
          align: "center",
          sortable: false,
          searchable: false,
          width: "80",
        });
      }
      return headers;
    },
    searchItems() {
      const arr = this.headers.filter((item) => item.searchable); // 제목과 내용은 가져오고
      // arr.push({
      //   // 검색할 내용 추가
      //   text: "내용",
      //   value: "wr_content",
      // });
      return arr;
    },
  },
  watch: {
    options: {
      handler() {
        this.fetchData();
      },
      deep: true,
    },
    table() {
      this.fetchData();
    },
  },
  serverPrefetch() {
    return this.fetchData();
  },
  created() {
    this.options = this.initOptions();
  },
  mounted() {
    window.addEventListener("popstate", this.routeChange);
  },
  destroyed() {
    window.removeEventListener("popstate", this.routeChange);
    this.SET_LIST({ items: [], totalItems: 0 });
  },
  methods: {
    ...mapActions("board", ["getBoardList"]),
    ...mapMutations("board", ["SET_LIST"]),
    initOptions() {
      const { query } = this.$route;
      const options = {
        page: Number(query.page) || 1,
        itemsPerPage: Number(query.itemsPerPage) || 10,
        stf: [query.stf || "", "wr_category"],
        stx: [query.stx || "", ""],
        stc: [query.stc || "", "eq"],
      };
      return options;
    },
    pushState() {
      //console.log("페이지 라우팅", this.pageRouting);
      if (!this.pageRouting) {
        const opt = {
          page: this.options.page,
          itemsPerPage: this.options.itemsPerPage,
          stf: this.options.stf[0] || undefined,
          stx: this.options.stx[0] || undefined,
          stc: this.options.stc[0] || undefined,
          ca: this.options.stx[1] || undefined,
        };
        const query = qs.stringify(opt);
        if (this.pageReady) {
          history.pushState(null, null, `${this.$route.path}?${query}`);
        } else {
          history.replaceState(null, null, `${this.$route.path}?${query}`);
        }
      }
    },
    routeChange() {
      this.pageRouting = true;
      this.options = this.initOptions();
    },
    getPayload() {
      const payload = deepCopy(this.options);

      // 정렬을 설정값에 있는 정렬로 하자
      // for (const sort of this.config.bo_sort) {
      //   payload.sortBy.push(sort.by);
      //   payload.sortDesc.push(sort.desc == 1);
      // }

      payload.stf.push("wr_reply");
      payload.stc.push("eq");
      payload.stx.push("0");

      // TODO : 카테고리 별로도 검색

      return payload;
    },
    async fetchData() {
      const payload = this.getPayload();
      const query = qs.stringify(payload);
      const headers = {};
      if (this.$ssrContext) {
        headers.token = this.$ssrContext.token;
      }

      await this.getBoardList({ vm: this, query, headers });
    },
    getNo(index) {
      const { page, itemsPerPage } = this.options;
      const { totalItems } = this;
      return totalItems - (page - 1) * itemsPerPage - index;
    },
    async deleteItem(item) {
      this.deleteLoading = true;

      const result = await this.$ezNotify.confirm(
        `[${item.wr_title}]을 삭제 하시겠습니까?`,
        "팝업 레이어 삭제",
        { icon: "mdi-alert" }
      );
      if (result) {
        const data = await this.$axios.delete(
          `/api/board/${this.table}/${item.wr_id}`
        );
        if (data) {
          this.$toast.info(`${item.wr_title} 삭제 하였습니다.`);
          this.fetchData();
        }
      }
      this.deleteLoading = false;
    },
    popupView(item) {
      this.curItem = item;
    },
    popupClose() {
      this.curItem = null;
    },
  },
};
</script>
<style>
@media screen and (min-width: 600px) {
  .fixedTable table {
    table-layout: fixed;
  }
  .basic-title {
    width: 100;
  }
  .basic-title > span {
    display: block;
    width: 100%;
  }
}
@media screen and (max-width: 600px) {
  .fixedTable > div {
    overflow: hidden;
  }
  .fixedTable .v-data-table__mobile-table-row {
    width: calc(100vw - 24px);
  }
  .fixedTable .v-data-table__mobile-row__header {
    width: 80px;
  }
  .fixedTable .v-data-table__mobile-row__cell .basic-title > span > div {
    display: block;
    max-width: calc(100vw - 120px);
  }
}
</style>