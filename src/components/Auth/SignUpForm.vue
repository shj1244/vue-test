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
      :rules="rules.date({ label: '생년월일' })"
    />
    <!-- accept="image/jpg" 허용할 이미지 확장자-->
    <v-file-input 
      label="회원이미지" 
      v-model="form.mb_image" 
      prepend-icon="mdi-account-box" 
      accept="image/jpg,image/png,image/jpeg,image/bmp"
    />


    <input-radio
      v-model="form.mb_gender"
      :items="genderItems"
      row
      prepend-icon="mdi-gender-male-female"
      :rules="[rules.require({ label: '성별' })]"
    />

    <input-phone
      v-model="form.mb_phone"
      label="전화번호"
      prepend-icon="mdi-phone"
      :rules="rules.phone()"
    />

    <input-post
      :zipcode.sync="form.mb_zip"
      :addr1.sync="form.mb_addr1"
      :addr2.sync="form.mb_addr2"
    />

    <v-btn type="submit" block color="primary" :loading="isLoading">
      회원가입
    </v-btn>
  </v-form>
</template>

<script>
import InputDuplicateCheck from "../InputForms/InputDuplicateCheck.vue";
import validateRules from "../../../util/validateRules";
import InputPassword from "../InputForms/inputPassword.vue";
import InputDate from "../InputForms/inputDate.vue";
import InputRadio from "../InputForms/inputRadio.vue";
import InputPhone from "../InputForms/inputPhone.vue";
import InputPost from "../InputForms/inputPost.vue";

export default {
  components: {
    InputDuplicateCheck,
    InputPassword,
    InputDate,
    InputRadio,
    InputPhone,
    InputPost,
  },
  name: "SignUpForm",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    cbCheckId: {
      type: Function,
      default: null,
    },
    cbCheckEmail: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      valid: true,
      form: {
        mb_id: "testx",
        mb_password: "abcd1234",
        mb_name: "테스트",
        mb_birth: "2020-08-03",
        mb_gender: "M",
        mb_email: "testa@test.com",
        mb_phone: "010-1111-1111",
        mb_zip: "04538",
        mb_addr1:
          "서울 중구 삼일대로 343 (저동1가, 대신파이낸스센터(Daishin Finance Center))",
        mb_addr2: "21층 it개발부",
        mb_image : null, //폼의 이미지는 객체가 아닌 폼객체를 따로 만들어서 이미지를 첨부해서 보낸다.
      },
      genderItems: [
        { label: "남자", value: "M" },
        { label: "여자", value: "F" },
      ],
      confirmPw: "abcd1234",
    };
  },
  computed: {
    rules: () => validateRules,
  },
  methods: {
    async save() {
      this.$refs.form.validate();
      await this.$nextTick();
      if (!this.valid) return;
      if (!this.$refs.id.validate()) return;
      if (!this.$refs.email.validate()) return;
      //this.loading = true;
      //console.log("1111111111111111====>"+this.mb_image);
      //this.$emit("onSave", this.form);
      //console.log(this.form);
      const formData = new FormData();
      const keys = Object.keys(this.form);
      for(const key of keys){
        formData.append(key, this.form[key]);
      }
      //formData.append('mb_image', this.mb_image);
      this.$emit("onSave", formData);
      //console.log("formData===========>"+formData);
    },
  },
};
</script>

<style>
</style>