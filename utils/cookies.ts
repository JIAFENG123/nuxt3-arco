import Cookies from 'js-cookie'

const tokenKey = 'vue_ts_vite_arco'
const powerToken = typeof window !== 'undefined' ? window.location.host : '666666'

export const getToken = () => Cookies.get(tokenKey)
export const getTokenPower = () => Cookies.get(powerToken)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)
export function setTokenPower(token: string) {
  const inHalfADay = 0.5 // 12小时失效时间
  return Cookies.set(powerToken, token, {
    expires: inHalfADay,
  })
}
export const removeTokenPower = () => Cookies.remove(powerToken)
