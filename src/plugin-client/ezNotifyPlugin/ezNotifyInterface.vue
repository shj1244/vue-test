<template>
  <div>
      <ez-notify-component ref="notify" :opt="options"/>
  </div>
</template>

<script>
import ezNotifyComponent from './ezNotifyComponent.vue'
export default {
    name : "ezNotifyInterface",
    components: { ezNotifyComponent },
    data(){
        return{
            options : {
                icon : 'mdi-alert',
                iconColor : 'orange',
                type :"prompt",
                width : 300,
                text : "",
            },
        }
    },
    methods : {
        alert(content, title="", option={}){
            return this.$refs.notify.show(content, title, {
                ...this.options,
                ...option,
                type : 'alert'
            });
        },
        confirm(content, title="", option={}){
            return this.$refs.notify.show(content, title, {
                ...this.options,
                ...option,
                type : 'comfirm'
            });
        },
        prompt(content, title="", option={}){
            return this.$refs.notify.show(content, title, {
                ...this.options,
                ...option,
                type : 'prompt'
            });
        }
    }
}
</script>

<style>

</style>