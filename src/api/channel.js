/**
 * 封装频道相关接口的请求函数
 */
import request from '@/utils/request'
/**
 * 获取首页频道列表
 * 已登录：(携带token):用户频道列表
 * 未登录：推荐频道列表
 */
export const getUserChannels = () => {
  // 可以在这里执行其他逻辑
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
/**
 * 获取所有频道列表
 */
export const getAllChannels = () => {
  // 可以在这里执行其他逻辑
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

/**
 * 获取所有频道列表
 */
export const deleteUserChannel = (channelId) => {
  // 可以在这里执行其他逻辑
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
