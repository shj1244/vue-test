import ezNotifyInterface from "./ezNotifyInterface.vue";

const defalutOption = {
    icon : 'mdi-alert',
    iconColor : 'orange',
    type :"prompt",
    width : 300,
    text : "",
}

export default {
    install(Vue, vuetify, options){
        const Construct = Vue.extend(ezNotifyInterface);
        const Instance = new Construct({
            vuetify : vuetify,
            data : {
                options : Object.assign(defalutOption, options)
            }
        });
        
        Vue.prototype.$nextTick(()=> {
            Vue.prototype.$ezNotify = Instance.$mount();
            document.getElementById('app').appendChild(Instance.$el);
        });
    }
}