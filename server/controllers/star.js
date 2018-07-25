const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  const { scId, openId } = ctx.request.body
  if (scId && openId) {
    try {
      await mysql('stars').insert({ scId, openId })
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
    ctx.state = {
      code: 1,
      data: {
        msg: 'scId或者openId缺失'
      }
    }
  }
}
