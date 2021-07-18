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
    

  </div>
</template>
<script>


export default {
  name: "Home",
  title(){
    return this.title
  },
  data(){
    return {
      title : "My Home"
    }
  },

  methods : {
    
    toastTest1() {
      this.$toast.info("info");
    },
    toastTest2() {
      this.$toast.success("success");
    }
    ,toastTest3() {
      this.$toast.error("error");
    },
    toastTest4() {
      this.$toast.warning("warning");
    },
    toastTest5() {
      throw new Error('토스트 에러발생');
    },

    progresTest1 () {
        this.$Progress.start()
    },
    progresTest2 () {
        this.$Progress.finish()
    },
    progresTest3 () {
        this.$Progress.fail()
    },

    async notifyTest1 () {
        const res = await this.$ezNotify.alert('경고','안내', {icon: "mdi-alert"});
        console.log(res);
    },
    async notifyTest2 () {
        const res = await this.$ezNotify.confirm('질문에 응답하세요');
        console.log(res);
    },
    async notifyTest3 () {
        const res = await this.$ezNotify.prompt('좋아하는 것은?','뭐가 좋냐고?', {icon: "mdi-alert", text:"기본 문자"});
        console.log(res);
    }
    
  }
}
</script>
