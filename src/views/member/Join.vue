<template>
  <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card max-width="400" width="100%" elevation="10" class="ma-4">
      <v-toolbar>
        <v-toolbar-title>회원가입</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <sign-up-form
          :cbCheckId="checkId"
          :cbCheckEmail="checkEmail"
          @onSave="save"
          :isLoading="isLoading"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SignUpForm from "../../components/Auth/SignUpForm.vue";
export default {
  components: { SignUpForm },
  name: "Join",
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("user", ["duplicateCheck", "createMember"]),
    async checkId(id) {
      const data = await this.duplicateCheck({ field: "mb_id", value: id });
      return data;
    },
    async checkEmail(email) {
      const data = await this.duplicateCheck({
        field: "mb_email",
        value: email,
      });
      return data;
    },
    async save(form) {
      this.isLoading = true;
      const data = await this.createMember(form);
      this.isLoading = false;
      if (data) {
        const mb_name = form.get('mb_name')
        this.$toast.info(`${mb_name}님 회원가입 하셨습니다.`);
        this.$router.push("./login");
      }
      // setTimeout(() => {
      //    this.isLoading = false;
      //}, 1000)
      //console.log("save", form);

      //const data = await this.createMember(form);

      //this.isLoading = false;
    },
  },
};
</script>

<style>
</style>