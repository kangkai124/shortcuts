const { mysql } = require('../qcloud')
const { difference } = require('ramda')

module.exports = async ctx => {
    const { pageNum, scKey, pageSize } = ctx.request.query
    const PAGE_SIZE = pageSize || 20
    let data
    const select = mysql('excel')
      .select('id', 'scKey', 'content', 'star')

    if (scKey) {
        if (scKey.split(' ').length > 1) {

        } else {
          // 单个参数查询
            console.log(scKey)
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
        data = await select
    .limit(PAGE_SIZE)
    .offset(Number(pageNum) * PAGE_SIZE)
    }

    ctx.state.data = {
        list: data
    }
}
