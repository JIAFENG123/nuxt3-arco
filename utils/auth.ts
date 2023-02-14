const TOKEN_KEY = 'token'

const isLogin = () => {
  return typeof window !== 'undefined' ? (localStorage && !!localStorage.getItem(TOKEN_KEY)) : false
}

const getToken = () => {
  return typeof window !== 'undefined' ? localStorage && localStorage.getItem(TOKEN_KEY) : ''
}

const setToken = (token: string) => {
  // eslint-disable-next-line no-unused-expressions
  typeof window !== 'undefined' ? localStorage && localStorage.setItem(TOKEN_KEY, token) : null
}

const clearToken = () => {
  // eslint-disable-next-line no-unused-expressions
  typeof window !== 'undefined' ? localStorage && localStorage.removeItem(TOKEN_KEY) : null
}

export { isLogin, getToken, setToken, clearToken }
