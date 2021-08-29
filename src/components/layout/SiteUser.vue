<template>
  <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
  <v-menu v-else offset-y>
      <template v-slot:activator="{on, attrs}">
          <v-btn icon v-on="on" v-bind="attrs">
             <display-avatar :member="member"/>
          </v-btn>
      </template>
      <!-- 메뉴가 보이는거 -->
      <v-card>
          <v-card-text>
              <v-switch label="Dark Theme" :input-value="darkMode" @change="setDarkMode($event)"></v-switch>
          </v-card-text>
          <member-menu v-if="member"/>
          <no-member-menu v-else/>
      </v-card>
  </v-menu>
</template>

<script>

import { mapState } from 'vuex';
import DisplayAvatar from './DisplayAvatar.vue';
import MemberMenu from './MemberMenu.vue';
import NoMemberMenu from './NoMemberMenu.vue';
export default {
    components: {DisplayAvatar, MemberMenu, NoMemberMenu},
    name : 'SiteUser',
    data() {
        return{
            isLoading : false
        }
    },
    computed:{
        ...mapState({
            member : state => state.user.member,
        }),
        darkMode(){
            return this.$vuetify.theme.dark;
        }
    },
    mounted(){
        this.getDarkMode();
    },
    methods : {
        setDarkMode(mode){
            //스토리지에 저장
            localStorage.setItem('darkMode', mode ? 'dark' : 'light');
            this.$vuetify.theme.dark = mode;
;        },
        getDarkMode(){
            const mode = localStorage.getItem('darkMode') === 'dark' ? true : false;
            this.$vuetify.theme.dark = mode;
            //this.$vuetify.theme.dark = localStorage.getItem('darkMode') === 'dark' ? true : false;
        },
    }
}
</script>

<style>

</style>