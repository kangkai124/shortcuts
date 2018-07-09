<template>
  <div class="list-container">
    <div
      class="list-item"
      v-for="item in list"
      :key="item.id">
      <!-- <h2>{{item.scKey}}</h2>
      <p>{{item.content}}</p> -->
      <Item :item="item" :query="query" />
    </div>
  </div>
</template>
<script>
import Item from './Item'
export default {
  props: ['list', 'query'],
  components: { Item },
  // computed: {
  //   colorList () {
  //     console.log(this.list)
  //     if (this.query) {
  //       const list = this.list.map(l => {
  //         const index = l.scKey.toLowerCase().indexOf(this.query.toLowerCase())
  //         if (index > -1) {
  //           const len = this.query.length
  //           const previous = l.scKey.slice(0, index)
  //           const text = l.scKey.slice(index, index + len)
  //           const last = l.scKey.slice(index + len)
  //           const scKey = [
  //             { text: previous, color: false },
  //             { text, color: true },
  //             { text: last, color: false }
  //           ]
  //           return {
  //             id: l.id,
  //             scKey,
  //             content: [ { text: l.content, color: false  } ]
  //           }
  //         }
  //       })
  //       return list
  //     } else {
  //       const list = this.list.map(l => {
  //         return {
  //           id: l.id,
  //           scKey: [ { text: l.scKey, color: false } ],
  //           content: [ { text: l.content, color: false  } ]
  //         }
  //       })
  //       return list
  //     }
  //   }
  // }
}
</script>
<style lang="less" scoped>
@import '../styles/variables';

.list-item {
  // height: 40px;
  font-size: 14px;
  border-bottom: @base_border;
  padding: 8px 10px;

  h2 {
    height: 24px;
    line-height: 24px;

    .highlight {
      color: #f44032;
    }
  }

  p {
    line-height: 16px;
    color: @content_color;
  }
}
</style>
