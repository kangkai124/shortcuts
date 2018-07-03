const list = [
  { id: 0, key: 'Ctrl+(', content: '取消隐藏选定范围内所有隐藏的行' },
  { id: 1, key: 'Ctrl+)', content: '取消隐藏选定范围内所有隐藏的列' },
  { id: 2, key: 'Ctrl+&', content: '将外框应用于选定单元格' },
  { id: 3, key: 'Ctrl+%', content: '应用带有两位小数的货币格式' },
  { id: 4, key: 'Ctrl+(', content: '取消隐藏选定范围内所有隐藏的行' },
  { id: 5, key: 'Ctrl+)', content: '取消隐藏选定范围内所有隐藏的列' },
  { id: 6, key: 'Ctrl+&', content: '将外框应用于选定单元格' },
  { id: 7, key: 'Ctrl+%', content: '应用带有两位小数的货币格式' },
  { id: 8, key: 'Ctrl+(', content: '取消隐藏选定范围内所有隐藏的行' },
  { id: 9, key: 'Ctrl+)', content: '取消隐藏选定范围内所有隐藏的列' },
  { id: 10, key: 'Ctrl+&', content: '将外框应用于选定单元格' },
  { id: 11, key: 'Ctrl+%', content: '应用带有两位小数的货币格式' },
  { id: 12, key: 'Ctrl+(', content: '取消隐藏选定范围内所有隐藏的行' },
  { id: 13, key: 'Ctrl+)', content: '取消隐藏选定范围内所有隐藏的列' },
  { id: 14, key: 'Alt+hah', content: 'hah将外框应用于选定单元格' },
  { id: 15, key: 'Alt+haha', content: 'haha应用带有两位小数的货币格式' },
  { id: 16, key: 'Ctrl+(', content: '取消隐藏选定范围内所有隐藏的行' },
  { id: 17, key: 'Ctrl+)', content: '取消隐藏选定范围内所有隐藏的列' },
  { id: 18, key: 'Ctrl+&', content: '将外框应用于选定单元格' },
  { id: 19, key: 'Ctrl+%', content: '应用带有两位小数的货币格式' },
  { id: 20, key: 'Ctrl+(', content: '取消隐藏选定范围内所有隐藏的行' },
  { id: 21, key: 'Shift+kk)', content: '取消隐藏选定范围内所有隐藏的列' },
  { id: 22, key: 'Shift+aa', content: 'aa将外框应用于选定单元格' },
  { id: 23, key: 'Ctrl+%', content: '应用带有两位小数的货币格式' },
  { id: 24, key: 'Ctrl+(', content: '取消隐藏选定范围内所有隐藏的行' },
  { id: 25, key: 'Ctrl+)', content: '取消隐藏选定范围内所有隐藏的列' },
  { id: 26, key: 'Shift+bb', content: 'bb将外框应用于选定单元格' },
  { id: 27, key: 'Ctrl+%', content: '应用带有两位小数的货币格式' },
  { id: 28, key: 'Ctrl+(', content: '取消隐藏选定范围内所有隐藏的行' },
  { id: 29, key: 'Ctrl+)', content: '取消隐藏选定范围内所有隐藏的列' },
  { id: 30, key: 'Shift+cc', content: 'cc将外框应用于选定单元格' },
  { id: 31, key: 'Ctrl+%', content: '应用带有两位小数的货币格式' },
  { id: 32, key: 'Ctrl+(', content: '取消隐藏选定范围内所有隐藏的行' },
  { id: 33, key: 'Ctrl+)', content: '取消隐藏选定范围内所有隐藏的列' },
  { id: 34, key: 'Shift+dd', content: 'dd将外框应用于选定单元格' },
  { id: 35, key: 'Ctrl+%', content: '应用带有两位小数的货币格式' },
  { id: 36, key: 'Ctrl+(', content: '取消隐藏选定范围内所有隐藏的行' }
]

module.exports = async ctx => {
    const { pageNum, scKey } = ctx.request.query
    const PAGE_SIZE = 10
    const start = (pageNum - 1) * PAGE_SIZE
    const end = pageNum * PAGE_SIZE - 1

    let data = list

    if (scKey) {
        data = list.filter(l => l.key.toLocaleLowerCase().includes(scKey.toLocaleLowerCase()))
    }

    if (pageNum) {
        data = data.slice(start, end + 1)
    }

    ctx.state.data = {
        list: data
    }
}
