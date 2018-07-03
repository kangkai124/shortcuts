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
          scKey: item.key,
          content: item.content
      })
  })
  .on('end', () => {
      // console.log(list)
      console.log('start import to database')
      list.forEach(async (l) => {
          const { scKey, content } = l
          await mysql('excel').insert({ scKey, content })
      })
  })

