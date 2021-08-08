<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
    <input-duplicate-check
      ref="id"
      label="아이디"
      prepend-icon="mdi-account"
      v-model="form.mb_id"
      :counter="30"
      :rules="rules.id()"
      :cbCheck="cbCheckId"
    />

    <v-text-field
      label="이름"
      v-model="form.mb_name"
      prepend-icon="mdi-card-account-details-outline"
      :rules="rules.name()"
    />

    <input-password
      label="비밀번호"
      prepend-icon="mdi-lock"
      v-model="form.mb_password"
      :rules="[...rules.password()]"
    />

    <input-password
      label="비밀번호 확인"
      prepend-icon="mdi-lock-check"
      v-model="confirmPw"
      :rules="[rules.matchValue(form.mb_password)]"
    />

    <input-duplicate-check
      ref="email"
      label="이메일"
      prepend-icon="mdi-email"
      v-model="form.mb_email"
      :rules="rules.email()"
      :cbCheck="cbCheckEmail"
    />

    <input-date 
      v-model="form.mb_birth" 
      label="생년월일" 
      prepend-icon="mdi-calendar"
      :rules="rules.date({label:'생년월일'})"
    />

    <v-btn type="submit" block color="primary">회원가입</v-btn>
  </v-form>
</template>

<script>
import InputDuplicateCheck from '../InputForms/InputDuplicateCheck.vue';
import validateRules from "../../../util/validateRules";
import InputPassword from '../InputForms/inputPassword.vue';
import InputDate from '../InputForms/inputDate.vue';
export default {
  components: { InputDuplicateCheck, InputPassword, InputDate },
    name : "SignUpForm",
    props : {
      cbCheckId :{
        type :Function,
        default : null,
      },
      cbCheckEmail :{
        type :Function,
        default : null,
      },
    },
    data(){
        return{   
            valid :true,     
            form :{
                mb_id : "",
                mb_password : "",
                mb_name : "",
                mb_birth : "",
                mb_gender : "",
                mb_email : "",
                mb_phone : "",
                mb_zip : "",
                mb_addr1 : "",
                mb_addr2 : "",
            },
            confirmPw : "",
        }
    },
    computed : {
      rules: () => validateRules,
    },
    methods : {
      async save(){
          this.$refs.form.validate();
          await this.$nextTick();
          if(!this.valid) return;
          console.log("2222222222222222222222222222222222")
          if(!this.$refs.id.validate()) return;
          console.log("3333333333333333333333333333333")
          if(!this.$refs.email.validate()) return;
          console.log(this.form);
      }
    },
}
</script>

<style>

</style>