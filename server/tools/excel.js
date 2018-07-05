const fs = require('fs')
const { resolve } = require('path')
const csv = require('csv-parser')
const { mysql } = require('../qcloud')

const file = resolve(__dirname, '../static/excel.csv')

let list = []

fs.createReadStream(file, 'utf-8')
  .pipe(csv())
  .on('data', item => {
      list.push({
          scKey: item.scKey,
          content: item.content
      })
  })
  .on('end', () => {
      // console.log(list)
      console.log('start import to database')
      console.log(list)
      list.forEach(async (l, i) => {
          const { scKey, content } = l
          await mysql('excel').insert({ scKey, content })
          console.log(`正在导入第${i + 1}条数据`)
      })
      // console.log('import done')

      // process.exit(0)
  })

