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
// 引入表单插件语言包
import zhCN from 'vee-validate/dist/locale/zh_CN'
// 引入vee-validate插件进行表单验证&
import VeeValidate, {
  Validator
} from 'vee-validate'

Vue.use(VeeValidate, {
  // 配置改变的时候去触发校验，默认是 input
  // 配置文档：https://baianat.github.io/vee-validate/guide/events.html#changing-default-events
  events: ''
})

// 配置表单插件语言包
Validator.localize('zh_CN', zhCN)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
