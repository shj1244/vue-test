(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b363b"],{"27bb":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("v-toolbar",[r("v-toolbar-title",[e._v(e._s(e.pageTitle)+" ")]),r("v-spacer"),r("v-btn",{attrs:{color:"primary",loading:e.loading},on:{click:e.save}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-pencil")]),e._v(" 저장 ")],1)],1),e.form?r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("input-duplicate-check",{ref:"id",attrs:{label:"ID",rules:[e.rules.require({label:"ID"}),e.rules.alphaNum()],cbCheck:e.checkId,origin:e.id?e.form.wr_1:"",readonly:!!e.id},model:{value:e.form.wr_1,callback:function(t){e.$set(e.form,"wr_1",t)},expression:"form.wr_1"}}),r("v-select",{attrs:{label:"스킨",items:e.skins},model:{value:e.form.wr_2,callback:function(t){e.$set(e.form,"wr_2",t)},expression:"form.wr_2"}}),r("v-text-field",{attrs:{label:"제목",counter:"120",rules:[e.rules.require({label:"제목"})]},model:{value:e.form.wr_title,callback:function(t){e.$set(e.form,"wr_title",t)},expression:"form.wr_title"}}),r("ez-tiptap",{attrs:{editable:!0},on:{uploadImage:e.uploadImage},model:{value:e.form.wr_content,callback:function(t){e.$set(e.form,"wr_content",t)},expression:"form.wr_content"}})],1):e._e()],1)},a=[],i=r("53ca"),o=r("1da1"),c=r("5530"),s=(r("96cf"),r("a9e3"),r("cb29"),r("99af"),r("b64b"),r("2f62")),u=r("248f"),l=r.n(u),p=r("50d8"),m={components:{InputDuplicateCheck:p["a"]},name:"BasicForm",title:function(){return this.pageTitle},props:{config:Object,access:Object,id:[String,Number]},data:function(){return{form:null,valid:!0,confirmPw:"",uploadFiles:Array(this.config.bo_upload_cnt).fill(null),tags:[],loading:!1,upImages:[],isWrite:!1,parentItem:null,skins:[]}},computed:Object(c["a"])(Object(c["a"])({},Object(s["e"])({member:function(e){return e.user.member}})),{},{table:function(){return this.config.bo_table},pid:function(){return"reply"==this.$route.query.act?this.id:0},pageTitle:function(){return this.config.bo_subject+(this.id?" 게시물 수정":" 게시물 작성")},rules:function(){return l.a}}),mounted:function(){this.init(),this.fetchSkinList()},destroyed:function(){!this.isWrite&&this.upImages.length&&this.$axios.put("/api/board/imgCancle/".concat(this.table),this.upImages)},methods:{checkId:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/api/contents/duplicateCheck?wr_1=".concat(t.form.wr_1));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})))()},fetchSkinList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/api/contents/skinList");case 2:r=t.sent,e.skins=r;case 4:case"end":return t.stop()}}),t)})))()},init:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.id){t.next=8;break}return t.next=3,e.$axios.get("/api/board/read/".concat(e.table,"/").concat(e.id));case 3:r=t.sent,e.pid?(e.initForm(),e.form.wr_category=r.wr_category,e.parentItem=r):e.form=r,e.form.wr_password="",t.next=9;break;case 8:e.initForm();case 9:case"end":return t.stop()}}),t)})))()},initForm:function(){for(var e={wr_reply:0,wr_parent:this.pid,mb_id:this.member?this.member.mb_id:0,wr_email:this.member?this.member.mb_email:"",wr_name:this.member?this.member.mb_name:"",wr_password:"",wr_category:this.$route.query.ca||this.config.bo_category[0]||"",wr_title:"",wr_content:"",wrTags:[]},t=1;t<=10;t++)e["wr_".concat(t)]="";e.wr_2="basic",this.form=e},fileTitle:function(e){if(this.form.wrFiles){var t=this.form.wrFiles[e-1];return t&&!t.remove?t.bf_name:"첨부파일 ".concat(e)}return"첨부파일 ".concat(e)},uploadImage:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a,i,o,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=e.file,a=e.desc,i=e.callback,o=new FormData,o.append("upFile",n),o.append("bf_desc",a),r.next=6,t.$axios.post("/api/board/imageUpload/".concat(t.table),o);case 6:c=r.sent,t.upImages.push(c),i("/upload/".concat(t.table,"/").concat(c.bf_src));case 9:case"end":return r.stop()}}),r)})))()},save:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n,a,o,c,s,u,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$refs.form.validate(),t.next=3,e.$nextTick();case 3:if(e.valid){t.next=5;break}return t.abrupt("return");case 5:if(e.$refs.id.validate()){t.next=7;break}return t.abrupt("return");case 7:for(e.loading=!0,r=new FormData,n=Object.keys(e.form),a=0,o=n;a<o.length;a++)c=o[a],"object"===Object(i["a"])(e.form[c])?r.append(c,JSON.stringify(e.form[c])):r.append(c,e.form[c]);for(e.$route.query.token&&r.append("token",e.$route.query.token),s=0,u=0;u<e.config.bo_upload_cnt;u++)null!=e.uploadFiles[u]&&(r.append("upFiles[".concat(s),e.uploadFiles[u]),s++);if(r.append("upImages",JSON.stringify(e.upImages)),!e.id||e.pid){t.next=21;break}return t.next=18,e.update(r);case 18:l=t.sent,t.next=24;break;case 21:return t.next=23,e.insert(r);case 23:l=t.sent;case 24:l&&(e.isWrite=!0,e.$router.push("/board/".concat(e.table))),e.loading=!1;case 26:case"end":return t.stop()}}),t)})))()},insert:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$axios.post("/api/board/write/".concat(t.table),e);case 2:return n=r.sent,r.abrupt("return",n.wr_id);case 4:case"end":return r.stop()}}),r)})))()},update:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$axios.put("/api/board/write/".concat(t.table,"/").concat(t.id),e);case 2:return n=r.sent,r.abrupt("return",n.wr_id);case 4:case"end":return r.stop()}}),r)})))()}}},f=m,d=r("2877"),b=Object(d["a"])(f,n,a,!1,null,null,null);t["default"]=b.exports}}]);
//# sourceMappingURL=chunk-2d0b363b.4806e7bc.js.map