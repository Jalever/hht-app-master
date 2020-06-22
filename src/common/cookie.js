import Cookies from 'js-cookie'
import * as CONSTANTS from '@/constants/index'

export function getCookies(key) {
  return Cookies.get(key)
}

export function initCookie() {
  // let seconds = expiresTime
  // let expires = new Date(new Date() * 1 + seconds * 1000)
  Cookies.set(CONSTANTS.LABEL_COOKIE_SCHOOLTIME, {})
  return Cookies.get(CONSTANTS.LABEL_COOKIE_SCHOOLTIME)
}

export function setCookiesWithExpiresTime(key, value, expiresTime) {
  let seconds = expiresTime
  let expires = new Date().getTime() + 1 * 30 * 1000
  return Cookies.set(key, value, { expires: expires })
}

export function setCookies(key, value, expiresTime = 30) {
  var curDate = new Date()

  //当前时间戳
  var curTamp = curDate.getTime()

  //当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
  var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1
  //当日已经过去的时间（毫秒）
  var passedTamp = curTamp - curWeeHours
  var leftTamp = 24 * 60 * 60 * 1000 - passedTamp
  var leftTime = new Date()
  leftTime.setTime(leftTamp + curTamp)
  
  return Cookies.set(key, value, { expires: leftTime })
}

export function removeCookies(key) {
  return Cookies.remove(key)
}
