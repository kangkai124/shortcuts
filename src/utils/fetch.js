import config from '../config'
import { showFail } from './index'

const getOpenId = () => {
  const userInfo = wx.getStorageSync('user')
  return userInfo && userInfo.openId
}

const request = (url, method, data) => new Promise((resolve, reject) => {
  wx.request({
    data,
    method,
    url: config.host + url,
    success (res) {
      if (res.statusCode === 401) {
        wx.navigateTo({ url: `/pages/me/main?from=true` })
        reject(res.statusCode)
      }
      if (res.data.code === 0) {
        resolve(res.data)
      } else {
        console.error(res.data)
        reject(res.data)
      }
    },
    fail () {
      showFail('网络连接失败，请检查您的网络', { duration: 2500 })
    }
  })
})

export const get = (url, data) => request(url, 'GET', data)

export const post = (url, data) => request(url, 'POST', data)

export const getW = (url, data) => {
  const openId = getOpenId()
  return get(url, Object.assign({}, { openId }, data))
}

export const postW = (url, data) => {
  const openId = getOpenId()
  return post(url, Object.assign({}, { openId }, data))
}
