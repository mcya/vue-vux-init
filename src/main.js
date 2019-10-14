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



// 发送请求的时候 触发loading 一般在移动端用到； PC端只需要对加载的内容做loading即可，loading值普遍加载标签上
Vue.http.interceptors.push(function(request, next) {
  //登录成功后将后台返回的sessionId在本地存下来,每次请求从sessionStorage中拿到存储的sessionId值
  let loginInfo = this.$store.state.core.loginInfo;
  //请求时,加上token
  // let isLoginSuccess = this.$store.state.core.isLogin;
  this.$vux.loading.show({text: '数据加载中', width: '200px'}); // 显示Loading
  // if (isLoginSuccess == true || isLoginSuccess == 'true') {
  //   if (loginInfo != null) {
  //     request.body.token = loginInfo.token;
  //   }
  // }
  next((response) => {
    this.$vux.loading.hide();
    return response;
  });

});

// 路由拦截 start
router.beforeEach(function(to, from, next) {
  //不需要授权的页面,放行
  if (to.meta.isIgnoreAuth == true) { //路由配置
    next();
    return;
  }

  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user')); //或者通过 store.state 来控制
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }

})
router.afterEach((to, from, next) => {})

/**
// 拦截器设置请参考这部分(开始)

Vue.http.interceptors.push(function(request, next) {

  let url=request.url;


  //登录成功后将后台返回的sessionId在本地存下来,每次请求从sessionStorage中拿到存储的sessionId值
  let loginInfo=this.$store.state.core.loginInfo;

  //请求时,加上token
  let isLoginSuccess=this.$store.state.core.isLogin;

// let $this=this.$http;
this.$vux.loading.show({text: '数据加载中', width: "200px"});// 显示Loading
//	next((response)=>{
//		this.$vux.loading.hide();
//	})

  if(isLoginSuccess==true||isLoginSuccess=='true'){
  	  if(loginInfo!=null){
        request.body.token=loginInfo.token;
  	  	// request.url=addUrlPara(url,"token",loginInfo.token);
  	  }
   }
   	// console.log(request.url);
	  next((response) => {
	  	this.$vux.loading.hide();
	  	  return response;
	  });

});


// 拦截器设置请参考这部分(结束)
router.beforeEach(function (to,from,next) {
	Vue.prototype.path = to.path
   // let sessionId="7bb87074df1c4e84b5cbcdbe3b2303c8";
	//不需要授权的页面,放行
	if(to.meta.isIgnoreAuth==true){
		next();
    	return;
	}
  let isLoginSuccess=store.state.core.isLogin;

  //没有登录,需要跳到登录页面
  if(isLoginSuccess==true||isLoginSuccess=='true'){
     //已经登录,往下走
    next();
  }else{
    next('/login')
  }

})
router.afterEach((to, from, next) => {

})

//*/


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/*

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

*/
