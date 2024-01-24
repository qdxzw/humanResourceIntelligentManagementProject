(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-480e736f"],{"7a5b":function(t,a,s){},9406:function(t,a,s){"use strict";s.r(a);s("b0c0");var i=function(){var t,a,s,i,e,n,o,l,c,r=this,d=r._self._c;return d("div",{staticClass:"dashboard"},[d("div",{staticClass:"container"},[d("div",{staticClass:"left"},[d("div",{staticClass:"panel"},[d("div",{staticClass:"user-info"},[r.avatar?d("img",{staticClass:"avatar",attrs:{src:r.avatar,alt:""}}):d("span",{staticClass:"username"},[r._v(r._s(null===(t=r.name)||void 0===t?void 0:t.charAt(0)))]),d("div",{staticClass:"company-info"},[r._m(0),d("div",{staticClass:"depart"},[r._v(" "+r._s(r.name)+" ｜ "+r._s(r.company)+"-"+r._s(r.departmentName)+" ")])])]),d("div",{staticClass:"todo-list"},[d("div",{staticClass:"todo-item"},[d("span",[r._v("组织总人数")]),d("Count-to",{attrs:{"start-val":0,"end-val":r.homeData.employeeTotal,duration:1e3}})],1),d("div",{staticClass:"todo-item"},[d("span",[r._v("正式员工")]),d("Count-to",{attrs:{"start-val":0,"end-val":r.homeData.regularEmployeeTotal,duration:1e3}})],1),d("div",{staticClass:"todo-item"},[d("span",[r._v("合同待签署")]),d("Count-to",{attrs:{"start-val":0,"end-val":r.homeData.contractSignTotal,duration:1e3}})],1),d("div",{staticClass:"todo-item"},[d("span",[r._v("待入职")]),d("Count-to",{attrs:{"start-val":0,"end-val":r.homeData.toBeEmployed,duration:1e3}})],1),d("div",{staticClass:"todo-item"},[d("span",[r._v("本月待转正")]),d("Count-to",{attrs:{"start-val":0,"end-val":r.homeData.toBeConfirmed,duration:1e3}})],1),d("div",{staticClass:"todo-item"},[d("span",[r._v("本月待离职")]),d("Count-to",{attrs:{"start-val":0,"end-val":r.homeData.toBeDismissed,duration:1e3}})],1),d("div",{staticClass:"todo-item"},[d("span",[r._v("接口总访问")]),d("Count-to",{attrs:{"start-val":0,"end-val":r.homeData.interfaceAccessTotal,duration:1e3}})],1)])]),r._m(1),d("div",{staticClass:"panel"},[d("div",{staticClass:"panel-title"},[r._v("社保申报数据")]),d("div",{staticClass:"chart-container"},[d("div",{staticClass:"chart-info"},[d("div",{staticClass:"info-main"},[d("span",[r._v("申报人数")]),d("Count-to",{attrs:{"start-val":0,"end-val":null===(a=r.homeData.socialInsurance)||void 0===a?void 0:a.declarationTotal,duration:1e3}})],1),d("div",{staticClass:"info-list"},[d("div",{staticClass:"info-list-item"},[d("span",[r._v("待申报(人)")]),d("Count-to",{attrs:{"start-val":0,"end-val":null===(s=r.homeData.socialInsurance)||void 0===s?void 0:s.toDeclareTotal,duration:1e3}})],1),d("div",{staticClass:"info-list-item"},[d("span",[r._v("申报中(人)")]),d("Count-to",{attrs:{"start-val":0,"end-val":null===(i=r.homeData.socialInsurance)||void 0===i?void 0:i.declaringTotal,duration:1e3}})],1),d("div",{staticClass:"info-list-item"},[d("span",[r._v("已申报(人)")]),d("Count-to",{attrs:{"start-val":0,"end-val":null===(e=r.homeData.socialInsurance)||void 0===e?void 0:e.declaredTotal,duration:1e3}})],1)])]),d("div",{staticClass:"chart"},[d("div",{ref:"social",staticStyle:{width:"100%",height:"100%"}})])])]),d("div",{staticClass:"panel"},[d("div",{staticClass:"panel-title"},[r._v("公积金申报数据")]),d("div",{staticClass:"chart-container"},[d("div",{staticClass:"chart-info"},[d("div",{staticClass:"info-main"},[d("span",[r._v("申报人数")]),d("Count-to",{attrs:{"start-val":0,"end-val":null===(n=r.homeData.providentFund)||void 0===n?void 0:n.declarationTotal,duration:1e3}})],1),d("div",{staticClass:"info-list"},[d("div",{staticClass:"info-list-item"},[d("span",[r._v("待申报(人)")]),d("Count-to",{attrs:{"start-val":0,"end-val":null===(o=r.homeData.providentFund)||void 0===o?void 0:o.toDeclareTotal,duration:1e3}})],1),d("div",{staticClass:"info-list-item"},[d("span",[r._v("申报中(人)")]),d("Count-to",{attrs:{"start-val":0,"end-val":null===(l=r.homeData.providentFund)||void 0===l?void 0:l.declaringTotal,duration:1e3}})],1),d("div",{staticClass:"info-list-item"},[d("span",[r._v("已申报(人)")]),d("Count-to",{attrs:{"start-val":0,"end-val":null===(c=r.homeData.providentFund)||void 0===c?void 0:c.declaredTotal,duration:1e3}})],1)])]),d("div",{staticClass:"chart"},[d("div",{ref:"provident",staticStyle:{width:"100%",height:"100%"}})])])])]),d("div",{staticClass:"right"},[d("div",{staticClass:"panel"},[d("div",{staticClass:"help"},[r._m(2),d("div",{staticClass:"help-right"},[d("div",{staticClass:"calendar"},[d("el-calendar")],1)])])]),d("div",{staticClass:"panel"},[d("div",{staticClass:"panel-title"},[r._v("通知公告")]),d("div",{staticClass:"information-list"},r._l(r.messageList,(function(t,a){return d("div",{key:a,staticClass:"information-list-item"},[d("img",{attrs:{src:t.icon,alt:""}}),d("div",[d("p",[d("span",{staticClass:"col"},[r._v(r._s(t.notice.split(" ")[0]))]),r._v(" "+r._s(t.notice.split(" ")[1])+" "+r._s(t.notice.split(" ")[2])+" ")]),d("p",[r._v(r._s(t.createTime))])])])})),0)])])])])},e=[function(){var t=this,a=t._self._c;return a("div",{staticClass:"title"},[t._v(" 江苏传智播客教育科技股份有限公司 "),a("span",[t._v("体验版")])])},function(){var t=this,a=t._self._c;return a("div",{staticClass:"panel"},[a("div",{staticClass:"panel-title"},[t._v("快捷入口")]),a("div",{staticClass:"quick-entry"},[a("div",{staticClass:"entry-item"},[a("div",{staticClass:"entry-icon approval"}),a("span",[t._v("假期审批")])]),a("div",{staticClass:"entry-item"},[a("div",{staticClass:"entry-icon social"}),a("span",[t._v("社保管理")])]),a("div",{staticClass:"entry-item"},[a("div",{staticClass:"entry-icon role"}),a("span",[t._v("角色管理")])]),a("div",{staticClass:"entry-item"},[a("div",{staticClass:"entry-icon salary"}),a("span",[t._v("薪资设置")])]),a("div",{staticClass:"entry-item"},[a("div",{staticClass:"entry-icon bpm"}),a("span",[t._v("流程设置")])])])])},function(){var t=this,a=t._self._c;return a("div",{staticClass:"help-left"},[a("div",{staticClass:"panel-title"},[t._v("帮助链接")]),a("div",{staticClass:"help-list"},[a("div",{staticClass:"help-block"},[a("i",{staticClass:"icon-entry"}),t._v(" 入门指南 ")]),a("div",{staticClass:"help-block"},[a("i",{staticClass:"icon-help"}),t._v(" 在线帮助手册 ")]),a("div",{staticClass:"help-block"},[a("i",{staticClass:"icon-support"}),t._v(" 联系技术支持 ")]),a("div",{staticClass:"help-block"},[a("i",{staticClass:"icon-add"}),t._v(" 添加链接 ")])])])}],n=s("c7eb"),o=s("1da1"),l=s("5530"),c=s("ec1b"),r=s.n(c),d=s("2f62"),v=s("b775");function u(){return Object(v["a"])({url:"/home/data",method:"GET"})}function p(){return Object(v["a"])({url:"/home/notice",method:"GET"})}var C=s("22b4"),m=s("1be7"),h=s("3620"),_=s("4b2a"),f=s("f95e");C["a"]([h["a"],_["a"],f["a"]]);var y={components:{CountTo:r.a},data:function(){return{homeData:{},messageList:[]}},watch:{homeData:function(){var t,a,s,i;this.social.setOption({xAxis:{type:"category",boundaryGap:!1,data:null===(t=this.homeData.socialInsurance)||void 0===t?void 0:t.xAxis},yAxis:{type:"value"},series:[{data:null===(a=this.homeData.socialInsurance)||void 0===a?void 0:a.yAxis,type:"line",areaStyle:{color:"#04c9be"},lineStyle:{color:"#04c9be"}}]}),this.provident.setOption({xAxis:{type:"category",boundaryGap:!1,data:null===(s=this.homeData.providentFund)||void 0===s?void 0:s.xAxis},yAxis:{type:"value"},series:[{data:null===(i=this.homeData.providentFund)||void 0===i?void 0:i.yAxis,type:"line",areaStyle:{color:"#04c9be"},lineStyle:{color:"#04c9be"}}]})}},created:function(){this.getHomeData(),this.getMessageList()},mounted:function(){this.social=m["b"](this.$refs.social),this.provident=m["b"](this.$refs.provident)},computed:Object(l["a"])({},Object(d["b"])(["name","avatar","company","departmentName"])),methods:{getHomeData:function(){var t=this;return Object(o["a"])(Object(n["a"])().mark((function a(){return Object(n["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,u();case 2:t.homeData=a.sent;case 3:case"end":return a.stop()}}),a)})))()},getMessageList:function(){var t=this;return Object(o["a"])(Object(n["a"])().mark((function a(){return Object(n["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,p();case 2:t.messageList=a.sent;case 3:case"end":return a.stop()}}),a)})))()}}},b=y,D=(s("a221"),s("2877")),g=Object(D["a"])(b,i,e,!1,null,"2fe7ea36",null);a["default"]=g.exports},a221:function(t,a,s){"use strict";s("7a5b")}}]);