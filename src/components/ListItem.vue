<template>
  <div class="list-container" data-hah='hah'>
    <div
      @click="toCardPage"
      :data-id="item.id"
      class="list-item"
      v-for="item in list"
      :key="item.id">
      <Item :item="item" :query="query" />
    </div>
  </div>
</template>
<script>
import Item from './Item'

export default {
  props: ['list', 'query'],
  components: { Item },
  methods: {
    toCardPage (event) {
      const scId = event.currentTarget.dataset.id
      wx.navigateTo({ url: `/pages/card/main?scId=${scId}`})
    }
  }
}
</script>
<style lang="less" scoped>
@import '../styles/variables';

.list-item {
  font-size: 14px;
  border-bottom: @base_border;
}
</style>
