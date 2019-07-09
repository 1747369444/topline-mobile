// 将操作本地存储中用户数据的信息封装为一个模块
// 然后在任何需要操作本地存储中 user 的地方去使用

const USER_KEY = 'user'

// 添加本地存储
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

// 查询&修改本地存储
export const saveUser = (data) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}

// 删除本地存储
export const removeUser = () => {
  window.localStorage.removeItem(USER_KEY)
}
