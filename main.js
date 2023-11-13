
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 导入请求插件
import {$http} from "@escook/request-miniprogram"
import store from "./store/store.js"


// 挂载到全局对象uni上面
uni.$http=$http

// 配置跟地址baseurl
// $http.baseUrl="https://www.uinav.com"
$http.baseUrl="https://api-hmugo-web.itheima.net"

// 请求拦截器
$http.beforeRequest= function (option) {
	uni.showLoading({
		title:"数据正在加载…"
	})
	// console.log(option);
	if(option.url.indexOf('/my/') !== -1) {
		option.header={
			Authorization:store.state.user.token
		}
	}
}


// 响应拦截器
$http.afterRequest=function(option) {
	uni.hideLoading()
}


// 封装一个全局提示方法
uni.$showMsg=function(title="数据加载中……" , duration=2000){
	uni.showToast({
		title,
		duration,
		icon:"none"
	})
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif