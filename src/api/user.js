// 封装用户相关的接口请求函数

// 导入封装好的request请求模块
import request from '@/utils/request'

export const login = ({
  mobile,
  code
}) => {
  // 可以在这里执行其他逻辑
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
