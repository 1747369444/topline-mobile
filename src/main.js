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

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
