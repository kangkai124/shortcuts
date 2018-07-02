<template>
  <div class="container">
    <i-input i-class="search" placeholder="快捷键/内容..." :value="keyboardText"/>
    <KeyBoard :text="keyboardText" @on-change="change"></KeyBoard>
  </div>
</template>
<script>
import KeyBoard from '../../components/KeyBoard'

export default {
  data () {
    return {
      keyboardText: ''
    }
  },
  components: {
    KeyBoard
  },
  onShareAppMessage () {

  },
  methods: {
    inputValue () {
      console.log('click')
    },
    change (value) {
      this.keyboardText = value
    }
  }
}
</script>
<style lang="less">
  @import '../../styles/variables';
  .container {
    padding-top: 40rpx;

    .search {
      width: 300px;
      margin: 0 auto;
      margin-bottom: 40rpx;
    }
  }
</style>
