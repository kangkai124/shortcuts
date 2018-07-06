<template>
  <div class="container">
    <div class="input-container" :class="inputClass">
      <div class="fake-input">
        <input
          :focus="focus"
          :disabled="!canInput"
          :placeholder="placeholder"
          v-model="text"
          @click="onInputClick"
          @focus="onTextFocus"
          @blur="onTextBlur"
          @confirm="onInputConfirm" />
      </div>
      <aside v-if="cancel" @click="onCancelClick">取消</aside>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      text: '',
      placeholder: '请输入快捷键/功能...',
      canInput: false,
      focus: false,
      cancel: false
    }
  },
  computed: {
    inputClass () {
      return this.canInput ? 'active-input' : 'default-input'
    }
  },
  onHide () {
    this.text = ''
    this.placeholder = '请输入快捷键/功能...'
    this.canInput = false
    this.focus = false
    this.cancel = false
  },
  onShareAppMessage () {

  },
  methods: {
    onTextFocus () {
      this.placeholder = ''
      this.focus = true
    },
    onTextBlur () {
      this.focus = false
      if (this.text === '') {
        this.placeholder = '请输入快捷键/功能...'
      }
    },
    onInputClick (e) {
      if (!this.canInput) {
        this.canInput = true
        this.placeholder = ''
        setTimeout(() => {
          this.focus = true
          this.cancel = true
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
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/variables';
.container {
  position: relative;

  .input-container {
      width: 100%;
      height: 60px;
      position: fixed;
      top: 40%;
      left: 0;


      .fake-input {
        width: 90%;
        height: 100%;
        border: @base_border;
        border-radius: 6px;
        margin-left: auto;
        margin-right: auto;
        font-size: 14px;
        background: url(../../../static/image/logo_s.png) #fff no-repeat;
        background-position: 18px center;
        background-size: 40px;
        // transition: width 0.2s ease-in-out 0.2s;

        input {
          width: 80%;
          height: 30px;
          margin: 15px auto;
          text-align: center;
        }
      }

      aside {
        width: calc(~'16% - 12px');
        height: 60px;
        line-height: 60px;
        font-size: 12px;
        text-align: center;
        color: @sub_color;
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .default-input {
      transition: top 0.2s ease-in-out,
                  height 0.2s ease-in-out 0.2s;
    }

    .active-input {
      background-color: #ededee;
      top: 0;
      transition: top 0.2s ease-in-out,
                  height 0.2s ease-in-out 0.2s,
                  background 0.2s ease-in-out  0.2s;

      .fake-input {
        width: 84%;
        margin-top: 15px;
        margin-left: 10px;
        height: 30px;
        background-size: 20px;

        input {
          margin: 0 auto;
        }
      }
    }
}
</style>
