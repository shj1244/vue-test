(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c8644"],{"554b":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("v-container",[t("v-toolbar",[t("v-toolbar-title",[e._v(e._s(e.pageTitle)+" ")]),t("v-spacer"),t("v-btn",{attrs:{color:"primary",loading:e.loading},on:{click:e.save}},[t("v-icon",{attrs:{left:""}},[e._v("mdi-pencil")]),e._v(" 저장 ")],1)],1),e.form?t("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(r){e.valid=r},expression:"valid"}},[e.config.bo_use_category?t("v-select",{attrs:{label:"카테고리",items:e.config.bo_category,rules:[e.rules.require({label:"카테고리"})],readonly:!!e.parentItem},model:{value:e.form.wr_category,callback:function(r){e.$set(e.form,"wr_category",r)},expression:"form.wr_category"}}):e._e(),e.member?e._e():[t("v-text-field",{attrs:{label:"이름",readonly:!!e.form.wr_id,rules:e.rules.name},model:{value:e.form.wr_name,callback:function(r){e.$set(e.form,"wr_name",r)},expression:"form.wr_name"}}),t("v-text-field",{attrs:{label:"이메일",rules:e.rules.email},model:{value:e.form.wr_email,callback:function(r){e.$set(e.form,"wr_email",r)},expression:"form.wr_email"}}),t("input-password",{attrs:{label:"비밀번호",rules:e.rules.password()},model:{value:e.form.wr_password,callback:function(r){e.$set(e.form,"wr_password",r)},expression:"form.wr_password"}}),t("input-password",{attrs:{label:"비밀번호 확인",rules:[e.rules.matchValue(e.form.wr_password)]},model:{value:e.confirmPw,callback:function(r){e.confirmPw=r},expression:"confirmPw"}})],e.parentItem?t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v(" 부모글 : "+e._s(e.parentItem.wr_title)+" ")]),t("v-expansion-panel-content",[t("ez-tiptap",{attrs:{editable:!1},model:{value:e.parentItem.wr_content,callback:function(r){e.$set(e.parentItem,"wr_content",r)},expression:"parentItem.wr_content"}})],1)],1)],1):e._e(),t("v-text-field",{attrs:{label:"제목",counter:"120",rules:[e.rules.require({label:"제목"})]},model:{value:e.form.wr_title,callback:function(r){e.$set(e.form,"wr_title",r)},expression:"form.wr_title"}}),t("ez-tiptap",{attrs:{editable:!0},on:{uploadImage:e.uploadImage},model:{value:e.form.wr_content,callback:function(r){e.$set(e.form,"wr_content",r)},expression:"form.wr_content"}}),t("v-combobox",{attrs:{label:"검색태그",items:e.tags,multiple:"",chips:"","deletable-chips":"","hide-selected":""},model:{value:e.form.wrTags,callback:function(r){e.$set(e.form,"wrTags",r)},expression:"form.wrTags"}}),e._l(e.config.wr_fields,(function(r,a){return t("div",{key:a},[r.title?t("v-text-field",{attrs:{label:r.title,rules:r.required?[e.rules.require({label:r.title})]:[]},model:{value:e.form["wr_"+(a+1)],callback:function(r){e.$set(e.form,"wr_"+(a+1),r)},expression:"form[`wr_${i + 1}`]"}}):e._e()],1)})),e._l(e.config.bo_upload_cnt,(function(r){return t("div",{staticClass:"d-flex"},[t("v-file-input",{attrs:{label:e.fileTitle(r),"show-size":"",disabled:!(!e.form.wrFiles||!e.form.wrFiles[r-1])&&!e.form.wrFiles[r-1].remove},model:{value:e.uploadFiles[r-1],callback:function(t){e.$set(e.uploadFiles,r-1,t)},expression:"uploadFiles[i - 1]"}}),e.form.wrFiles&&e.form.wrFiles[r-1]?t("div",[t("v-checkbox",{attrs:{label:"삭제"},on:{change:function(t){e.uploadFiles[r-1]=null}},model:{value:e.form.wrFiles[r-1].remove,callback:function(t){e.$set(e.form.wrFiles[r-1],"remove",t)},expression:"form.wrFiles[i - 1].remove"}})],1):e._e()],1)}))],2):e._e()],1)},n=[],o=t("53ca"),i=t("1da1"),s=t("5530"),l=(t("96cf"),t("a9e3"),t("cb29"),t("99af"),t("b64b"),t("2f62")),c=t("248f"),u=t.n(c),m=t("bbf4"),f={components:{inputPassword:m["a"]},name:"BasicForm",title:function(){return this.pageTitle},props:{config:Object,access:Object,id:[String,Number]},data:function(){return{form:null,valid:!0,confirmPw:"",uploadFiles:Array(this.config.bo_upload_cnt).fill(null),tags:[],loading:!1,upImages:[],isWrite:!1,parentItem:null}},computed:Object(s["a"])(Object(s["a"])({},Object(l["e"])({member:function(e){return e.user.member}})),{},{table:function(){return this.config.bo_table},pid:function(){return"reply"==this.$route.query.act?this.id:0},pageTitle:function(){return this.config.bo_subject+(this.id?" 게시물 수정":" 게시물 작성")},rules:function(){return u.a}}),mounted:function(){this.init()},destroyed:function(){!this.isWrite&&this.upImages.length&&this.$axios.put("/api/board/imgCancle/".concat(this.table),this.upImages)},methods:{init:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var t;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!e.id){r.next=7;break}return r.next=3,e.$axios.get("/api/board/read/".concat(e.table,"/").concat(e.id));case 3:t=r.sent,e.pid?(e.initForm(),e.form.wr_category=t.wr_category,e.parentItem=t):e.form=t,r.next=8;break;case 7:e.initForm();case 8:console.log(e.parentItem);case 9:case"end":return r.stop()}}),r)})))()},initForm:function(){for(var e={wr_reply:0,wr_parent:this.pid,mb_id:this.member?this.member.mb_id:0,wr_email:this.member?this.member.mb_email:"",wr_name:this.member?this.member.mb_name:"",wr_password:"",wr_category:this.$route.query.ca||this.config.bo_category[0],wr_title:"",wr_content:"",wrTags:[]},r=1;r<=10;r++)e["wr_".concat(r)]="";this.form=e},fileTitle:function(e){if(this.form.wrFiles){var r=this.form.wrFiles[e-1];return r&&!r.remove?r.bf_name:"첨부파일 ".concat(e)}return"첨부파일 ".concat(e)},uploadImage:function(e){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n,o,i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.file,n=e.desc,o=e.callback,i=new FormData,i.append("upFile",a),i.append("bf_desc",n),t.next=6,r.$axios.post("/api/board/imageUpload/".concat(r.table),i);case 6:s=t.sent,r.upImages.push(s),o("/upload/".concat(r.table,"/").concat(s.bf_src));case 9:case"end":return t.stop()}}),t)})))()},save:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var t,a,n,i,s,l,c,u;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.$refs.form.validate(),r.next=3,e.$nextTick();case 3:if(e.valid){r.next=5;break}return r.abrupt("return");case 5:for(e.loading=!0,t=new FormData,a=Object.keys(e.form),n=0,i=a;n<i.length;n++)s=i[n],"object"===Object(o["a"])(e.form[s])?t.append(s,JSON.stringify(e.form[s])):t.append(s,e.form[s]);for(l=0,c=0;c<e.config.bo_upload_cnt;c++)null!=e.uploadFiles[c]&&(t.append("upFiles[".concat(l),e.uploadFiles[c]),l++);if(t.append("upImages",JSON.stringify(e.upImages)),!e.id||e.pid){r.next=18;break}return r.next=15,e.update(t);case 15:u=r.sent,r.next=21;break;case 18:return r.next=20,e.insert(t);case 20:u=r.sent;case 21:u&&(e.isWrite=!0,e.$router.push("/board/".concat(e.table,"/").concat(u))),e.loading=!1;case 23:case"end":return r.stop()}}),r)})))()},insert:function(e){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r.$axios.post("/api/board/write/".concat(r.table),e);case 2:return a=t.sent,t.abrupt("return",a.wr_id);case 4:case"end":return t.stop()}}),t)})))()},update:function(e){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r.$axios.put("/api/board/write/".concat(r.table,"/").concat(r.id),e);case 2:return a=t.sent,t.abrupt("return",a.wr_id);case 4:case"end":return t.stop()}}),t)})))()}}},p=f,d=t("2877"),b=Object(d["a"])(p,a,n,!1,null,null,null);r["default"]=b.exports}}]);
//# sourceMappingURL=chunk-2d0c8644.da218859.js.map