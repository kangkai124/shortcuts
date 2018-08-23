const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  try {
    const users = await mysql('cSessionInfo')
    .select('open_id')
    const messages = await mysql('messages')
    .select('id')
    .where('isNew', 1)

    ;(async function () {
      for (var i = 0, l = users.length; i < l; i++) {
        for (var j = 0, ln = messages.length; j < ln; j++) {
          console.log({ userId: users[i]['open_id'], messageId: messages[j]['id'] })
          await mysql('newMessages')
            .insert({ userId: users[i]['open_id'], messageId: messages[j]['id'] })
        }
      }
    })()
    ctx.state.data = {
      users, messages
    }
  } catch (err) {
    ctx.state = {
      code: 1,
      msg: err.message
    }
  }
}
