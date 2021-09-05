<template>
  <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card max-width="400" width="100%" elevation="10" class="ma-4">
      <v-toolbar>
        <v-toolbar-title>
          <site-title />
        </v-toolbar-title>
      </v-toolbar>
      <v-tabs v-model="tabs" background-color="primary" dart>
        <v-tab v-for="item in items" :key="item" style="flex: 1">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-card-text>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <sign-in-form @save="loginLocal" :isLoading="isLoading" />
          </v-tab-item>
          <v-tab-item>
            <find-id-form @save="findId" :isLoading="isLoading"/>
          </v-tab-item>
          <v-tab-item>
            <find-pw-form @save="findPw" :isLoading="isLoading"/>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-text class="mt-n4">
        <v-btn to="/join" block>회원가입</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FindIdForm from '../../components/Auth/FindIdForm.vue';
import FindPwForm from '../../components/Auth/FindPwForm.vue';
import SignInForm from "../../components/Auth/SignInForm.vue";
import SiteTitle from "../../components/layout/SiteTitle.vue";
export default {
  components: { SiteTitle, SignInForm, FindIdForm, FindPwForm },
  name: "Login",
  data() {
    return {
      tabs: parseInt(this.$route.query.tab) || 0,
      items: ["로그인", "아이디 찾기", "비밀번호 찾기"],
      isLoading: false,
    };
  },
  methods: {
    ...mapActions('user', ['signInLocal','findIdLocal','findPwLocal']),
    async loginLocal(form) {
      //console.log("loginLocal form", form);
      const data = await this.signInLocal(form);
      //console.log("loginLocal data", data);
      if(data){
        this.$router.push('/');
        this.$toast.info(`${this.$store.state.user.member.mb_name}님 환영합니다.`);
      }
    },
    async findId(form){
      const data = await this.findIdLocal(form);
      //console.log("loginLocal data", data);
      if(data && data.mb_id){
        await this.$ezNotify.alert(`<span style="font-size:1.5em">회원아이디 : [ <b>${data.mb_id}</b> ] 입니다.</span>`, "아이디 찾기 결과");
        // 로그인 페이지로 이동
        this.tabs = 0;
      }
    },
    async findPw(form){
      const data = await this.findPwLocal(form);

      if(data && data.mb_name){
        this.$toast.info(`${data.mb_name}님 ${form.mb_email}로 이메일을 발송하였습니다.`);
        this.tabs = 0;
      }
    }
  },
};
</script>

<style>
</style>