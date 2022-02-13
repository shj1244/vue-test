<!-- 해당 페이지는 router.js에서 path: '/adm/board/*', 사용하여 아래 처럼 분기했음.-->
<!-- 주소가 /adm/board/list이면 리스트를 보여주고 /adm/board/form이면 form으로 가고 나머지는 에러페이지로 이동 -->
<template>
  <board-list v-if="action=='list'"/>
  <board-form v-else-if="action=='form'" :table="table"/>
  <error v-else/>
  <!-- viewCommponent를 써서 분기하는 또 다른 방법 {동적 비동기 형태로 불러오기} -->
  <!-- <component v-bind:is="viewCommponent" :table="table"/> -->
</template>


<script>
import BoardList from "./Board/BoardList.vue";
import BoardForm from "./Board/BoardForm.vue";
import Error from "../Error.vue";
export default {
  components: { BoardList, BoardForm, Error },
  name: "AdmBoardRenderer",
  computed: {
    match() {
      return this.$route.params.pathMatch.split("/");
    },
    action() {
      return this.match[0];
    },
    table() {
      return this.match[1] || null;
    },
    // viewCommponent() { //동적 비동기 형태로 불러오기
    //   switch (this.action) {
    //     case "list":
    //       return "BoardList";
    //     case "form":
    //       return "BoardForm";
    //     default:
    //       return "Error";
    //   }
    // },
  },
  mounted() {
    //console.log(this.$route);
  },
};
</script>

<style>
</style>