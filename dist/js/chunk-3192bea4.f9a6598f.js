(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3192bea4"],{"414b":function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[o("v-btn",t._g(t._b({class:t.childClass,on:{click:function(e){return t.$emit("click")}}},"v-btn",Object.assign({},t.$attrs,n),!1),a),[t._t("default")],2)]}}],null,!0)},[o("span",[t._v(t._s(t.label))])])},n=[],i={name:"ToolTipBtn",props:{label:{type:String,required:!0},childClass:[String,Object]},mounted:function(){}},s=i,r=o("2877"),c=Object(r["a"])(s,a,n,!1,null,null,null);e["a"]=c.exports},7376:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("tooltip-btn",{attrs:{label:t.searchLabel,icon:"",small:""},on:{click:t.open}},[o("v-icon",[t._v("mdi-magnify")])],1),t.options.stf[0]?o("tooltip-btn",{attrs:{type:"button",label:"검색 초기화",icon:"",color:"error",small:""},on:{click:t.reset}},[o("v-icon",[t._v("mdi-magnify-close")])],1):t._e(),o("ez-dialog",{ref:"dialog",attrs:{label:t.label,width:"300"}},[o("v-form",{ref:"form",staticClass:"mt-4",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.searchGo.apply(null,arguments)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[o("v-select",{attrs:{label:"검색 필드",items:t.items,rules:[t.rules.require({label:"검색필드"})]},model:{value:t.form.stf,callback:function(e){t.$set(t.form,"stf",e)},expression:"form.stf"}}),o("v-select",{attrs:{label:"비교방식",items:t.compItems},model:{value:t.form.stc,callback:function(e){t.$set(t.form,"stc",e)},expression:"form.stc"}}),o("v-text-field",{attrs:{label:"검색어",rules:[t.rules.require({label:"검색어"})],disabled:t.isNullComp},model:{value:t.form.stx,callback:function(e){t.$set(t.form,"stx",e)},expression:"form.stx"}}),o("div",{staticClass:"d-flex"},[o("tooltip-btn",{attrs:{type:"button",label:"검색 초기화",icon:"",color:"error"},on:{click:t.reset}},[o("v-icon",[t._v("mdi-magnify-close")])],1),o("v-spacer"),o("tooltip-btn",{attrs:{type:"submit",label:"검색",icon:"",color:"primary"}},[o("v-icon",[t._v("mdi-magnify")])],1)],1)],1)],1)],1)},n=[],i=o("5530"),s=o("1da1"),r=(o("96cf"),o("7db0"),o("99af"),o("a434"),o("a2e4")),c=o("414b"),l=o("248f"),u=o.n(l),p={components:{TooltipBtn:c["a"],EzDialog:r["a"]},name:"SearchField",props:{label:{type:String,default:"검색"},items:{type:Array,required:!0},options:{type:Object,required:!0}},data:function(){return{valid:!0,form:{stf:"",stx:"",stc:""},compItems:[{text:"포함",value:"like"},{text:"작은",value:"lt"},{text:"작거나 같은",value:"lte"},{text:"같은",value:"eq"},{text:"크거나 같은",value:"gte"},{text:"큰",value:"gt"},{text:"같지 않음",value:"ne"},{text:"NULL",value:"null"},{text:"NOT NULL",value:"not"}],tempText:""}},computed:{rules:function(){return u.a},searchLabel:function(){var t=this,e=this.items.find((function(e){return e.value==t.options.stf[0]}));return e?"".concat(e.text," : ").concat(this.options.stx[0]):this.label},isNullComp:function(){return"null"==this.form.stc||"not"==this.form.stc?(this.tempText||(this.tempText=this.form.stx,this.form.stx="Null"),!0):(this.tempText&&(this.form.stx=this.tempText,this.tempText=""),!1)}},methods:{open:function(){this.form.stf=this.options.stf[0]||this.items[0].value,this.form.stc=this.options.stc[0]||"like",this.form.stx=this.options.stx[0],this.$refs.form&&this.$refs.form.resetValidation(),this.$refs.dialog.open()},searchGo:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$refs.form.validate(),e.next=3,t.$nextTick();case 3:if(t.valid){e.next=5;break}return e.abrupt("return");case 5:o=Object(i["a"])(Object(i["a"])({},t.options),{},{page:1}),o.stf.splice(0,1,t.form.stf),o.stc.splice(0,1,t.form.stc),o.stx.splice(0,1,t.form.stx),t.$emit("update:options",o),t.$refs.dialog.close();case 11:case"end":return e.stop()}}),e)})))()},reset:function(){var t=Object(i["a"])(Object(i["a"])({},this.options),{},{page:1});t.stf.splice(0,1,""),t.stc.splice(0,1,""),t.stx.splice(0,1,""),this.$emit("update:options",t),this.$refs.dialog.close()}}},f=p,d=o("2877"),m=Object(d["a"])(f,a,n,!1,null,null,null);e["a"]=m.exports},7622:function(t,e,o){"use strict";o("e5b7")},a2e4:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-dialog",t._b({model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},"v-dialog",t.$attrs,!1),[o("v-card",[o("v-toolbar",t._b({},"v-toolbar",t.$attrs,!1),[o("v-toolbar-title",[t._v(t._s(t.label))]),o("v-spacer"),o("v-btn",{attrs:{icon:""},on:{click:t.close}},[o("v-icon",[t._v("mdi-close")])],1)],1),o("v-card-text",[t._t("default")],2)],1)],1)},n=[],i={name:"ezDialog",props:{label:{type:String,required:!0}},data:function(){return{dialog:!1}},methods:{open:function(){this.$emit("onOpen"),this.dialog=!0},close:function(){this.dialog=!1,this.$emit("onClose")}}},s=i,r=o("2877"),c=Object(r["a"])(s,a,n,!1,null,null,null);e["a"]=c.exports},c117:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",t._b({},"div",t.$attrs,!1),[o("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[o("v-btn",t._g(t._b({attrs:{color:t.goodColor},on:{click:function(e){return e.stopPropagation(),t.goodUpdate(1)}}},"v-btn",Object.assign({},n,t.btnProps),!1),a),[o("v-icon",{attrs:{left:""}},[t._v(t._s(t.icon.good))]),t._v(" "+t._s(t.good)+" ")],1)]}}])},[o("span",[t._v("좋아요")])]),t.goodOnly?t._e():o("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[o("v-btn",t._g(t._b({attrs:{color:t.badColor},on:{click:function(e){return e.stopPropagation(),t.goodUpdate(2)}}},"v-btn",Object.assign({},n,t.btnProps),!1),a),[o("v-icon",{attrs:{left:""}},[t._v(t._s(t.icon.bad))]),t._v(" "+t._s(t.bad)+" ")],1)]}}],null,!1,189465039)},[o("span",[t._v("싫어요")])])],1)},n=[],i=o("1da1"),s=o("5530"),r=(o("96cf"),o("99af"),o("2f62")),c={name:"DisplayGood",props:{item:{type:Object,required:!0},table:{type:String,required:!0},btnProps:{type:Object,default:null},icon:{type:Object,default:function(){return{good:"mdi-heart-outline",bad:"mdi-heart-broken-outline"}}},goodOnly:{type:Boolean,default:!1}},data:function(){return{goodFlag:this.item.goodFlag,good:this.item.good,bad:this.item.bad}},computed:Object(s["a"])(Object(s["a"])({},Object(r["e"])("user",["member"])),{},{goodColor:function(){return 1==this.goodFlag?"primary":""},badColor:function(){return 2==this.goodFlag?"error":""}}),methods:{goodUpdate:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function o(){var a;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(e.member){o.next=3;break}return e.$toast.error("회원만 사용할 수 있습니다."),o.abrupt("return");case 3:if(t!=e.goodFlag){o.next=9;break}return o.next=6,e.$axios.delete("/api/good/".concat(e.table,"/").concat(e.item.wr_id));case 6:a=o.sent,o.next=12;break;case 9:return o.next=11,e.$axios.post("/api/good/".concat(e.table,"/").concat(e.item.wr_id),{bg_flag:t});case 11:a=o.sent;case 12:a&&(e.goodFlag=a.goodFlag,e.good=a.good,e.bad=a.bad);case 13:case"end":return o.stop()}}),o)})))()}}},l=c,u=o("2877"),p=Object(u["a"])(l,a,n,!1,null,null,null);e["a"]=p.exports},c893:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-select",{attrs:{label:"카테고리",items:t.items,"hide-details":"",dense:""},on:{change:t.cateChange},model:{value:t.cateItem,callback:function(e){t.cateItem=e},expression:"cateItem"}})},n=[],i=o("2909"),s=o("5530"),r=(o("99af"),o("a434"),o("2f62")),c={name:"CateSelect",props:{options:{type:Object,required:!0}},data:function(){return{cateItem:"전체"}},computed:Object(s["a"])(Object(s["a"])({},Object(r["e"])({config:function(t){return t.board.config}})),{},{items:function(){return this.config.bo_use_category?["전체"].concat(Object(i["a"])(this.config.bo_category)):[]}}),mounted:function(){},methods:{cateChange:function(){var t="전체"==this.cateItem?"":this.cateItem,e=Object(s["a"])(Object(s["a"])({},this.options),{},{page:1});console.log("options....",e),e.stx.splice(1,1,t),this.$emit("update:options",e)}}},l=c,u=o("2877"),p=Object(u["a"])(l,a,n,!1,null,null,null);e["a"]=p.exports},ca4c:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",{attrs:{fluid:""}},[o("v-toolbar",[o("v-toolbar-title",[t._v(t._s(t.pageTitle)+" ")]),1==t.config.bo_use_category?o("v-sheet",{staticClass:"ml-4",attrs:{width:"150"}},[o("cate-select",{attrs:{options:t.options},on:{"update:options":function(e){t.options=e}}})],1):t._e(),o("search-field",{attrs:{items:t.searchItems,options:t.options},on:{"update:options":function(e){t.options=e}}}),o("v-spacer"),o("v-btn",{attrs:{to:"/board/"+t.table+"?act=write",color:"primary"}},[o("v-icon",{attrs:{left:""}},[t._v("mdi-pencil")]),t._v(" 새글 작성 ")],1)],1),o("v-row",t._l(t.items,(function(e,a){return o("v-col",{key:e.wr_id,staticClass:"mt-4 gal-item",attrs:{cols:"6",md:"3",lg:"2"}},[o("v-card",{staticStyle:{color:"white","background-color":"#444"}},[o("v-card-title",{staticClass:"px-0 mx-4 text-body-1"},[o("span",{staticStyle:{width:"100%","text-overflow":"ellipsis",overflow:"hidden","white-space":"nowrap"}},[t._v(" "+t._s(e.wr_title)+" ")])]),o("v-card-subtitle",{staticClass:"d-flex pb-2",staticStyle:{color:"white"}},[t._v(" "+t._s(e.wr_name)+" "),o("v-spacer"),o("display-time",{attrs:{time:e.wr_createat}})],1),o("a",{staticClass:"text-decoration-none",on:{click:function(o){return t.$router.push("/board/"+t.table+"/"+e.wr_id)}}},[o("v-img",{attrs:{src:t.getImage(e),"aspect-ratio":1}})],1),o("div",{staticClass:"d-flex justify-space-between align-center ml-4"},[o("div",{staticStyle:{color:"white"}},[o("v-icon",{attrs:{color:"white",small:""}},[t._v("mdi-eye")]),o("span",{staticClass:"pl-2"},[t._v(t._s(e.wr_view))]),o("v-icon",{staticClass:"ml-2",attrs:{color:"white",small:""}},[t._v("mdi-comment-outline")]),o("span",{staticClass:"pl-2"},[t._v(t._s(e.wr_reply))])],1),o("v-spacer"),o("display-good",{attrs:{item:e,table:t.table,btnProps:{tile:!0,small:!0,elevation:0},"good-only":""}})],1)],1)],1)})),1),o("v-row",[o("v-col",[o("v-pagination",{attrs:{length:t.pageCount},model:{value:t.options.page,callback:function(e){t.$set(t.options,"page",e)},expression:"options.page"}})],1)],1)],1)},n=[],i=o("b85c"),s=o("1da1"),r=o("5530"),c=(o("96cf"),o("a434"),o("4de4"),o("a9e3"),o("99af"),o("2ca0"),o("ac1f"),o("466d"),o("4328")),l=o.n(c),u=o("64f2"),p=o("2f62"),f=o("7376"),d=o("c893"),m=o("d3f8"),h=o("c117"),b={components:{SearchField:f["a"],CateSelect:d["a"],DisplayTime:m["a"],DisplayGood:h["a"]},name:"GalleryList",props:{config:Object,access:Object},title:function(){return this.pageTitle},data:function(){return{loading:!1,options:{},pageRouting:!1,pageReady:!1,imgSize:{w:"300",h:"300"}}},computed:Object(r["a"])(Object(r["a"])({},Object(p["e"])({items:function(t){return t.board.list},totalItems:function(t){return t.board.totalItems}})),{},{table:function(){return this.config.bo_table},pageTitle:function(){return this.config.bo_subject+" 게시판"},headers:function(){var t=[{text:"No",value:"no",align:"center",sortable:!1,searchable:!1,width:"80"},{text:"제목",value:"wr_title",align:"start",sortable:!1,searchable:!0},{text:"작성자",value:"wr_name",align:"center",sortable:!1,searchable:!0,width:"100"},{text:"작성일",value:"wr_createat",align:"center",sortable:!1,searchable:!1,width:"130"},{text:"조회수",value:"wr_view",align:"center",sortable:!1,searchable:!1,width:"80"}];return this.config.bo_use_category&&t.splice(1,0,{text:"Cate",value:"wr_category",align:"center",sortable:!1,searchable:!1,width:"80"}),t},searchItems:function(){var t=this.headers.filter((function(t){return t.searchable}));return t.push({text:"내용",value:"wr_content"}),t},pageCount:function(){return Math.ceil(this.totalItems/this.options.itemsPerPage)}}),watch:{options:{handler:function(){this.fetchData()},deep:!0},table:function(){this.fetchData()}},serverPrefetch:function(){return this.fetchData()},created:function(){this.options=this.initOptions()},mounted:function(){window.addEventListener("popstate",this.routeChange)},destroyed:function(){window.removeEventListener("popstate",this.routeChange),this.SET_LIST({items:[],totalItems:0})},methods:Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(p["b"])("board",["getBoardList"])),Object(p["d"])("board",["SET_LIST"])),{},{initOptions:function(){var t=this.$route.query,e={page:Number(t.page)||1,itemsPerPage:Number(t.itemsPerPage)||3,stf:[t.stf||"","wr_category"],stx:[t.stx||"",""],stc:[t.stc||"","eq"]};return e},pushState:function(){if(!this.pageRouting){var t={page:this.options.page,itemsPerPage:this.options.itemsPerPage,stf:this.options.stf[0]||void 0,stx:this.options.stx[0]||void 0,stc:this.options.stc[0]||void 0,ca:this.options.stx[1]||void 0},e=l.a.stringify(t);this.pageReady?history.pushState(null,null,"".concat(this.$route.path,"?").concat(e)):history.replaceState(null,null,"".concat(this.$route.path,"?").concat(e))}},routeChange:function(){this.pageRouting=!0,this.options=this.initOptions()},getPayload:function(){var t=Object(u["deepCopy"])(this.options);return t.stf.push("wr_reply"),t.stc.push("eq"),t.stx.push("0"),t},fetchData:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var o,a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return o=t.getPayload(),a=l.a.stringify(o),n={},t.$ssrContext&&(n.token=t.$ssrContext.token),e.next=6,t.getBoardList({vm:t,query:a,headers:n});case 6:case"end":return e.stop()}}),e)})))()},getNo:function(t){var e=this.options,o=e.page,a=e.itemsPerPage,n=this.totalItems;return n-(o-1)*a-t},getImage:function(t){if(t.wrImgs.length)return"/upload/".concat(this.table,"/").concat(t.wrImgs[0].bf_src,"?w=").concat(this.imgSize.w,"&h=").concat(this.imgSize.h);if(t.wrFiles.length){var e,o=Object(i["a"])(t.wrFiles);try{for(o.s();!(e=o.n()).done;){var a=e.value;if(a.bf_type.startsWith("image"))return"/upload/".concat(this.table,"/").concat(files[0].bf_src,"?w=").concat(this.imgSize.w,"&h=").concat(this.imgSize.h)}}catch(r){o.e(r)}finally{o.f()}}var n=/<img[^>]*src=\"([^\"]+)\"[^>]*>/,s=t.wr_content.match(n);return s?s[1]:"/img/no_image.png"}})},v=b,g=(o("7622"),o("2877")),_=Object(g["a"])(v,a,n,!1,null,null,null);e["default"]=_.exports},d3f8:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[o("span",t._g(t._b({},"span",n,!1),a),[t._v(" "+t._s(t.display)+" ")])]}}])},[t._v(" "+t._s(t.formatTime)+" ")])},n=[],i={name:"DisplayTime",props:{time:{type:String,required:!0}},computed:{formatTime:function(){return this.$moment(this.time).format("LLL")},display:function(){var t=this.$moment(this.time),e=this.$moment(),o=e.diff(t,"days");return o>0?t.format("LL"):t.fromNow()}}},s=i,r=o("2877"),c=Object(r["a"])(s,a,n,!1,null,null,null);e["a"]=c.exports},e5b7:function(t,e,o){}}]);
//# sourceMappingURL=chunk-3192bea4.f9a6598f.js.map