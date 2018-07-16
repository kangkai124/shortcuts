<template>
  <div class="container">
    <div class="input-container" :class="inputClass">
      <aside v-if="cancel" @click="onCancelClick"></aside>
      <h5 v-if="cancel" @click="onInputConfirm">搜索</h5>
      <div class="fake-input">
        <input
          :focus="focus"
          :disabled="!canInput"
          placeholder="请输入快捷键/内容"
          :placeholder-style="phStyle"
          v-model="text"
          @click="onInputClick"
          @focus="onTextFocus"
          @blur="onTextBlur"
          @confirm="onInputConfirm" />
      </div>
    </div>
    <div class="tab-bar">
      <div>卡片浏览</div>
      <div>我的收藏</div>
    </div>
  </div>
</template>
<script>
const defaultPhStyle = 'color: #7b7b7b;font-family: "pingfang", sans-serif;'
const activePhStyle = 'color: #ababab;font-family: "pingfang", sans-serif;'
const defaultPh = '请输入快捷键/功能...'
export default {
  data () {
    return {
      text: '',
      canInput: false,
      focus: false,
      cancel: false,
      phStyle: defaultPhStyle
    }
  },
  computed: {
    inputClass () {
      return this.canInput ? 'active' : 'default'
    }
  },
  onHide () {
    this.text = ''
    this.canInput = false
    this.focus = false
    this.cancel = false
  },
  onShareAppMessage () {

  },
  methods: {
    onTextFocus (e) {
      this.focus = true
    },
    onTextBlur () {
      this.focus = false
    },
    onInputClick (e) {
      if (!this.canInput) {
        this.canInput = true
        this.cancel = true
        this.phStyle = activePhStyle
        setTimeout(() => {
          this.focus = true
        }, 200)
      }
    },
    onInputConfirm () {
      wx.navigateTo({ url: `/pages/index/main?query=${this.text}` })
    },
    onCancelClick () {
      this.canInput = false
      this.focus = false
      this.cancel = false
      this.phStyle = defaultPhStyle
    }
  }
}
</script>
<style lang="less">
@import '../../styles/variables';
.container {
  position: relative;
  .input-container {
      width: 90%;
      height: 60px;
      border-radius: 6px;
      position: fixed;
      background: #f3f3f3;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.2s ease-in-out;


      .fake-input {
        width: 100%;
        height: 60px;
        position: absolute;
        bottom: 0;
        left: 0;

        input {
          width: 100%;
          height: 100%;
          font-size: 22px;
          font-weight: 100;
          text-align: center;
          background: url(../../../static/image/search.png) no-repeat;
          background-position: 32px center;
          background-size: 28px;
          box-sizing: border-box;
        }
      }

      aside {
        width: 100%;
        height: 60px;
        position: absolute;
        top: 0;
        right: 0;
        background: url(../../../static/image/bottom.png) no-repeat center top;
        background-size: 28px;
      }

      h5 {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        font-family: "pingfang", sans-serif;
        color: #ffaaa5;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 99;
      }
    }

    .active {
      height: 120px;
      top: 20px;

      .fake-input {
        input {
          width: calc(~'100% - 60px');
          text-align: left;
          padding-left: 10px;
          background-image: none;
        }
      }
    }
}
.tab-bar {
  width: 100%;
  height: 100px;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: center;

  div {
    flex: 1;
    height: 100%;
    line-height: 100px;
    background: #a8e6cf;
    color: #fff;
    font-size: 20px;
    text-align: center;

    &:active {
      background: darken(#a8e6cf, 10%)
    }
  }
}
</style>
