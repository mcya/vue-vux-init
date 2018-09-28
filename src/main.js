// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vux 需要的配置
import { AlertPlugin, ToastPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

// http请求配置
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 如果服务器无法处理编码为application/json的请求，可以启用emulateJSON选项。启用之后，请求会以application/x-www-form-urlencoded为MIME type，就像普通的HTML表单一样。
Vue.http.options.emulateJSON = true;
// 跨域
Vue.http.options.crossOrigin = true;
// emulateHTTP 默认值为:false,当值为true是，用HTTP的POST方式PUT，PATCH，DELETE等请求，并设置请求头字段HTTP_Method_Override为原始请求方法。
Vue.http.options.emulateHTTP = true;
Vue.prototype.HOST = '/httpUrl'; //添加 HOST 指向

// 延迟三秒click
// import FastClick from 'fastclick'
// FastClick.attach(document.body)

// vux国际化
// import vuexI18n from 'vuex-i18n'
// let store1 = new Vuex.Store({
// 	modules: {
// 		i18n: vuexI18n.store
// 	}
// })
// Vue.use(vuexI18n.plugin, store1)

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
