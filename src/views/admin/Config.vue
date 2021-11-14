<template>
    <v-container>
        <v-toolbar>
            <v-toolbar-title>설정관리</v-toolbar-title>
            <v-spacer></v-spacer>
            <tooltip-btn fab small label="설정 추가" @click="addConfig">
                <v-icon>mdi-plus</v-icon>
            </tooltip-btn> 
        </v-toolbar>

        <v-row>
            <v-col>
                <v-tabs v-model="group" background-color="primary" dark>
                    <v-tab v-for="item in groupItems" :key="item.cf_key">
                    {{ item }}
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <draggable tag="ul" :list="curItems" class="list-group" handle=".handle" @end="sortEnd">
            <config-item
                class="list-group-item"
                v-for="item in curItems"
                :key="item.cf_key"
                :item="item"
                @update="updateConfig"
                @remove="removeConfig"
            >
            </config-item>
        </draggable>

        <!-- 설정 다이얼로그 -->
        <ez-dialog label="설정추가" ref="dialog" max-width="500" dark color="primary" persistent>
            <config-form @save="save" :keyCheck="keyCheck" :groupItems="groupItems" :item="item"></config-form>
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
import ConfigItem from './ConfigComponents/ConfigItem.vue';
import draggable from "vuedraggable";

export default {
    components: { TooltipBtn, EzDialog, ConfigForm, ConfigItem, draggable},
    name : "admConfig",
    data() {
        return {
            items : [],
            group : -1,
            curItems : [],
            item : null,
        } 
    },
    computed: {
        groupItems(){
            const sets = new Set();
            this.items.forEach((item)=>{
                sets.add(item.cf_group)
            });
            return [...sets];
        },
        groupName(){
            return this.groupItems[this.group] || '';
        },
    },
    watch: {
        group(){
            this.setCurItems();
        }
    },
    mounted(){
        this.fetchData()
    },
    methods: {
        ...mapActions(['configDuplicateCheck', 'configSave']),
        addConfig() {
            this.item = null;
            if(this.$refs.ConfigForm){
                this.$refs.ConfigForm.init();
            }            
            this.$refs.dialog.open();
        },
        updateConfig(item) {
            this.item = item;
            if(this.$refs.ConfigForm){
                this.$refs.ConfigForm.init();
            }
            this.$refs.dialog.open();
        },
        async removeConfig(item) {
            // 정말 삭제?
            const result = await this.$ezNotify.confirm(
                `<b>[${item.cf_name}]</b> 삭제 하시겠습니까?`,
                '설정항목삭제',
                {icon : 'mdi-delete', iconColor: 'red'}
            );
            if(!result) return;
            // DB 삭제
            const data = await this.$axios.delete(`/api/config/${item.cf_key}`);
            // DB 목록 업데이트
            if(data) {
                this.$toast.info(`[${item.cf_name}] 삭제 하였습니다.`);
                const idx = this.items.indexOf(item); // 인덱스 가져오기
                this.items.splice(idx, 1);
                this.setCurItems();
            }
        },
        async save(form) {
            const data  = await this.configSave(form);
            if(this.item) { // 수정
                this.$toast.info(`[${form.cf_name}] 수정 하였습니다.`);
                const idx = this.items.indexOf(this.item); // 인덱스 가져오기
                console.log(idx);
                this.items.splice(idx, 1, data);
            } else { // 신규
                this.$toast.info(`[${form.cf_name}] 추가 하였습니다.`);
                this.items.push(data);
            }
            this.setCurItems();
            this.$refs.dialog.close();
        },
        async keyCheck(value){
            // 키 중복검사
            const data = await this.configDuplicateCheck({field: 'cf_key', value})
            return data
        },
        async fetchData(){
            this.items = await this.$axios.get('/api/config?all=true'); // all=true는 store에 있는 정보 구분을 위해(해당은 관리자 데이터)

        },
        sortEnd() {
            // 현재 curItems 에 있는 정보로 cf_sort 업데이트 전체
            let i = 0;
            //const arr = []
            const payload = [];
            this.curItems.forEach((item)=>{
                item.cf_sort = i++;
                payload.push({
                    cf_key : item.cf_key, 
                    cf_sort :item.cf_sort,
                });
                // arr.push({
                //     cf_key : item.cf_key,
                //     cf_sort :item.cf_sort,
                // })
            });
            //console.log(arr);
            this.$axios.put('/api/config', this.curItems);
        },
        setCurItems(){
            this.curItems = this.items.filter((item)=>{
                return item.cf_group == this.groupName;
            });
        }
    },
}
</script>

<style>

</style>