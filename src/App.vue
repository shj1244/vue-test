<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" :width="drawerWidth">
      <site-navi@close="toggleDrawer"/>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark hide-on-scroll>
      <v-app-bar-nav-icon @click="toggleDrawer"/>
      <site-title></site-title>
      <v-spacer></v-spacer>
      <site-user></site-user>
      
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <site-footer/>

    <vue-progress-bar></vue-progress-bar>

  </v-app>
</template>

<script>
import SiteFooter from './components/layout/SiteFooter.vue';
import SiteTitle from './components/layout/SiteTitle.vue';
import SiteNavi from './components/layout/SiteNavi.vue';
import SiteUser from './components/layout/SiteUser.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  components:{SiteTitle,SiteFooter,SiteNavi, SiteUser},
  data(){
    return{
      drawer : false,
    }
  },
  computed : {
    drawerWidth(){
      return this.$vuetify.breakpoint.xs? '100%' : '360';
    }
  },
  socket() {
    return {
      "connect" : () => {
        console.log("socket conncet");
        this.SET_ONLINE(true);
      },
      "disconnect" : () => {
        console.log("socket disconncet")
        this.SET_ONLINE(false);
      },
      "config:update" : (data) => {
        this.SET_CONFIG(data);
      },
      "config:remove" : (key) => {
        this.SET_CONFIG({key, value: null});
      }    
    }
  },
  mounted() {
    // this.$socket.on('config:update', (data) => {
    //   try{
    //     data.value = JSON.parse(data.value);
    //   } catch(e) {}
    //   this.SET_CONFIG(data);
    // })
    // this.$socket.on('config:remove', (key) => {
    //   this.SET_CONFIG({key, value: null})
    // })
  },
  destroyed(){
    //this.$socket.off("config:update", update);
    //this.$socket.off("config:remove", remove);
  },
  methods : {
    ...mapMutations(['SET_CONFIG']),
    ...mapMutations('socket',['SET_ONLINE']),
    toggleDrawer(){
      this.drawer = !this.drawer;
    },
  },
  
};
</script>
