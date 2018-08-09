<template>
  <div class="sc-item">
    <h2>
      <span
        :class="{highlight: item.color}"
        :key="i"
        v-for="(item, i) in scKey">{{item.text}}</span>
    </h2>
    <p>
      <span
        :class="{highlight: item.color}"
        :key="i"
        v-for="(item, i) in content">{{item.text}}</span>
    </p>
  </div>
</template>
<script>
export default {
  props: ['item', "query"],
  data () {
    return {
      scKey: [],
      content: []
    }
  },
  mounted () {
    this.getScKey()
    this.getContent()
  },
  watch: {
    item () {
      this.getScKey()
      this.getContent()
    }
  },
  methods: {
    // getScKey () {
    //   if (this.query) {
    //     const keys = this.query.split(' ').filter(_ => _)
    //     const index = this.item.scKey.toLowerCase().indexOf(this.query.trim().toLowerCase())
    //     if (index > -1) {
    //       const len = this.query.length
    //       const previous = this.item.scKey.slice(0, index)
    //       const text = this.item.scKey.slice(index, index + len)
    //       const last = this.item.scKey.slice(index + len)
    //       const scKey = [ { text: previous, color: false },
    //         { text, color: true },
    //         { text: last, color: false } ]
    //       this.scKey = scKey
    //     } else {
    //       this.scKey = [{ text: this.item.scKey, color: false }]
    //     }
    //   } else {
    //     this.scKey = [{ text: this.item.scKey, color: false }]
    //   }
    // },
    // getContent () {
    //   if (this.query) {
    //     const index = this.item.content.toLowerCase().indexOf(this.query.toLowerCase())
    //     if (index > -1) {
    //       const len = this.query.length
    //       const previous = this.item.content.slice(0, index)
    //       const text = this.item.content.slice(index, index + len)
    //       const last = this.item.content.slice(index + len)
    //       const content = [ { text: previous, color: false },
    //         { text, color: true },
    //         { text: last, color: false } ]
    //       this.content = content
    //     } else {
    //       this.content = [{ text: this.item.content, color: false }]
    //     }
    //   } else {
    //     this.content = [ { text: this.item.content, color: false }]
    //   }
    // },
    getScKey () {
      let _scKey = [{ text: this.item.scKey, color: false }]
      if (this.query) {
        const indexs = []
        const keys = this.query.split(' ').filter(_ => _)
        keys.forEach(k => {
          const i = this.item.scKey.toLowerCase().indexOf(k.toLowerCase())
          if (i > -1) indexs.push(i)
        })
        let _keys = [ ...keys ]
        let _indexs = [ ...indexs ]
        if (indexs[0] > indexs[1]) {
          _keys = [keys[1], keys[0]]
          _indexs = [indexs[1], indexs[0]]
        }
        if (_keys[0].includes(_keys[1])) {
          const realIndex = this.item.scKey.slice(_keys[0].length).toLowerCase().indexOf(_keys[1].toLowerCase())
          if (realIndex > -1) {
            _indexs[1] = realIndex + _keys[0].length
          } else {
            _keys.splice(1,1)
            _indexs.splice(1,2)
          }
        }
        if (indexs.length === keys.length && indexs.length === 1) {
          const len = keys[0].length
          const index = indexs[0]
          const previous = this.item.scKey.slice(0, index)
          const text = this.item.scKey.slice(index, index + len)
          const last = this.item.scKey.slice(index + len)
          _scKey = [previous, text, last].map((e, i) => {
            return { text: e, color: i % 2 === 1 }
          })
        } else if (indexs.length === keys.length && indexs.length === 2) {
          const len1 = _keys[0].length
          const len2 = _keys[1].length
          const index1 = _indexs[0]
          const index2 = _indexs[1]
          const one = this.item.scKey.slice(0, index1)
          const two = this.item.scKey.slice(index1, index1 + len1)
          const three = this.item.scKey.slice(index1 + len1, index2)
          const four = this.item.scKey.slice(index2, index2 + len2)
          const five = this.item.scKey.slice(index2 + len2)
          _scKey = [one, two, three, four, five].map((e, i) =>({
            text: e, color: i % 2 === 1
          }) )
        }
      }
      this.scKey = _scKey
    },
    getContent () {
      let _content = [{ text: this.item.content, color: false }]
      if (this.query) {
        const indexs = []
        const keys = this.query.split(' ').filter(_ => _)
        keys.forEach(k => {
          const i = this.item.content.toLowerCase().indexOf(k.toLowerCase())
          if (i > -1) indexs.push(i)
        })
        let _keys = [ ...keys ]
        let _indexs = [ ...indexs ]
        if (indexs[0] > indexs[1]) {
          _keys = [keys[1], keys[0]]
          _indexs = [indexs[1], indexs[0]]
        }
        if (_keys[0].includes(_keys[1])) {
          const realIndex = this.item.scKey.slice(_keys[0].length).toLowerCase().indexOf(_keys[1].toLowerCase())
          if (realIndex > -1) {
            _indexs[1] = realIndex + _keys[0].length
          } else {
            _keys.splice(1,1)
            _indexs.splice(1,2)
          }
        }
        if (indexs.length === keys.length && indexs.length === 1) {
          const len = keys[0].length
          const index = indexs[0]
          const previous = this.item.content.slice(0, index)
          const text = this.item.content.slice(index, index + len)
          const last = this.item.content.slice(index + len)
          _content = [previous, text, last].map((e, i) => {
            return { text: e, color: i % 2 === 1 }
          })
        } else if (indexs.length === keys.length && indexs.length === 2) {
          const len1 = _keys[0].length
          const len2 = _keys[1].length
          const index1 = _indexs[0]
          const index2 = _indexs[1]
          const one = this.item.content.slice(0, index1)
          const two = this.item.content.slice(index1, index1 + len1)
          const three = this.item.content.slice(index1 + len1, index2)
          const four = this.item.content.slice(index2, index2 + len2)
          const five = this.item.content.slice(index2 + len2)
          _content = [one, two, three, four, five].map((e, i) =>({
            text: e, color: i % 2 === 1
          }) )
        }
      }
      this.content = _content
    }
  }
}
</script>
<style lang="less">
@import '../styles/variables';
.sc-item {
  padding: 8px 10px;
}

h2 {
  height: 24px;
  line-height: 24px;
}

p {
  line-height: 16px;
  color: @content_color;
}

.highlight {
    color: #f44032;
  }
</style>
