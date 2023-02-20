import { defineStore } from 'pinia'
// import { login as userLogin, logout as userLogout, LoginData } from '@/api/user'
import { Base64 } from 'js-base64'
import type { UserState } from './types'
import { getUserInfo, newlogin } from '@/api/users'
import { getUrlKey } from '@/utils/index'
import {
  getToken,
  removeToken,
  removeTokenPower,
  setToken,
  setTokenPower,
} from '@/utils/cookies'
import { usePermissionStore } from '@/store'
import usePermission from '@/hooks/permission'
import { NOT_FOUND } from '@/router/constants'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: getToken() || '',
    name: '',
    workcode: '',
    systemCode: 0,
    actionUrl: [],
    permissions: [],
    isPermissionTag: false,
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },
  actions: {
    setToken(token: string) {
      this.$patch({
        token,
      })
    },
    setName(name: string) {
      this.$patch({
        name,
      })
    },
    setCode(workcode: string) {
      this.$patch({
        workcode,
      })
    },
    setSystemcode(systemCode: number) {
      this.$patch({
        systemCode,
      })
    },
    setActionurl(actionUrl: object[]) {
      this.$patch({
        actionUrl,
      })
    },
    setPermissions(permissions: any[]) {
      this.$patch({
        permissions,
      })
    },
    setIsPermissionTag(isPermissionTag: boolean) {
      this.$patch({
        isPermissionTag,
      })
    },
    // 重置登陆信息
    resetInfo() {
      this.$reset()
    },
    // 根据code解析用户信息
    async LoginByUsername() {
      const urlInfo = JSON.parse(Base64.decode(getUrlKey('code') || ''))

      this.setToken(urlInfo.token)
      this.setSystemcode(urlInfo.systemCode)
      // this.setName(urlInfo.username)
      setToken(urlInfo.token)
      setTokenPower(JSON.stringify(urlInfo))
      if (typeof sessionStorage !== 'undefined')
        sessionStorage.setItem('urlInfo', JSON.stringify(urlInfo))
      return new Promise((resolve, reject) => {
        if (urlInfo)
          resolve(urlInfo)
        else
          reject(new Error('No request to URL parameters'))
      })
    },
    // 获取根据token用户信息 getUserAndActions
    async GetUserInfo() {
      let urlInfo
      if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('urlInfo'))
        urlInfo = JSON.parse(sessionStorage.getItem('urlInfo') || '{}')
      else if (getUrlKey('code'))
        urlInfo = JSON.parse(Base64.decode(getUrlKey('code') || ''))

      try {
        // if (this.token === '')
        //   throw new Error('GetUserInfo: token is undefined!')
        // 跳登录
        const { data } = await getUserInfo()
        if (!data)
          throw new Error('Verfication failed, please Login again')

        const { name, actionUrl, workcode, userRightVoList } = data
        const { systemCode } = urlInfo
        this.setName(name)
        this.setCode(workcode)
        this.setActionurl(actionUrl)
        this.setSystemcode(systemCode)
        // tag权限处理
        const permission = userRightVoList.filter((item: any) => item.tag)
        this.setPermissions(permission) // 账号拥有的权限tag列表
        this.setIsPermissionTag(true)
      }
      catch (error) {
        console.log(error)
      }
    },
    async LoginByUsernameDev(loginForm: any) {
      const urlInfo = JSON.parse(typeof sessionStorage !== 'undefined' ? (sessionStorage.getItem('urlInfo') || '{}') : '{}')
      if (!urlInfo.systemCode) {
        newlogin(loginForm).then(async (res: any) => {
          const response = res.data
          if (response.code === '000000') {
            const urlInfoNew = {
              systemCode: import.meta.env.VITE_APP_SYSTEM_ID, // 暂时写需跳转的系统
              token: response.data.token,
              userId: response.data.userInfo.userId,
              username: response.data.userInfo.username,
            }
            this.setToken(urlInfoNew.token)
            setToken(urlInfoNew.token)
            setTokenPower(JSON.stringify(urlInfoNew))
            if (typeof sessionStorage !== 'undefined')
              sessionStorage.setItem('urlInfo', JSON.stringify(urlInfoNew))
            const { data } = await getUserInfo()

            if (!data)
              throw new Error('Verfication failed, please Login again')

            const { name, actionUrl, workcode, userRightVoList } = data
            const { systemCode } = urlInfoNew
            this.setName(name)
            this.setCode(workcode)
            this.setActionurl(actionUrl)
            this.setSystemcode(systemCode as unknown as number)
            // tag权限处理
            const permission = userRightVoList.filter((item: any) => item.tag)
            this.setPermissions(permission) // 账号拥有的权限tag列表
            this.setIsPermissionTag(true)
            const permissionStore = usePermissionStore()
            const Permission = usePermission()
            await permissionStore.GenerateRoutes(systemCode as unknown as number)
            const destination
              = Permission.findFirstPermissionPermissionRoute(
                permissionStore.routes,
              ) || NOT_FOUND
            await navigateTo(destination)
          }
        })
      }
    },
    // 退出登陆
    async logout() {
      this.setName('')
      this.setToken('')
      this.setActionurl([])
      this.setSystemcode(0)
      removeToken()
      removeTokenPower()
      if (typeof sessionStorage !== 'undefined')
        sessionStorage.removeItem('urlInfo')
    },
  },
})

export default useUserStore
