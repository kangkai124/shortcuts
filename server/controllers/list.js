const { mysql } = require('../qcloud')
const { difference } = require('ramda')

module.exports = async ctx => {
  const { pageNum, scKey, pageSize, openId } = ctx.request.query
  const PAGE_SIZE = pageSize || 20
  let data
  const select = mysql('excel')
      .select('id', 'scKey', 'content')

  if (scKey) {
    if (scKey.split(' ').length > 1) {

    } else {
          // 单个参数查询
      const highMatch = await select
              .where('scKey', 'like', `${scKey}%`)
      const fuzzyMatch = await select
              .clearWhere()
              .where('scKey', 'like', `%${scKey}%`)
      const contentMatch = await select
              .clearWhere()
              .where('content', 'like', `%${scKey}%`)
      const withoutData = difference(fuzzyMatch)(highMatch)
      const scKeyData = highMatch.concat(withoutData)
      const onlyContentData = difference(contentMatch)(scKeyData)
      const allData = scKeyData.concat(onlyContentData)
      const start = pageNum * PAGE_SIZE
      const end = pageNum * PAGE_SIZE + PAGE_SIZE
      data = allData.slice(start, end)
    }
  } else {
    if (openId) {
      const stars = await mysql('stars').select('scId').orderBy('scId')
        .map(s => s.scId)
      let list = await select
        .limit(PAGE_SIZE)
        .offset(Number(pageNum) * PAGE_SIZE)
      list.forEach(l => {
        if (stars.includes(l.id)) {
          l.star = true
        } else {
          l.star = false
        }
      })
      data = list
    } else {
      data = await select
        .limit(PAGE_SIZE)
        .offset(Number(pageNum) * PAGE_SIZE)
    }
  }

  ctx.state.data = {
    list: data
  }
}
