const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  const { openId } = ctx.request.query
  if (!openId) {
    ctx.state = {
      code: 1,
      data: {
        msg: '缺少 openId'
      }
    }
  } else {
    const stars = await mysql('excel')
      .select('excel.id', 'excel.scKey', 'excel.content', 'cSessionInfo.open_id')
      .leftJoin('stars', 'excel.id', 'stars.scId')
      .leftJoin('cSessionInfo', 'cSessionInfo.open_id', 'stars.openId')
      .where('stars.openId', openId)

    ctx.state.data = {
      stars
    }
  }
}
