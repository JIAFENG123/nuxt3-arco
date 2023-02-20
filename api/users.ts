import axios from 'axios'
import request from '@/utils/request-login'
export interface LoginRes {
  token: string
}
export interface LoginData {
  username: string
  password: string
}
// 获取业务系统树形数据
export function businessTree(id: number) {
  return request({
    url: `/usermenu/get/bussinesstree/${id}`,
    method: 'get',
  })
}

export function getUserInfo() {
  return request({
    url: '/user/get/getuserAndAction',
    method: 'get',
  })
}

export function sysTree() {
  return request({
    url: '/userSystemMap/get/userId/forlogin',
    method: 'get',
    // params: reqParams
  })
}

// 登录权限系统
export function newlogin(data: LoginData) {
  return axios.post<LoginRes>('/login', data)
}
