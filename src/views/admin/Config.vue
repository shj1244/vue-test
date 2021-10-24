<template>
    <v-container>
        <v-toolbar>
            <v-toolbar-title>설정관리</v-toolbar-title>
            <v-spacer></v-spacer>
            <tooltip-btn fab small label="설정 추가" @click="addConfig">
                <v-icon>mdi-plus</v-icon>
            </tooltip-btn> 
        </v-toolbar>

        <!-- 설정 다이얼로그 -->
        <ez-dialog label="설정추가" ref="dialog" max-width="500" dark color="primary">
            <config-form @save="save" :keyCheck="keyCheck"></config-form>
        </ez-dialog>
            <!-- //설정 다이얼로그 -->

            <!-- <div class="ml-2"></div> 
            <tooltip-btn fab small label="설정 수정" @click="addConfig">
                <v-icon>mdi-pencil</v-icon>
            </tooltip-btn>      -->
        
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import EzDialog from '../../components/etc/EzDialog.vue';
import TooltipBtn from '../../components/etc/TooltipBtn.vue'
import ConfigForm from './ConfigComponents/ConfigForm.vue';

export default {
    components: { TooltipBtn, EzDialog, ConfigForm },
    name : "admConfig",
    data() {
        return {

        } 
    },
    methods: {
        ...mapActions(['configDuplicateCheck', 'configSave']),
        addConfig() {
            console.log("설정 클릭")
            this.$refs.dialog.open();
        }, 
        async save(form) {
            console.log("config save",form);
            const data  = await this.configSave(form);
            this.$refs.dialog.close();
        },
        async keyCheck(value){
            // 키 중복검사
            const data = await this.configDuplicateCheck({field: 'cf_key', value})
            return data
        }
    }
}
</script>

<style>

</style>