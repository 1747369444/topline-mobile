/**
 * 封装文章相关接口请求函数
 */
import request from '@/utils/request'
/**
 * 获取频道新闻推荐
 * 已登录：(携带token):用户频道列表
 * 未登录：推荐频道列表
 */
export const getArticles = ({
  channelId, // 频道
  timestamp, // 时间戳（分页用的用于刷新数据）
  withTop // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
}) => {
  // 可以在这里执行其他逻辑
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
/**
 *  对文章不喜欢
 */
export const dislickArticle = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}
