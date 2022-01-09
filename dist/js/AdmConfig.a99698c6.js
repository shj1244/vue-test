(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AdmConfig"],{"414b":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,a=t.attrs;return[n("v-btn",e._g(e._b({class:e.childClass,on:{click:function(t){return e.$emit("click")}}},"v-btn",Object.assign({},e.$attrs,a),!1),r),[e._t("default")],2)]}}],null,!0)},[n("span",[e._v(e._s(e.label))])])},a=[],i={name:"ToolTipBtn",props:{label:{type:String,required:!0},childClass:[String,Object]},mounted:function(){}},o=i,c=n("2877"),s=Object(c["a"])(o,r,a,!1,null,null,null);t["a"]=s.exports},9415:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-toolbar",[n("v-toolbar-title",[e._v("설정관리")]),n("v-spacer"),n("tooltip-btn",{attrs:{fab:"",small:"",label:"설정 추가",color:"primary"},on:{click:e.addConfig}},[n("v-icon",[e._v("mdi-plus")])],1),n("tooltip-btn",{attrs:{fab:"",small:"",label:"서버 재시작",color:"error",childClass:"ml-2",loading:e.restart},on:{click:e.restartServer}},[n("v-icon",[e._v("mdi-power")])],1)],1),n("v-row",[n("v-col",[n("v-tabs",{attrs:{"background-color":"primary",dark:""},model:{value:e.group,callback:function(t){e.group=t},expression:"group"}},e._l(e.groupItems,(function(t){return n("v-tab",{key:t.cf_key},[e._v(" "+e._s(t)+" ")])})),1)],1)],1),n("draggable",{staticClass:"list-group",attrs:{tag:"ul",list:e.curItems,handle:".handle"},on:{end:e.sortEnd}},e._l(e.curItems,(function(t){return n("config-item",{key:t.cf_key,staticClass:"list-group-item",attrs:{item:t},on:{update:e.updateConfig,remove:e.removeConfig}})})),1),n("ez-dialog",{ref:"dialog",attrs:{label:"설정추가","max-width":"500",dark:"",color:"primary",persistent:""}},[n("config-form",{ref:"configForm",attrs:{keyCheck:e.keyCheck,groupItems:e.groupItems,item:e.item},on:{save:e.save}})],1)],1)},a=[],i=n("1da1"),o=n("2909"),c=n("5530"),s=(n("96cf"),n("d3b7"),n("6062"),n("3ca3"),n("ddb0"),n("159b"),n("a434"),n("4e82"),n("4de4"),n("2f62")),l=n("a2e4"),u=n("414b"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.save.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("v-combobox",{attrs:{items:e.groupItems,label:"그룹",rules:[e.rules.require({label:"그룹"})]},model:{value:e.form.cf_group,callback:function(t){e.$set(e.form,"cf_group",t)},expression:"form.cf_group"}}),n("div",{staticClass:"d-flex"},[n("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,a=t.attrs;return[n("span",e._g(e._b({staticClass:"mr-2"},"span",a,!1),r),[n("v-checkbox",{attrs:{color:"primary","true-value":1,"false-value":0},model:{value:e.form.cf_client,callback:function(t){e.$set(e.form,"cf_client",t)},expression:"form.cf_client"}})],1)]}}])},[n("span",[e._v("클라이언트")])]),n("input-duplicate-check",{ref:"cfKey",attrs:{label:"키",cbCheck:e.keyCheck,origin:e.orginKey,readonly:!!e.item,rules:[e.rules.require({label:"키"}),e.rules.alphaNum()]},model:{value:e.form.cf_key,callback:function(t){e.$set(e.form,"cf_key",t)},expression:"form.cf_key"}})],1),n("v-text-field",{attrs:{label:"이름",rules:e.rules.name()},model:{value:e.form.cf_name,callback:function(t){e.$set(e.form,"cf_name",t)},expression:"form.cf_name"}}),n("v-select",{attrs:{label:"값 타입",items:e.typeItems},model:{value:e.form.cf_type,callback:function(t){e.$set(e.form,"cf_type",t)},expression:"form.cf_type"}}),n("type-value",{attrs:{fieldType:e.form.cf_type},model:{value:e.form.cf_val,callback:function(t){e.$set(e.form,"cf_val",t)},expression:"form.cf_val"}}),n("v-slider",{attrs:{label:"접근레벨 ("+e.form.cf_level+")",min:e.LV.ADMIN,max:e.LV.SUPER,"thumb-color":"primary","thumb-label":""},model:{value:e.form.cf_level,callback:function(t){e.$set(e.form,"cf_level",t)},expression:"form.cf_level"}}),n("v-textarea",{attrs:{label:"설명"},model:{value:e.form.cf_comment,callback:function(t){e.$set(e.form,"cf_comment",t)},expression:"form.cf_comment"}}),n("v-btn",{attrs:{type:"submit",block:""}},[e._v("저장")])],1)},m=[],p=n("50d8"),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return"String"==e.fieldType?n("div",[n("v-text-field",{attrs:{label:"Value(문자)",value:e.value,readonly:e.readonly,"hide-details":e.readonly},on:{input:e.onInput}})],1):"Number"==e.fieldType?n("div",[n("v-text-field",{attrs:{label:"Value(숫자)",type:"number",value:e.value,readonly:e.readonly,"hide-details":e.readonly},on:{input:e.onInput}})],1):"CheckBox"==e.fieldType?n("div",[n("v-checkbox",{attrs:{label:"Check value","input-value":e.value,readonly:e.readonly,"hide-details":e.readonly,"true-value":"1","false-value":"0"},on:{change:e.onInput}})],1):"Json"==e.fieldType?n("div",[e.readonly?[n("v-btn",{attrs:{color:"primary"},on:{click:e.jsonView}},[e._v("JSON 보기")]),n("ez-dialog",{ref:"dialog",attrs:{label:"JSON 값 보기",width:"600"}},[n("pre",{staticClass:"mt-4"},[e._v(e._s(e.stringify()))])])]:n("v-textarea",{attrs:{label:"Value",value:e.value,readonly:e.readonly,"hide-details":e.readonly},on:{input:e.onInput}})],2):"Secret"==e.fieldType?n("div",[n("input-password",{attrs:{label:"Secret Value",value:e.value,readonly:e.readonly,"hide-details":e.readonly},on:{input:e.onInput}})],1):n("div",[n("div",[e._v("타입을 먼저 선택해 주세요.")])])},d=[],_=n("bbf4"),b=n("ac4f"),g=n.n(b),h={components:{inputPassword:_["a"],EzDialog:l["a"]},name:"TypeValue",model:{prop:"value",event:"input"},props:{value:{type:String},fieldType:{type:String,default:"String"},readonly:{type:Boolean,default:!1}},methods:{onInput:function(e){this.$emit("input",e)},stringify:function(){var e=JSON.parse(this.value),t=g()(e,{space:"  "});return t},jsonView:function(){this.$refs.dialog.open()}}},y=h,k=n("2877"),x=Object(k["a"])(y,v,d,!1,null,null,null),$=x.exports,C=n("bb5e"),w=n("248f"),O=n.n(w),S=n("64f2"),I={components:{InputDuplicateCheck:p["a"],TypeValue:$},name:"ConfigForm",props:{keyCheck:{type:Function,default:null},groupItems:{type:Array,default:[]},item:{type:Object,default:null}},data:function(){return{valid:!0,form:null,typeItems:["String","Number","CheckBox","Json","Secret"],orginKey:null}},computed:{LV:function(){return C["LV"]},rules:function(){return O.a}},created:function(){this.init()},watch:{item:function(){this.init()}},methods:{init:function(){if(this.item){if(this.form=Object(S["deepCopy"])(this.item),"Json"==this.form.cf_type){var e=JSON.parse(this.form.cf_val);this.form.cf_val=g()(e,{space:"  "})}this.orginKey=this.item.cf_key}else this.form={cf_key:"",cf_val:"",cf_name:"",cf_group:"",cf_level:"",cf_type:"String",cf_comment:"",cf_client:0},this.orginKey="";this.$refs.form&&this.$refs.form.resetValidation()},save:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$refs.form.validate(),t.next=3,e.$nextTick();case 3:if(e.valid){t.next=5;break}return t.abrupt("return");case 5:if(e.$refs.cfKey.validate()){t.next=7;break}return t.abrupt("return");case 7:e.item||(n=0,r=Object(S["findParentVm"])(e,"admConfig"),r.items.forEach((function(t){t.cf_group==e.form.cf_group&&n++})),e.form.cf_sort=n);try{"Json"==e.form.cf_type&&(a=JSON.parse(e.form.cf_val),e.form.cf_val=JSON.stringify(a)),e.$emit("save",e.form)}catch(i){e.$toast.error("JSON 형식이 올바르지 않습니다.")}case 9:case"end":return t.stop()}}),t)})))()}}},j=I,T=Object(k["a"])(j,f,m,!1,null,null,null),N=T.exports,V=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("v-icon",{staticClass:"handle"},[e._v("mdi-drag")]),n("div",[n("div",[n("div",[n("b",[e._v(e._s(e.item.cf_name))])]),n("div",[n("pre",{staticClass:"comment",domProps:{innerHTML:e._s(e.item.cf_comment)}})]),n("div",[n("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,a=t.attrs;return[n("v-avatar",e._g(e._b({attrs:{color:"primary",dark:"",size:"32"}},"v-avatar",a,!1),r),[n("span",{staticClass:"white--text"},[e._v(e._s(e.item.cf_level))])])]}}])},[n("span",[e._v("접근레벨")])])],1),n("div",[n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.$emit("update",e.item)}}},[n("v-icon",[e._v("mdi-pencil")])],1)],1)]),n("div",[n("div",[n("b",[e._v(e._s(e.item.cf_key))])]),n("div",[n("type-value",{attrs:{fieldType:e.item.cf_type,value:e.item.cf_val,readonly:!0}})],1),n("div",[n("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,a=t.attrs;return[n("div",e._g(e._b({staticClass:"client"},"div",a,!1),r),[n("v-checkbox",{attrs:{readonly:"","hide-details":"",dense:""},model:{value:e.item.cf_client,callback:function(t){e.$set(e.item,"cf_client",t)},expression:"item.cf_client"}})],1)]}}])},[n("span",[e._v("클라이언트 접근유무")])])],1),n("div",[n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.$emit("remove",e.item)}}},[n("v-icon",[e._v("mdi-delete")])],1)],1)])])],1)},E=[],J={components:{TypeValue:$},name:"ConfigItem",props:{item:{type:Object,required:!0}}},R=J,D=Object(k["a"])(R,V,E,!1,null,null,null),z=D.exports,F=n("b76a"),K=n.n(F),q={components:{TooltipBtn:u["a"],EzDialog:l["a"],ConfigForm:N,ConfigItem:z,draggable:K.a},name:"admConfig",data:function(){return{items:[],group:-1,curItems:[],item:null,restart:!1}},computed:Object(c["a"])(Object(c["a"])({},Object(s["e"])({online:function(e){return e.socket.online}})),{},{groupItems:function(){var e=new Set;return this.items.forEach((function(t){e.add(t.cf_group)})),Object(o["a"])(e)},groupName:function(){return this.groupItems[this.group]||""}}),watch:{online:function(){this.online&&(this.$toast.info("서버가 재시작 되었습니다."),this.restart=!1)},group:function(){this.setCurItems()}},mounted:function(){this.fetchData()},methods:Object(c["a"])(Object(c["a"])({},Object(s["b"])(["configDuplicateCheck","configSave"])),{},{addConfig:function(){this.item=null,this.$refs.configForm&&this.$refs.configForm.init(),this.$refs.dialog.open()},updateConfig:function(e){this.item=e,this.$refs.configForm&&this.$refs.configForm.init(),this.$refs.dialog.open()},removeConfig:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,a,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$ezNotify.confirm("<b>[".concat(e.cf_name,"]</b> 삭제 하시겠습니까?"),"설정항목삭제",{icon:"mdi-delete",iconColor:"red"});case 2:if(r=n.sent,r){n.next=5;break}return n.abrupt("return");case 5:return n.next=7,t.$axios.delete("/api/config/".concat(e.cf_key));case 7:a=n.sent,a&&(e.cf_client&&t.$socket.emit("config:remove",e.cf_key),t.$toast.info("[".concat(e.cf_name,"] 삭제 하였습니다.")),i=t.items.indexOf(e),t.items.splice(i,1),t.setCurItems());case 9:case"end":return n.stop()}}),n)})))()},save:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.configSave(e);case 2:r=n.sent,r.cf_client?t.$socket.emit("config:update",{key:r.cf_key,value:r.cf_val}):t.item&&t.item.cf_client&&t.$socket.emit("config:remove",r.cf_key),t.item?(t.$toast.info("[".concat(e.cf_name,"] 수정 하였습니다.")),a=t.items.indexOf(t.item),t.items.splice(a,1,r)):(t.$toast.info("[".concat(e.cf_name,"] 추가 하였습니다.")),t.items.push(r)),t.setCurItems(),t.$refs.dialog.close();case 7:case"end":return n.stop()}}),n)})))()},keyCheck:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.configDuplicateCheck({field:"cf_key",value:e});case 2:return r=n.sent,n.abrupt("return",r);case 4:case"end":return n.stop()}}),n)})))()},fetchData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/api/config?all=true");case 2:e.items=t.sent;case 3:case"end":return t.stop()}}),t)})))()},sortEnd:function(){var e=0,t=[];this.curItems.forEach((function(n){n.cf_sort=e++,t.push({cf_key:n.cf_key,cf_sort:n.cf_sort})})),this.$axios.put("/api/config",t)},setCurItems:function(){var e=this;this.curItems=this.items.filter((function(t){return t.cf_group==e.groupName})).sort((function(e,t){return e.cf_sort-t.cf_sort}))},restartServer:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$ezNotify.confirm("서버 재시작 요청을 하시겠습니까?","서버 재시작",{icon:"mdi-power",iconColor:"red"});case 2:if(n=t.sent,n){t.next=5;break}return t.abrupt("return");case 5:return e.restart=!0,t.next=8,e.$axios.get("/api/config/restart");case 8:r=t.sent,r?setTimeout((function(){e.restart&&(e.$toast.error("서버가 재시작 실패하였습니다.\n잠시 후 다시 시도 하세요."),e.restart=!1)}),2e4):e.restart=!1;case 10:case"end":return t.stop()}}),t)})))()}})},B=q,L=Object(k["a"])(B,r,a,!1,null,null,null);t["default"]=L.exports},a2e4:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",e._b({model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},"v-dialog",e.$attrs,!1),[n("v-card",[n("v-toolbar",e._b({},"v-toolbar",e.$attrs,!1),[n("v-toolbar-title",[e._v(e._s(e.label))]),n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:e.close}},[n("v-icon",[e._v("mdi-close")])],1)],1),n("v-card-text",[e._t("default")],2)],1)],1)},a=[],i={name:"ezDialog",props:{label:{type:String,required:!0}},data:function(){return{dialog:!1}},methods:{open:function(){this.$emit("onOpen"),this.dialog=!0},close:function(){this.dialog=!1,this.$emit("onClose")}}},o=i,c=n("2877"),s=Object(c["a"])(o,r,a,!1,null,null,null);t["a"]=s.exports}}]);
//# sourceMappingURL=AdmConfig.a99698c6.js.map