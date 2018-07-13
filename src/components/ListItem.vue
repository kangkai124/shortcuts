<template>
  <div class="list-container">
    <div
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
  components: { Item }
}
</script>
<style lang="less" scoped>
@import '../styles/variables';

.list-item {
  // height: 40px;
  font-size: 14px;
  border-bottom: @base_border;
  padding: 8px 10px;
}
</style>
