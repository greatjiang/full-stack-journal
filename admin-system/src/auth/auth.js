import Cookies from 'js-cookie'

export function isLogin() {
  // console.log(Cookies.get('ADMINSYSTEM'))
  return Cookies.get('ADMINSYSTEM')
}

export function logout() {
  Cookies.remove('ADMINSYSTEM', { path: '/' });
}

export function nickname() {
  return Cookies.get('NICKNAME')
}