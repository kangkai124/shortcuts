export const showSuccess = (title) => {
  wx.showToast({
    title,
    icon: 'success'
  })
}

export const showFail = (title, options) => {
  wx.showToast({
    title,
    icon: 'none',
    duration: 2500,
    ...options
  })
}

export const showLoading = (title) => {
  wx.showLoading({
    title
  })
}

export const showModal = (title, content) => {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
