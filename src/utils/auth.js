import Cookies from 'js-cookie'

const TokenKey = 'loginToken'
const AccountKey = 'AccountNumber'

export function getAccountToken() {
  return Cookies.get(AccountKey)
}
export function getToken() {
  return Cookies.get(TokenKey)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)

}
export function setAccountToken(Atoken) {
  return Cookies.set(AccountKey, Atoken)
}

export function removeAccountToken() {
  return Cookies.remove(AccountKey)
}

