import Cookies from 'js-cookie'
import * as CONSTANTS from '@/constants/index'

export function getCookies(key) {
  return Cookies.get(key)
}

export function initCookie(curUserId) {
  Cookies.set(curUserId, {})
  return Cookies.get(curUserId)
}

export function setCookiesWithExpiresTime(key, value, expiresTime) {
  let seconds = expiresTime
  let expires = new Date().getTime() + 1 * 30 * 1000
  return Cookies.set(key, value, { expires: expires })
}

export function setCookies(key, value) {
  let curDate = new Date()
  let curTamp = curDate.getTime()
  let curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1
  let passedTamp = curTamp - curWeeHours
  let leftTamp = 24 * 60 * 60 * 1000 - passedTamp
  let leftTime = new Date()
  leftTime.setTime(leftTamp + curTamp)
  
  return Cookies.set(key, value, { expires: leftTime })
}

export function removeCookies(key) {
  return Cookies.remove(key)
}
