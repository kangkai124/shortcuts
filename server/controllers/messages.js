const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  const { messageId, openId } = ctx.request.query
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
  } else if (openId) {
    const messages = await mysql('messages')
      .select('messages.id', 'messages.title', 'messages.subTitle', 'newMessages.userId')
      .raw('case when newMessages.index is null then 0 else newMessages.index end index')
      .leftJoin('newMessages', 'messages.id', 'newMessages.messageId')
      .where('userId', openId)
      .orWhere('userId', null)
      .orderBy('id', 'desc')

    ctx.state.data = {
      list: messages
    }
  }
}
