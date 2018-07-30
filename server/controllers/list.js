const { mysql } = require('../qcloud')
const { difference } = require('ramda')

module.exports = async ctx => {
  const { pageNum, scKey, pageSize, openId } = ctx.request.query
  const PAGE_SIZE = pageSize || 20
  let data
  let _err = {}
  const select = mysql('excel')
      .select('id', 'scKey', 'content')

  if (scKey) {
    if (scKey.split(' ').length > 1) {

    } else {
          // 单个参数查询
      try {
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
      } catch (err) {
        _err = {
          code: 1,
          msg: err.message
        }
      }
    }
  } else {
    if (openId) {
      try {
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
      } catch (err) {
        _err = {
          code: 1,
          msg: err.message
        }
      }
    } else {
      try {
        data = await select
          .limit(PAGE_SIZE)
          .offset(Number(pageNum) * PAGE_SIZE)
      } catch (err) {
        _err = {
          code: 1,
          msg: err.message
        }
      }
    }
  }

  if (_err.code) {
    ctx.state = _err
  } else {
    ctx.state.data = {
      list: data
    }
  }
}
