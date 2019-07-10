import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入第三方库
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入的配置REM的文件
import 'amfe-flexible'
// 引入自己的样式
import './styles/index.less'
// 引入vee-validate插件进行表单验证
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
