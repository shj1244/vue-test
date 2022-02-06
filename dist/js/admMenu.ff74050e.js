(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admMenu"],{"414b":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on,i=t.attrs;return[n("v-btn",e._g(e._b({class:e.childClass,on:{click:function(t){return e.$emit("click")}}},"v-btn",Object.assign({},e.$attrs,i),!1),a),[e._t("default")],2)]}}],null,!0)},[n("span",[e._v(e._s(e.label))])])},i=[],r={name:"ToolTipBtn",props:{label:{type:String,required:!0},childClass:[String,Object]},mounted:function(){}},o=r,l=n("2877"),s=Object(l["a"])(o,a,i,!1,null,null,null);t["a"]=s.exports},"6f98":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on,i=t.attrs;return[n("v-avatar",e._g(e._b({attrs:{size:"20",color:e.LV_COLOR(e.level)}},"v-avatar",i,!1),a),[n("span",{staticStyle:{color:"#121212"}},[e._v(e._s(e.level))])])]}}])},[n("span",[e._v(e._s(e.LV_LABEL(e.level)))])])},i=[],r=(n("a9e3"),n("bb5e")),o={name:"DisplayLevel",props:{level:{type:[String,Number],required:!0}},size:{type:[String,Number],default:24},computed:{LV_COLOR:function(){return r["LV_COLOR"]},LV_LABEL:function(){return r["LV_LABEL"]}}},l=o,s=n("2877"),c=Object(s["a"])(l,a,i,!1,null,null,null);t["a"]=c.exports},a2e4:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",e._b({model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},"v-dialog",e.$attrs,!1),[n("v-card",[n("v-toolbar",e._b({},"v-toolbar",e.$attrs,!1),[n("v-toolbar-title",[e._v(e._s(e.label))]),n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:e.close}},[n("v-icon",[e._v("mdi-close")])],1)],1),n("v-card-text",[e._t("default")],2)],1)],1)},i=[],r={name:"ezDialog",props:{label:{type:String,required:!0}},data:function(){return{dialog:!1}},methods:{open:function(){this.$emit("onOpen"),this.dialog=!0},close:function(){this.dialog=!1,this.$emit("onClose")}}},o=r,l=n("2877"),s=Object(l["a"])(o,a,i,!1,null,null,null);t["a"]=s.exports},caab:function(e,t,n){"use strict";n("d4ee")},d4ee:function(e,t,n){},f213:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-toolbar",[n("v-toolbar-title",[e._v("메뉴 관리")]),n("v-spacer"),n("tooltip-btn",{attrs:{label:"새 메뉴 추가",icon:"",small:"",fab:"",color:"secondary"},on:{click:e.addMenu}},[n("v-icon",[e._v("mdi-plus")])],1),n("tooltip-btn",{attrs:{label:"저장",icon:"",small:"",fab:"",color:"primary"},on:{click:e.updateMenu}},[n("v-icon",[e._v("mdi-content-save-outline")])],1),n("tooltip-btn",{attrs:{label:"초기화",icon:"",small:"",fab:"",color:"error"},on:{click:e.refresh}},[n("v-icon",[e._v("mdi-refresh")])],1)],1),n("nested-drag-menu",{staticClass:"mt-4",attrs:{items:e.items}}),n("ez-dialog",{ref:"dialog",attrs:{with:"500",label:"메뉴",persistent:""}},[n("menu-form",{staticClass:"mt-4",attrs:{item:e.curItem},on:{save:e.save}})],1)],1)},i=[],r=n("1da1"),o=n("b85c"),l=n("5530"),s=(n("96cf"),n("a434"),n("2f62")),c=n("64f2"),u=n("a2e4"),m=n("414b"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.form?n("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.save.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("v-btn",{attrs:{plain:"",href:"https://materialdesignicons.com/",target:"_blank",color:"success",small:""}},[e._v("머터리얼 디자인 아이콘")]),n("v-text-field",{attrs:{label:"아이콘","prepend-icon":e.form.icon},model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}}),n("v-text-field",{attrs:{label:"이름",rules:[e.rules.require({label:"이름"})]},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}}),n("v-text-field",{attrs:{label:"링크"},model:{value:e.form.to,callback:function(t){e.$set(e.form,"to",t)},expression:"form.to"}}),n("input-level",{attrs:{label:"접근권한"},model:{value:e.form.grant,callback:function(t){e.$set(e.form,"grant",t)},expression:"form.grant"}}),n("v-checkbox",{attrs:{label:"새창에서 열기"},model:{value:e.form.newTab,callback:function(t){e.$set(e.form,"newTab",t)},expression:"form.newTab"}}),n("v-checkbox",{attrs:{label:"메뉴 숨김 열기"},model:{value:e.form.isHide,callback:function(t){e.$set(e.form,"isHide",t)},expression:"form.isHide"}}),n("v-btn",{attrs:{block:"",type:"submit",color:"primary"}},[e._v("저장")])],1):e._e()},f=[],v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"text-caption"},[e._v(e._s(e.label)+" "+e._s(e.value)+" : "+e._s(e.lvLabel))]),n("v-slider",{attrs:{value:e.value,min:e.LV.BLOCK,max:e.LV.SUPER,ticks:"always","thumb-label":"","prepend-icon":e.icon,"hide-details":""},on:{change:e.onChange}})],1)},p=[],b=(n("a9e3"),n("bb5e")),h={name:"InputLevel",model:{prop:"value",event:"change"},props:{value:Number,label:{type:String,default:"레벨"},icon:{type:String,default:""}},computed:{LV:function(){return b["LV"]},lvLabel:function(){return Object(b["LV_LABEL"])(this.value)}},methods:{onChange:function(e){this.$emit("change",e)}}},g=h,_=n("2877"),y=Object(_["a"])(g,v,p,!1,null,null,null),x=y.exports,k=n("248f"),O=n.n(k),w={components:{InputLevel:x},name:"MenuForm",props:{item:{type:Object,default:null}},data:function(){return{valid:!0,form:null}},computed:{rules:function(){return O.a}},mounted:function(){this.init()},watch:{item:function(){this.init()}},methods:{init:function(){this.item?this.form=Object(c["deepCopy"])(this.item):this.form={grant:0,icon:"mdi-",newTab:!1,subItems:[],title:"",to:"",isHide:!1},console.log("menuForm==>",this.form)},save:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$refs.form.validate(),t.next=3,e.$nextTick();case 3:if(e.valid){t.next=5;break}return t.abrupt("return");case 5:e.$emit("save",e.form),e.init();case 7:case"end":return t.stop()}}),t)})))()}}},$=w,L=Object(_["a"])($,d,f,!1,null,null,null),C=L.exports,j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("draggable",e._b({staticClass:"menu-drag-container",attrs:{tag:"div",list:e.items,handle:".handle"}},"draggable",e.dragOptions,!1),e._l(e.items,(function(t,a){return n("div",{key:""+a+e.items.title,staticClass:"menu-drag-group"},[n("v-expand-transition",[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}]},[n("div",{staticClass:"menu-drag-zone"},[n("v-sheet",{staticClass:"menu-drag-item d-flex pa-4 pt-6",attrs:{outlined:"",rounded:"",elevation:"2"}},[n("div",{staticClass:"icon"},[n("v-icon",[e._v("mdi-subdirectory-arrow-right")])],1),n("div",{staticClass:"handle"},[n("v-icon",[e._v("mdi-drag")])],1),n("v-btn",{staticClass:"ml-4",attrs:{icon:"",disabled:0==t.subItems.length,small:""},on:{click:function(n){return e.toggleSub(t)}}},[n("v-icon",[e._v("mdi-chevron-down")])],1),t.isHide?n("v-icon",{attrs:{color:"grey"}},[e._v("mdi-eye-off")]):n("v-icon",{attrs:{color:"primary"}},[e._v("mdi-eye")]),n("v-text-field",{staticClass:"ml-2",attrs:{label:"title","hide-details":"",dense:"","prepend-icon":t.icon,readonly:""},model:{value:t.title,callback:function(n){e.$set(t,"title",n)},expression:"item.title"}}),n("display-level",{attrs:{level:t.grant,size:32}}),n("v-text-field",{staticClass:"ml-2",attrs:{label:"link","hide-details":"",dense:"",readonly:""},model:{value:t.to,callback:function(n){e.$set(t,"to",n)},expression:"item.to"}}),n("tooltip-btn",{attrs:{label:"수정",icon:"",small:"",color:"primary",childClass:"ml-2"},on:{click:function(n){return e.modifyItem(t)}}},[n("v-icon",[e._v("mdi-pencil")])],1),n("tooltip-btn",{attrs:{label:"삭제",icon:"",small:"",color:"error",childClass:"ml-2"},on:{click:function(n){return e.removeItem(t)}}},[n("v-icon",[e._v("mdi-delete")])],1)],1)],1),n("nested-drag-menu",{staticClass:"menu-drag-subItem",attrs:{items:t.subItems,show:t.show}})],1)])],1)})),0)},S=[],I=n("b76a"),E=n.n(I),M=n("6f98"),V={components:{draggable:E.a,DisplayLevel:M["a"],TooltipBtn:m["a"]},name:"NestedDragMenu",props:{items:{type:Array,required:!0},show:{type:Boolean,default:!0}},data:function(){return{}},computed:{dragOptions:function(){return{animation:0,group:"description",disabled:!1,ghostClass:"ghost"}}},created:function(){var e,t=Object(o["a"])(this.items);try{for(t.s();!(e=t.n()).done;){var n=e.value;this.$set(n,"show",!1)}}catch(a){t.e(a)}finally{t.f()}},mounted:function(){},methods:{toggleSub:function(e){e.show=!e.show},removeItem:function(e){var t=this.items.indexOf(e);this.items.splice(t,1)},modifyItem:function(e){var t=Object(c["findParentVm"])(this,"AdmMenu");t.modifyMenu(e,this.items)}}},z=V,N=(n("caab"),Object(_["a"])(z,j,S,!1,null,null,null)),R=N.exports,B={components:{TooltipBtn:m["a"],NestedDragMenu:R,EzDialog:u["a"],MenuForm:C},name:"AdmMenu",data:function(){return{items:[],curItem:null,parent:null}},computed:Object(l["a"])({},Object(s["e"])({menu:function(e){return e.config.menu}})),mounted:function(){this.init()},methods:Object(l["a"])(Object(l["a"])({},Object(s["b"])(["configSave"])),{},{init:function(){var e,t=Object(c["deepCopy"])(this.menu),n=Object(o["a"])(t);try{for(n.s();!(e=n.n()).done;){var a=e.value;this.$set(a,"show",!1)}}catch(i){n.e(i)}finally{n.f()}this.items=t},addMenu:function(){this.curItem=null,this.$refs.dialog.open()},modifyMenu:function(e,t){this.curItem=e,this.parent=t,this.$refs.dialog.open()},save:function(e){if(this.curItem){var t=this.parent.indexOf(this.curItem);this.parent.splice(t,1,e)}else e.show=!1,this.items.push(e);this.$refs.dialog.close()},refresh:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$ezNotify.confirm("메뉴를 초기화 하시겠습니까?","메뉴 초기화",{icon:"mdi-refresh"});case 2:if(n=t.sent,n){t.next=5;break}return t.abrupt("return");case 5:e.init();case 6:case"end":return t.stop()}}),t)})))()},updateMenu:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$ezNotify.confirm("메뉴를 저장 하시겠습니까?","메뉴 저장",{icon:"mdi-content-save-outline"});case 2:if(n=t.sent,n){t.next=5;break}return t.abrupt("return");case 5:return t.next=7,e.configSave({cf_client:1,cf_comment:"메뉴는 메뉴관리자에서 수정하세요.",cf_group:"기본환경",cf_key:"menu",cf_level:6,cf_name:"메뉴",cf_type:"JSON",cf_val:JSON.stringify(e.items)});case 7:a=t.sent,a&&e.$socket.emit("config:update",{key:a.cf_key,value:a.cf_val});case 9:case"end":return t.stop()}}),t)})))()}})},T=B,A=Object(_["a"])(T,a,i,!1,null,null,null);t["default"]=A.exports}}]);
//# sourceMappingURL=admMenu.ff74050e.js.map