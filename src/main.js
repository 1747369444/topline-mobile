import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入第三方库
import Vant, {
  Lazyload
} from 'vant'
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
// 引入配置时间的插件
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// dayjs 的 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 把插件注册到 dayjs 中
dayjs.extend(relativeTime)
// 配置使用中文语言包
dayjs.locale('zh-cn')
// 注册一个全局过滤器来处理日期格式的展示
// 过滤器就是一个函数，我们可以在模板中通过 {{ 数据 | 过滤器 }} 来调用这个过滤器函数
// 过滤器函数接收的参数就是你的数据，返回值就会绑定输出到使用的位置
// {{ 数据 | relativeTime }}
// 好处：任何组件的模板都可以通过 {{ 数据 | 过滤器 }} 来使用这里定义的过滤器
// 说白了就是一个全局函数
Vue.filter('relativeTime', value => {
  return dayjs().from(value)
})
Vue.use(VeeValidate, {
  // 配置改变的时候去触发校验，默认是 input
  // 配置文档：https://baianat.github.io/vee-validate/guide/events.html#changing-default-events
  events: ''
})

// 配置表单插件语言包
Validator.localize('zh_CN', zhCN)

Vue.use(Vant)

// options 为可选参数，无则不传VantUI图片懒加载
Vue.use(Lazyload)
Vue.config.productionTip = false

// 把定时器放在VUe原型中减少了定时器的嵌套

Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
