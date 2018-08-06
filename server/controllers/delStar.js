const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  const { scId, openId } = ctx.request.body
  console.log(scId, openId)
  try {
    await mysql('stars')
    .where({ scId, openId })
    .del()

    ctx.state.data = {
      msg: 'success'
    }
  } catch (err) {
    ctx.state = {
      code: 1,
      data: {},
      msg: `移除失败：${err.sqlMessage}`
    }
  }
}
