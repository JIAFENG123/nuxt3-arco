import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { Message } from '@arco-design/web-vue'

if (import.meta.env.VITE_API_BASE_URL)
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL as string

const baseURL
  = (import.meta.env.VITE_API_BASE_URL || 'http://190.168.1.7:8443/user-service') as string
const service = axios.create({
  // baseURL: process.env.VITE_API_BASE_URL,
  baseURL,
  timeout: 5000,
})

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const urlInfo = JSON.parse(`${sessionStorage.getItem('urlInfo')}`)
    config.headers.Authorization = `Bearer ${urlInfo.token}`
    config.headers.systemCode = urlInfo.systemCode
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    const res = response.data
    if (res.code !== '000000') {
      Message.error({
        content: res.message || 'Error',
        duration: 5 * 1000,
      })
      if (res.code === 50008) {
        // Popconfirm({
        //   'content': '您已被登出，可以继续停留在该页面，或者重新登陆',
        //   'type': 'warning',
        //   'ok-text': '登出',
        //   'cancel-text': '取消',
        // })
        Message.error({
          content: '您已被登出，可以继续停留在该页面，或者重新登陆',
          duration: 5 * 1000,
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  (error) => {
    Message.error({
      content: error.message || 'Error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

export default service
