import axios from 'axios'

/**
 * axios.create 用于创建一个 axios 实例，该实例和 axios 的功能是一模一样的
 * 说白了就是克隆了一个 axios
 * 为什么要这样做：我们可以拥有多个不同的请求函数，而他们的配置可能是不一样的
 * 例如有些项目中可能会涉及到使用不同的接口路径
 *    http://toutiao.course.itcast.cn
 *    http://a.com
 *    http://b.com
 */
// 配置基础路由
const request = axios.create({
  baseURL: 'http://toutiao.course.itcast.cn'
})

// 设置请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 处理请求错误
  return Promise.reject(error)
})

// 设置响应拦截器
request.interceptors.response.use(function (response) {
  // 处理响应数据
  // 如果响应结果对象中有 data，则直接返回这个 data 数据
  // 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
  return response.data.data || response.data
}, function (error) {
  // 处理响应错误
  return Promise.reject(error)
})

export default request
