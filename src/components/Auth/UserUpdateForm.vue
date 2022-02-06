<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-if="!!form.mb_provider"
      v-model="form.mb_provider"
      label="소셜네트워크 제공자"
      prepend-icon="mdi-account-network"
      readonly
    ></v-text-field>
    <input-duplicate-check
      v-else
      ref="id"
      label="아이디"
      prepend-icon="mdi-account"
      v-model="form.mb_id"
      readonly
    />

    <v-text-field
      label="이름"
      v-model="form.mb_name"
      prepend-icon="mdi-card-account-details-outline"
      :rules="rules.name()"
    />
    <template v-if="!member.mb_provider">
      <input-password
        label="비밀번호"
        prepend-icon="mdi-lock"
        v-model="form.mb_password"
        :rules="rules.password({ required: false })"
      />

      <input-password
        label="비밀번호 확인"
        prepend-icon="mdi-lock-check"
        v-model="confirmPw"
        :rules="[rules.matchValue(form.mb_password)]"
      />
    </template>
    <input-duplicate-check
      ref="email"
      label="이메일"
      prepend-icon="mdi-email"
      v-model="form.mb_email"
      :rules="rules.email()"
      :cbCheck="cbCheckEmail"
      :readonly="!admMode"
      :origin="member.mb_email"
    />
    <div v-if="admMode" class="mb-4">
      <div class="pl-10">레벨 {{ form.mb_level }} : {{ lvLabel }}</div>
      <v-slider
        v-model="form.mb_level"
        :min="LV.BLOCK"
        :max="isGrant ? LV.SUPER : admin.mb_level"
        ticks="always"
        thumb-label
        prepend-icon="mdi-chevron-triple-up"
        hide-details
      ></v-slider>
    </div>

    <input-date
      v-model="form.mb_birth"
      label="생년월일"
      prepend-icon="mdi-calendar"
      :rules="rules.date({ label: '생년월일', required: !admMode })"
    />
    <div class="d-flex align-center">
      <display-avatar :member="member" />
      <!-- accept="image/jpg" 허용할 이미지 확장자-->
      <v-file-input
        class="ml-2"
        label="회원이미지"
        v-model="form.mb_image"
        :prepend-icon="null"
        accept="image/jpg,image/png,image/jpeg,image/bmp"
      />
      <v-checkbox v-model="form.deleteImage" label="삭제"></v-checkbox>
    </div>

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
      :rules="rules.phone({ required: !admMode })"
    />

    <input-post
      :zipcode.sync="form.mb_zip"
      :addr1.sync="form.mb_addr1"
      :addr2.sync="form.mb_addr2"
      :required="!admMode"
    />

    <v-btn type="submit" block color="primary" :loading="isLoading" :disabled="isGrant">
      회원수정
    </v-btn>

    <v-btn
      v-if="isType == 'member'"
      block
      class="mt-4"
      color="error"
      :loading="isLoading"
      @click="$emit('onLeave')"
       :disabled="isGrant"
    >
      회원탈퇴
    </v-btn>

    <v-btn
      v-else
      block
      class="mt-4"
      color="error"
      :loading="isLoading"
      @click="$emit('onRestore')"
    >
      회원복원
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
import { deepCopy } from "../../../util/lib";
import DisplayAvatar from "../layout/DisplayAvatar.vue";
import { LV, LV_LABEL, LV_COLOR } from "../../../util/level";
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    InputDuplicateCheck,
    InputPassword,
    InputDate,
    InputRadio,
    InputPhone,
    InputPost,
    DisplayAvatar,
  },
  name: "UserUpdateForm",
  props: {
    admMode: {
      type: Boolean,
      default: false,
    },
    member: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    cbCheckEmail: {
      type: Function,
      default: null,
    },
    isType: {
      tyep: String,
      default: 'member'
    }
  },
  data() {
    return {
      valid: true,
      form: null /* {
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
      }, */,
      genderItems: [
        { label: "남자", value: "M" },
        { label: "여자", value: "F" },
      ],
      confirmPw: "",
    };
  },
  computed: {
    rules: () => validateRules,
    LV: () => LV,
    LV_COLOR: () => LV_COLOR,
    lvLabel() {
      return LV_LABEL(this.form.mb_level);
    },
    ...mapState({
      admin : state => state.user.member
    }),
    ...mapGetters('user', ['isSuper']),
    isGrant(){
      return !(
        this.admin.mb_id == this.member.mb_id || // 내 자신
        this.isSuper || // 최고관리자
        this.member.mb_level < this.admin.mb_level // 나보다 레벨이 낮은 사용자
      );
    },
  },
  created() {
    this.form = deepCopy(this.member);
    this.form.mb_password = "";
    this.form.admMode = this.admMode;
    this.form.deleteImage = false; // true 이면 기존이미지 삭제
    delete this.form.mb_create_at;
    delete this.form.mb_create_ip;
    delete this.form.mb_leave_at;
    delete this.form.mb_leave_ip;
    delete this.form.mb_update_at;
    delete this.form.mb_update_ip;
    delete this.form.mb_login_at;
    delete this.form.mb_login_ip;
    delete this.form.mb_leave_at;
    console.log('isGrant', this.isGrant);
  },
  methods: {
    async save() {
      this.$refs.form.validate();
      await this.$nextTick();
      if (!this.valid) return;
      if (!this.$refs.email.validate()) return;
      //this.loading = true;
      //console.log("1111111111111111====>"+this.mb_image);
      //this.$emit("onSave", this.form);
      //console.log(this.form);
      const formData = new FormData();
      const keys = Object.keys(this.form);
      for (const key of keys) {
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