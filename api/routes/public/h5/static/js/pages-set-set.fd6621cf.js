(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-set-set"],{"0143":function(t,e,n){"use strict";var i=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("2edd")),s={goLogin:function(t,e,n){o.default.setPostMessage("login",t,"登录中",(function(t){e(t)}),(function(t){uni.showToast({title:t.message,icon:"none",duration:2e3})}))},goRegister:function(t,e,n){o.default.setPostMessage("register",t,"处理中",(function(t){e(t)}),(function(t){uni.showToast({title:t.message,icon:"none",duration:2e3})}))},findPassword:function(t,e,n){o.default.setPostMessage("findPassword",t,"处理中",(function(t){e(t)}),(function(t){uni.showToast({title:t.message,icon:"none",duration:2e3})}))},goWxLogin:function(t,e,n){o.default.setPost("wxlogin",t,(function(t){e(t)}),(function(t){uni.showToast({title:t.message,icon:"none",duration:2e3})}))},getRegisterCellphoneCode:function(t,e,n){o.default.setPost("getRegisterCellphoneCode",t,(function(t){e(t)}),(function(t){uni.showToast({title:t.message,icon:"none",duration:2e3})}))},logout:function(t,e,n){o.default.setPostMessage("logout",{},"退出中",(function(t){e(t)}),(function(t){uni.showToast({title:t.message,icon:"none",duration:2e3})}))},user:function(t,e){o.default.setGetMessage("user",{},"加载中",(function(e){t(e)}),(function(t){uni.showToast({title:t.message,icon:"none",duration:2e3})}))},setUser:function(t,e,n){o.default.setPost("user",t,(function(t){e(t)}),(function(t){uni.showToast({title:t.message,icon:"none",duration:2e3})}))}};e.default=s},"2edd":function(t,e,n){(function(e){function i(t,e,n,i,o,s){this.requestLoading(t,e,n,i,"",o,s)}function o(t,e,n,i){this.requestLoading(t,"get",e,"","",n,i)}function s(t,e,n,i,o){this.requestLoading(t,"get",e,"",n,i,o)}function a(t,e,n,i){this.requestLoading(t,"post",e,"","",n,i)}function c(t,e,n,i,o){this.requestLoading(t,"post",e,"",n,i,o)}function u(t,e,n,i){this.requestLoading(t,"put",e,"","",n,i)}function l(t,e,n,i,o){this.requestLoading(t,"put",e,"",n,i,o)}function f(t,e,n,i){this.requestLoading(t,"delete",e,"","",n,i)}function r(t,e,n,i,o){this.requestLoading(t,"delete",e,"",n,i,o)}function d(t){return decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||[,""])[1].replace(/\+/g,"%20"))||null}function g(){var t=uni.getStorageSync("applyDsshopSecret");uni.login({success:function(n){n.code?uni.request({url:t.host+"wxlogin",data:{code:n.code},method:"POST",header:{"Content-Type":"application/json","apply-secret":uni.getStorageSync("applyDsshopSecret").secret},success:function(t){200===t.statusCode?t.data.openid&&(uni.setStorageSync("applyDsshopSession_key",t.data.session_key),uni.setStorageSync("applyDsshopOpenid",t.data.openid)):uni.showToast({icon:"none",title:t.data.message,duration:2e3})},fail:function(t){uni.showToast({title:"服务器无响应",duration:2e3})}}):e.log("无响应")}})}function p(t,e,n,i,o,s,a){uni.showNavigationBarLoading(),""!=o&&uni.showLoading({title:o});var c=uni.getStorageSync("dsshopApplytoken");d("api_token")&&(c=d("api_token")),uni.request({url:uni.getStorageSync("applyDsshopSecret").host+t,data:n,header:i||{"content-type":"application/json","apply-secret":uni.getStorageSync("applyDsshopSecret").secret,openid:uni.getStorageSync("applyDsshopOpenid"),Authorization:"Bearer "+c},method:e||"get",success:function(t){uni.hideNavigationBarLoading(),""!=o&&uni.hideLoading(),200==t.statusCode?s(t.data):500==t.statusCode?(a({message:"服务器异常，请重新尝试"}),g()):302==t.statusCode?(a({message:"登录超时，请重新登录"}),g()):401==t.statusCode?a({message:t.data.message}):a({message:"服务器异常，请重新尝试"})},fail:function(t){uni.hideNavigationBarLoading(),""!=o&&uni.hideLoading(),a({message:"服务器异常"})},complete:function(t){}})}n("4d63"),n("ac1f"),n("25f0"),n("5319"),t.exports={request:i,setGet:o,setGetMessage:s,setPost:a,setPostMessage:c,setPut:u,setPutMessage:l,setDelete:f,setDeleteMessage:r,requestLoading:p}}).call(this,n("5a52")["default"])},"44f1":function(t,e,n){var i=n("d5d2");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("5784cb95",i,!0,{sourceMap:!1,shadowMode:!1})},"882b":function(t,e,n){"use strict";n.r(e);var i=n("b5a7"),o=n("9aca");for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);n("bcb4");var a,c=n("f0c5"),u=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"04f1fbcf",null,!1,i["a"],a);e["default"]=u.exports},"9aca":function(t,e,n){"use strict";n.r(e);var i=n("bc7d"),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=o.a},b5a7:function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"list-cell b-b m-t",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/userinfo/userinfo")}}},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("个人资料")]),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),n("v-uni-view",{staticClass:"list-cell m-t b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clearCache()}}},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("清除缓存")]),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),n("v-uni-view",{staticClass:"list-cell log-out-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toLogout.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("退出登录")])],1)],1)},s=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}))},bc7d:function(t,e,n){"use strict";var i=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("f3f3")),s=i(n("0143")),a=n("2f62"),c={data:function(){return{}},methods:(0,o.default)({},(0,a.mapMutations)(["logout"]),{testVersion:function(){this.$api.msg("已经最新了")},clearCache:function(){uni.removeStorageSync("dsshopOrderList"),uni.removeStorageSync("dsshopCartList"),this.$api.msg("缓存清除成功")},navTo:function(t){uni.navigateTo({url:t})},toLogout:function(){var t=this;uni.showModal({content:"确定要退出登录么",success:function(e){e.confirm&&s.default.logout({},(function(e){t.logout(),setTimeout((function(){uni.navigateBack()}),200)}))}})},switchChange:function(t){var e=t.detail.value?"打开":"关闭";this.$api.msg("".concat(e,"消息推送"))}})};e.default=c},bcb4:function(t,e,n){"use strict";var i=n("44f1"),o=n.n(i);o.a},d5d2:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 文章场景相关 */uni-page-body[data-v-04f1fbcf]{background:#f8f8f8}.list-cell[data-v-04f1fbcf]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline;padding:%?20?% %?30?%;line-height:%?60?%;position:relative;background:#fff;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.list-cell.log-out-btn[data-v-04f1fbcf]{margin-top:%?40?%}.list-cell.log-out-btn .cell-tit[data-v-04f1fbcf]{color:#fa436a;text-align:center;margin-right:0}.list-cell.cell-hover[data-v-04f1fbcf]{background:#fafafa}.list-cell.b-b[data-v-04f1fbcf]:after{left:%?30?%}.list-cell.m-t[data-v-04f1fbcf]{margin-top:%?16?%}.list-cell .cell-more[data-v-04f1fbcf]{-webkit-align-self:baseline;align-self:baseline;font-size:%?32?%;color:#909399;margin-left:%?10?%}.list-cell .cell-tit[data-v-04f1fbcf]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?30?%;color:#303133;margin-right:%?10?%}.list-cell .cell-tip[data-v-04f1fbcf]{font-size:%?28?%;color:#909399}.list-cell uni-switch[data-v-04f1fbcf]{-webkit-transform:translateX(%?16?%) scale(.84);transform:translateX(%?16?%) scale(.84)}body.?%PAGE?%[data-v-04f1fbcf]{background:#f8f8f8}',""]),t.exports=e}}]);