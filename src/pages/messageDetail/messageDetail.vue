<template>
  <div class="msg-detail">
    <h1>{{title}}</h1>
    <p v-for="(item, i) in content" :key="i">{{item}}</p>
  </div>
</template>
<script>
import { get } from '../../utils/fetch'

export default {
  data () {
    return {
      title: '',
      content: []
    }
  },
  async onLoad () {
    const { messageId } = this.$root.$mp.query
    const res = await get('/weapp/messages', { messageId: Number(messageId) })
    this.title = res.data.title
    this.content = res.data.content.split('\n').filter(c => c)
  }
}
</script>
<style lang="less" scoped>
.msg-detail {
  padding: 10px;

  h1 {
    font-size: 14px;
    text-align: center;
  }

  p {
    padding: 6px 0;
    font-size: 14px;
    line-height: 20px;
    text-indent: 2em;
  }
}
</style>
