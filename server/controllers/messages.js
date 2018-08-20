const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  const { messageId } = ctx.request.query
  if (messageId) {
    try {
      const messages = await mysql('messages')
        .select('id', 'title', 'content')
        .where('id', messageId)
        .orderBy('id', 'desc')

      ctx.state.data = messages[0]
    } catch (err) {
      ctx.state = {
        code: 1,
        msg: err.message
      }
    }
  } else {
    const messages = await mysql('messages')
      .select('id', 'title', 'subTitle')
      .orderBy('id', 'desc')

    ctx.state.data = {
      list: messages
    }
  }
}
