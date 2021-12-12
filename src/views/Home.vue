<template>
  <div>
    <h1>토스트 테스트</h1>
    <div>
      <v-btn @click="toastTest1">토스트 info</v-btn>
      <v-btn @click="toastTest2">토스트 success</v-btn>
      <v-btn @click="toastTest3">토스트 error</v-btn>
      <v-btn @click="toastTest4">토스트 warning</v-btn>
      <v-btn @click="toastTest5">토스트 전역에러</v-btn>
    </div>
    <h1>프로그래스바 테스트</h1>
    <div>
      <v-btn @click="progresTest1">프로그래스바 start</v-btn>
      <v-btn @click="progresTest2">프로그래스바 finish</v-btn>
      <v-btn @click="progresTest3">프로그래스바 fail</v-btn>
    </div>
    <h1>Notify 테스트</h1>
    <div>
      <v-btn @click="notifyTest1">Notify alert</v-btn>
      <v-btn @click="notifyTest2">Notify confirm</v-btn>
      <v-btn @click="notifyTest3">Notify prompt</v-btn>
    </div>
    <h1>Axios 테스트</h1>
    <div>
      <v-btn @click="axiosTest1">Test</v-btn>
      <v-btn @click="axiosTest2">Error Test</v-btn>
    </div>
    <h1>Socket 테스트</h1>
    <div>
      <v-btn @click="joinRoom('testroom')">방 입장</v-btn>
      <v-btn @click="leaveRoom('testroom')">방 퇴장</v-btn>
      <v-btn @click="sendMsg(1)">전체</v-btn>
      <v-btn @click="sendMsg(2)">브로드캐스트</v-btn>
      <v-btn @click="sendMsg(3)">룸</v-btn>
      <v-btn @click="sendMsg(4)">룸 브로드캐스트</v-btn>
      <div>{{ $store.state.config.test1 }}</div>
    </div>
    <div>
      <v-text-field v-model="toId" label="회원아이디"></v-text-field>
      <v-text-field v-model="userMsg" label="메세지"></v-text-field>
      <v-btn @click="sendUser">사용자에게 메세지 보내기</v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  title() {
    //console.log('Home.vue title-mixin');
    return this.title;
  },
  data() {
    return {
      title: "Vue-test Shin",
      toId: "",
      userMsg: "",
    };
  },
  socket() {
    return {
      "room:msg": (data) => {
        console.log("room:msg", data);
      },
      "room:chat": (data) => {
        console.log("room:chat", data);
        this.toId = data.fromId;
      },
    };
  },
  // mounted() {
  //   this.$socket.emit("room:msg", (data) => {
  //     console.log("room:msg", data);
  //   });
  // },
  // destroyed() {
  //   this.$socket.off("room:msg");
  // },
  /* beforeCreate(){
    //console.log('Home.vue beforeCreate');
  },
  created(){
    //console.log('Home.vue created', this.$ssrContext);
  },
  beforeMount(){
    //console.log('Home.vue beforeMount');
  },
  mounted(){
    //console.log('Home.vue mounted');
  },
  serverPrefetch(){
    //console.log('Home.vue serverPrefetch');
    return new Promise((resolve, reject)=>{
      //console.log('Home.vue serverPrefetch Promise');
      resolve();
    })
  }, */

  methods: {
    ...mapActions("socket", ["joinRoom", "leaveRoom"]),
    toastTest1() {
      this.$toast.info("info");
    },
    toastTest2() {
      this.$toast.success("success");
    },
    toastTest3() {
      this.$toast.error("error");
    },
    toastTest4() {
      this.$toast.warning("warning");
    },
    toastTest5() {
      throw new Error("토스트 에러발생");
    },

    progresTest1() {
      this.$Progress.start();
    },
    progresTest2() {
      this.$Progress.finish();
    },
    progresTest3() {
      this.$Progress.fail();
    },

    async notifyTest1() {
      const res = await this.$ezNotify.alert("경고", "안내", {
        icon: "mdi-alert",
      });
      console.log(res);
    },
    async notifyTest2() {
      const res = await this.$ezNotify.confirm("질문에 응답하세요");
      console.log(res);
    },
    async notifyTest3() {
      const res = await this.$ezNotify.prompt(
        "좋아하는 것은?",
        "뭐가 좋냐고?",
        { icon: "mdi-alert", text: "기본 문자" }
      );
      console.log(res);
    },
    async axiosTest1() {
      const result = await this.$axios.get("./api/member/test");
      console.log(result);
    },
    async axiosTest2() {
      const result = await this.$axios.get("./api/errrrrrrrr/test");
      console.log(result);
    },
    // joinRoom(){
    //   this.$socket.emit('room:join', 'roomtest');
    //   console.log('join Room');
    // },
    // leaveRoom(){
    //   this.$socket.emit('room:leave', 'roomtest');
    //   console.log('leave Room');
    // },
    sendMsg(target) {
      this.$socket.emit("room:send", { msg: target + "send message", target });
    },
    sendUser() {
      const { toId, userMsg } = this;
      const { member } = this.$store.state.user;
      if (toId && userMsg && member) {
        this.$socket.emit("room:chat", {
          toId,
          userMsg,
          fromId: member.mb_id,
        });
      }
    },
  },
};
</script>
