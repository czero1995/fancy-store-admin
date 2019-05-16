import Cookies from 'js-cookie'

const TokenKey = 'admin'
// const TokenKey = 'connect.sid'
const UserKey = 'user'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  console.log('remove', getToken())
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return Cookies.get(UserKey)
}

export function setUserInfo(token) {
  return Cookies.set(UserKey, token)
}
export function removeUserInfo() {
  console.log('remove')
  return Cookies.remove(UserKey)
}
