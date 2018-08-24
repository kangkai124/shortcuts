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
    const messages = await mysql.raw('SELECT id, title, subTitle, userId, CASE WHEN `index` IS NULL THEN 0 else `index` END `index` FROM messages LEFT JOIN (SELECT * FROM newMessages WHERE userId = ?) t ON id = messageId', openId)
    // const messages = await mysql.with('f', qb => {
    //   qb.select().from('newMessages').where('userId', openId)
    // }).select().from('f')
    // const messages = await mysql('messages')
    //   .leftJoin('newMessages', 'messages.id', 'newMessages.messageId')
    //   .select('messages.id', 'messages.title', 'messages.subTitle', 'newMessages.userId', 'newMessages.index')
    //   // .raw('case when newMessages.index is null then 0 else newMessages.index end index')
    //   .where('newMessages.userId', openId)
    //   .orWhere('newMessages.userId', null)
    //   .orderBy('id', 'desc')
    console.log(messages)

    ctx.state.data = {
      list: messages[0]
    }
  }
}
