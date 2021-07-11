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
  </div>
</template>

<script>
export default {
  name: 'Home',
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
    }
    
  }
}
</script>
