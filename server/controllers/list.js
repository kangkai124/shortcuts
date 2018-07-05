const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { pageNum, scKey } = ctx.request.query
    const PAGE_SIZE = 10
    let data
    const select = mysql('excel')
      .select('id', 'scKey', 'content', 'star')

    // if (scKey) {
    //     data = list.filter(l => l.key.toLocaleLowerCase().includes(scKey.toLocaleLowerCase()))
    // }

    // if (pageNum) {
    //     data = data.slice(start, end + 1)
    // }

    if (scKey) {
        data = await select
      .where('scKey', 'like', `${scKey}%`)
      // .orWhere('scKey', 'like', `%${scKey}%`)
      .limit(PAGE_SIZE)
      .offset(Number(pageNum) * PAGE_SIZE)
    } else {
        data = await select
    .limit(PAGE_SIZE)
    .offset(Number(pageNum) * PAGE_SIZE)
    }

    ctx.state.data = {
        list: data
    }
}
