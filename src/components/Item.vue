<template>
  <div>
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
        console.log(index)
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
    }
  }
}
</script>
<style lang="less">
@import '../styles/variables';

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
