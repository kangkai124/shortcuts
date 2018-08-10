const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { pageNum, scKey, pageSize, openId } = ctx.request.query
  const PAGE_SIZE = pageSize || 20
  let data = []
  let _err = {}
  const select = mysql('excel')
      .select('id', 'scKey', 'content')

  if (scKey) {
    if (scKey.split(',').length > 1) {
      try {
        const keys = scKey.split(',')
        data = await select
          .where('scKey', 'like', `%${keys[0]}%${keys[1]}%`)
          .orWhere('content', 'like', `%${keys[0]}%${keys[1]}%`)
          .limit(PAGE_SIZE)
          .offset(Number(pageNum) * PAGE_SIZE)
      } catch (err) {
        _err = {
          code: 1,
          msg: err.message
        }
      }
    } else {
      // 单个参数查询
      try {
        data = await select
                .where('scKey', 'like', `${scKey}%`)
                .orWhere('scKey', 'like', `%${scKey}%`)
                .orWhere('content', 'like', `%${scKey}%`)
                .limit(PAGE_SIZE)
                .offset(Number(pageNum) * PAGE_SIZE)
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
