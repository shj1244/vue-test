<template>
  <div v-if="fieldType== 'String'">
      <v-text-field label="Value(문자)" :value="value" @input="onInput" />
  </div>
  <div v-else-if="fieldType== 'Number'">
      <v-text-field label="Value(숫자)" type="number" :value="value" @input="onInput"/>
  </div>
  <div v-else-if="fieldType== 'Json'">
      <v-text-field label="Value(Json)" :value="value" @input="onInput"></v-text-field>
  </div>
  <div v-else-if="fieldType== 'Secret'">
      <input-password label="Secret Value" :value="value" @input="onInput"/>
  </div>
  <div v-else>
      <div>타입을 먼저 선택해 주세요.</div>
  </div>
</template>

<script>
import inputPassword from '../../../components/InputForms/inputPassword.vue'
export default {
  components: { inputPassword },
    name : "TypeValue",
    model : {
        prop : 'value',
        event : 'input'
    },
    props : {
        value : {
            type : String
        },
        fieldType : {
            type : String,
            default : 'String'
        }
    },
    methods : {
        onInput(val){
            this.$emit('input', val)
        }
    }
}
</script>

<style>

</style>