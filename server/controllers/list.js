const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { pageNum, scKey } = ctx.request.query
    const PAGE_SIZE = 10
    const select = await mysql('excel')
      .select('id', 'scKey', 'content', 'star')
      .limit(PAGE_SIZE)
      .offset(Number(pageNum) * PAGE_SIZE)

    // if (scKey) {
    //     data = list.filter(l => l.key.toLocaleLowerCase().includes(scKey.toLocaleLowerCase()))
    // }

    // if (pageNum) {
    //     data = data.slice(start, end + 1)
    // }

    ctx.state.data = {
        list: select
    }
}
