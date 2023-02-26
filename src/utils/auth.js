import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const TimeKey = 'time-key'

export function getTimeKey() {
  return Cookies.get(TimeKey)
}
export function setTimeKey() {
  return Cookies.set(TimeKey, Date.now())
}