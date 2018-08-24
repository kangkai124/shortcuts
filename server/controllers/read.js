const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { id, openId } = ctx.request.body
  try {
    await mysql('newMessages')
      .where('userId', openId)
      .andWhere('messageId', id)
      .del()

    ctx.state.data = 'success'
  } catch (err) {
    ctx.state = {
      code: 1,
      msg: err.message
    }
  }
}
