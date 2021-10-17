import Vue from "vue";
import vuetify from "../plugins/vuetify";
import ezNotify from "./ezNotifyPlugin";

const option = {
    icon : "",
    iconColor : "red",
    type : "alert",
    width : 400,
    //text : "",
    text : "abcd1234",
}

Vue.use(ezNotify, vuetify, option)