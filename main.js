
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 导入请求插件
import {$http} from "@escook/request-miniprogram"



// 挂载到全局对象uni上面
uni.$http=$http

// 配置跟地址baseurl
// $http.baseUrl="https://www.uinav.com"
$http.baseUrl="https://api-hmugo-web.itheima.net"

// 请求拦截器
$http.beforeRequest= function (option) {
	uni.showLoading({
		title:"数据正在加载……"
	})
}


// 响应拦截器
$http.afterRequest=function(option) {
	uni.hideLoading()
}




Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
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