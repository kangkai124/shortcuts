<template>
  <div
    class="sc-item"
    :style="{ transform: test }"
    @touchstart="touchstart"
    @touchmove.stop="touchmove"
    @touchend="touchend">
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
    <aside class="delete"><h5>删除</h5></aside>
  </div>
</template>
<script>
export default {
  props: ['item', "query", "cancel"],
  data () {
    return {
      scKey: [],
      content: [],
      start: null,
      move: null,
      copy: 'translateX(0)',
      test: 'translateX(0)'
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
    getScKey () {
      if (this.query) {
        const index = this.item.scKey.toLowerCase().indexOf(this.query.toLowerCase())
        if (index > -1) {
          const len = this.query.length
          const previous = this.item.scKey.slice(0, index)
          const text = this.item.scKey.slice(index, index + len)
          const last = this.item.scKey.slice(index + len)
          const scKey = [ { text: previous, color: false },
            { text, color: true },
            { text: last, color: false } ]
          this.scKey = scKey
        } else {
          this.scKey = [{ text: this.item.scKey, color: false }]
        }
      } else {
        this.scKey = [{ text: this.item.scKey, color: false }]
      }
    },
    getContent () {
      if (this.query) {
        const index = this.item.content.toLowerCase().indexOf(this.query.toLowerCase())
        if (index > -1) {
          const len = this.query.length
          const previous = this.item.content.slice(0, index)
          const text = this.item.content.slice(index, index + len)
          const last = this.item.content.slice(index + len)
          const content = [ { text: previous, color: false },
            { text, color: true },
            { text: last, color: false } ]
          this.content = content
          console.log(content)
        } else {
          this.content = [{ text: this.item.content, color: false }]
        }
      } else {
        this.content = [ { text: this.item.content, color: false }]
      }
    },
    touchstart (event) {
      event.stopPropagation()
      this.start = event.pageX
      // console.log('start', event.clientX)
    },
    touchmove (event) {
      event.stopPropagation()
      this.move = event.pageX
      // console.log('move', event.clientX)
    },
    touchend (event) {
      event.stopPropagation()
      if (this.start - this.move > 0) {
        this.test = 'translateX(-60px)'
      } else {
        this.test = 'translateX(0)'
      }
      this.start = null
      this.move = null
      this.itemTransform = 'translateX(-60px)'
    }
  },
  computed: {
    itemTransform (props) {
      if (this.start && this.move) {
        const distance = Math.max(Math.min(this.move - this.start, 0), -60)
        this.copy = `translateX(${distance}px)`
        return `translateX(${distance}px)`
      } else {
        return this.copy
      }
    }
  },
}
</script>
<style lang="less">
@import '../styles/variables';
.sc-item {
  padding: 8px 10px;
  position: relative;
  transition: transform .2s ease-in;

  .delete {
    width: 60px;
    height: 100%;
    position: absolute;
    right: -60px;
    top: 0;
    background-color: #f95959;
    color: #fff;

    h5 {
      width: 100%;
      height: 20px;
      font-size: 18px;
      font-weight: normal;
      line-height: 20px;
      position: absolute;
      margin-top: -10px;
      text-align: center;
      top: 50%;
      left: 0;
    }
  }
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
