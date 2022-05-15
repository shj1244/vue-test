<template>
  <v-card-text> 
    <comment-form :wr_reply="id" :table="table" :parent="0" /> 
  </v-card-text>
</template>

<script>
import CommentForm from "./CommentForm.vue";
export default {
  components: { CommentForm },
  name: "CommentList",
  props:{
      table : {type: String, required: true},
      id : {type: Number, required: true},
      accsess : {type: Object, required: true},
  }
};
</script>

<style>
</style>