const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  const { openId, orderby } = ctx.request.query
  if (!openId) {
    ctx.state = {
      code: 1,
      data: {
        msg: '缺少 openId'
      }
    }
  } else {
    let rule = ['time', 'desc']
    if (orderby === 'alp') rule = ['scKey', 'asc']
    const stars = await mysql('excel')
      .select('excel.id', 'excel.scKey', 'excel.content')
      .leftJoin('stars', 'excel.id', 'stars.scId')
      .leftJoin('cSessionInfo', 'cSessionInfo.open_id', 'stars.openId')
      .where('stars.openId', openId)
      .orderBy(rule[0], rule[1])

    ctx.state.data = {
      stars
    }
  }
}
