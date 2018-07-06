<template>
  <div class="list-container">
    <div class="list-item"
      v-for="item in list"
      :key="item.id">
      <h2>{{item.scKey}}</h2>
      <p>{{item.content}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['list']
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
  }

  p {
    line-height: 16px;
    color: @content_color;
  }
}
</style>
