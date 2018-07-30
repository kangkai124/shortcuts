const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  const { scId, openId } = ctx.request.body
  if (scId && openId) {
    try {
      const time = new Date()
      await mysql('stars').insert({ scId, openId, time })
      ctx.state.data = {
        msg: 'success'
      }
    } catch (err) {
      ctx.state = {
        code: 1,
        data: {
          msg: `收藏失败：${err.sqlMessage}`
        }
      }
    }
  } else {
    if (!openId) ctx.status = 401
    ctx.state = {
      code: 1,
      data: {
        msg: 'scId或者openId缺失'
      }
    }
  }
}
