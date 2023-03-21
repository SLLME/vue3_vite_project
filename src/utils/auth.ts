import Cookies from "js-cookie"

const TokenKey = 'zzh_token'

export function getToken():string {
  return Cookies.get(TokenKey)
}

export function setToken(token:string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
