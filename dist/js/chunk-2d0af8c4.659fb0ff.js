(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0af8c4"],{"0f91":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-toolbar",[a("v-toolbar-title",[t._v(t._s(t.pageTitle)+" ")]),a("v-spacer"),a("v-btn",{attrs:{to:"/board/"+t.table+"?act=write",color:"primary"}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-pencil")]),t._v(" 새글 작성 ")],1)],1),a("v-data-table",{attrs:{headers:t.headers,items:t.items,options:t.options,"server-items-length":t.totalItems,loading:t.loading},on:{"update:options":function(e){t.options=e}},scopedSlots:t._u([{key:"item.wr_title",fn:function(e){var r=e.item;return[a("v-btn",{staticClass:"justify-start pl-0",attrs:{to:"/board/"+t.table+"/"+r.wr_id,block:"",plain:""}},[a("div",[t._v(t._s(r.wr_title))])])]}}])})],1)},s=[],n=a("1da1"),o=a("b85c"),i=(a("96cf"),a("a434"),a("99af"),a("4328")),c=a.n(i),l=a("64f2"),u={name:"BasicList",props:{config:Object,access:Object},title:function(){return this.pageTitle},data:function(){return{loading:!1,items:[],totalItems:0,options:{itemsPerPage:10,page:1,stf:[""],stc:[""],stx:[""]}}},computed:{table:function(){return this.config.bo_table},pageTitle:function(){return this.config.bo_subject+" 게시물"},headers:function(){var t=[{text:"No",value:"no",align:"start",sortable:!1,searchable:!1,width:"60"},{text:"제목",value:"wr_title",align:"start",sortable:!1,searchable:!0},{text:"작성자",value:"wr_name",align:"center",sortable:!1,searchable:!0},{text:"작성일",value:"wr_createat",align:"center",sortable:!1,searchable:!0},{text:"조회수",value:"wr_view",align:"center",sortable:!1,searchable:!0}];return this.config.bo_use_category&&t.splice(1,0,{text:"Cate",value:"wr_category",align:"center",sortable:!1,searchable:!1}),t}},watch:{options:{handler:function(){this.fetchData()},deep:!0}},methods:{getPayload:function(){var t,e=Object(l["deepCopy"])(this.options),a=Object(o["a"])(this.config.bo_sort);try{for(a.s();!(t=a.n()).done;){var r=t.value;e.sortBy.push(r.by),e.sortDesc.push(1==r.desc)}}catch(s){a.e(s)}finally{a.f()}return e.stf.push("wr_reply"),e.stc.push("eq"),e.stx.push("0"),e},fetchData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.getPayload(),r=c.a.stringify(a),e.next=4,t.$axios.get("/api/board/list/".concat(t.table,"?").concat(r));case 4:s=e.sent,t.setData(s);case 6:case"end":return e.stop()}}),e)})))()},setData:function(t){this.items=t.items,this.totalItems=t.totalItems}}},b=u,p=a("2877"),f=Object(p["a"])(b,r,s,!1,null,null,null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-2d0af8c4.659fb0ff.js.map