<template>
  <div class="sc-item">
    <h2>
      {{item.scKey}}
    </h2>
    <p>
      {{item.content}}
    </p>
  </div>
</template>
<script>
export default {
  props: ['item', "query"],
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
