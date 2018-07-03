<template>
  <div class="list-item">
    <h2>{{scKey}}</h2>
    <p>{{content}}</p>
  </div>
</template>
<script>
export default {
  props: ['scKey', 'content']
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
