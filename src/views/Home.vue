<template>
  <div>
    <board-latest table="test" skin="slider" :limit="4" /> <!-- limit는 아래 갤러리의 limit를 가져옴 -->
    <board-latest table="test1" skin="basic" :limit="6" />
    <!-- <board-latest table="test" skin="gallery" :limit="4" />     -->
    <popup-opener/>
  </div>  
</template>
<script>
import { mapState } from "vuex";
import BoardLatest from "../components/Latest/BoardLatest.vue";
import PopupOpener from "./board/skins/popup/component/PopupOpener.vue"

export default {
  components: { BoardLatest, PopupOpener},
  name: "Home",
  title() {
    return this.title;
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      title: (state) => state.config.title || "타이틀 설정하세요!",
    }),
  },

  methods: {

  },
};
</script>
