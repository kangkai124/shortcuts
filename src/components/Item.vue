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
      console.log('watch')
      this.getScKey()
      this.getContent()
    }
  },
  methods: {
    getScKey () {
      console.log(this.query, this.item)
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
        }
      } else {
        this.scKey = [{ text: this.item.scKey, color: false }]
      }
    },
    getContent () {
      this.content = [ { text: this.item.content, color: false }]
    }
  }
}
</script>
<style lang="less">
.highlight {
  color: #f44032;
}
</style>
