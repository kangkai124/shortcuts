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
          :placeholder-class="phClass"
          v-model="text"
          @click="onInputClick"
          @focus="onTextFocus"
          @blur="onTextBlur"
          @confirm="onInputConfirm" />
      </div>
      <div class="history" v-if="!showBottom && history.length > 0">
        <span>搜索历史</span>
        <div class="history-list">
          <div
            @click="historyTap(item)"
            :key="index"
            v-for="(item, index) in history">
            {{item}}
          </div>
        </div>
      </div>
    </div>
    <div class="bottom" :style="{display: showBottom ? 'block': 'none' }">
      <div class="top">高频快捷键</div>
      <div class="tab-bar">
        <div @click="toCard">卡片浏览</div>
        <div @click="toStar">个人中心</div>
      </div>
    </div>
  </div>
</template>
<script>
const defaultPh = '请输入快捷键/功能...'
export default {
  data () {
    return {
      text: '',
      history: [],
      canInput: false,
      focus: false,
      cancel: false,
      showBottom: true,
      phClass: 'default-placeholder'
    }
  },
  computed: {
    inputClass () {
      return this.canInput ? 'active' : 'default'
    }
  },
  onShow () {
    const history = wx.getStorageSync('history')
    console.log(history)
    if (history && history.length > 0) {
      this.history = history
    }
  },
  deactivated() {
    console.log('deactivated deactivated')
  },
  onHide () {
    this.text = ''
    this.canInput = false
    this.focus = false
    this.cancel = false
    this.showBottom = true
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
        this.showBottom = false
        this.phClass = 'active-placeholder'
        setTimeout(() => {
          this.focus = true
        }, 200)
      }
    },
    onInputConfirm () {
      if (this.text === '') {
        wx.navigateTo({ url: `/pages/index/main?query=${this.text}` })
      } else {
        this.handleConfirm(this.text)
      }
    },
    onCancelClick () {
      this.text = ''
      this.canInput = false
      this.focus = false
      this.cancel = false
      this.showBottom = true
      this.phClass = 'default-placeholder'
    },
    toCard () {
      wx.navigateTo({ url: '/pages/card/main' })
    },
    toStar () {
      wx.navigateTo({ url: '/pages/me/main'})
    },
    reset () {
      this.text = ''
      this.canInput = false
      this.focus = false
      this.cancel = false
      this.phClass = 'default-placeholder'
    },
    historyTap (text) {
      console.log(text)
      this.handleConfirm(text)
    },
    handleConfirm (text) {
      let history = [ ...wx.getStorageSync('history') || [] ]
      const index = history.indexOf(text)
      if (index > -1) {
        history.splice(index, 1)
      }
      history.unshift(text)
      history = history.slice(0, 6)
      try {
      	wx.setStorageSync('history', history)
        wx.navigateTo({ url: `/pages/index/main?query=${text}` })
      } catch (err) {
        console.log(err)
      }
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

      .history {
        width: 100%;
        height: 140px;
        position: absolute;
        left: 0;
        bottom: -140px;
        font-size: 12px;

        span {
          display: inline-block;
          height: 40px;
          line-height: 40px;
        }

        .history-list {
          height: 100px;
          overflow: hidden;

          div {
            float: left;
            min-width: 30px;
            text-align: center;
            padding: 0 10px;
            border-radius: 20px;
            margin-right: 10px;
            margin-bottom: 10px;
            line-height: 40px;
            background: @main_color;
            color: #fff;
            font-size: 16px;

          }
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

.default-placeholder {
  color: #7b7b7b;
  font-weight: 100;
}

.active-placeholder {
  color: #ababab;
  font-weight: 100;
}

.bottom {
  width: 100%;
  height: 200px;
  position: fixed;
  bottom: 0;
  left: 0;

  .top {
    height: 100px;
    font-size: 14px;
    color: #a8e6cf;
    text-align: center;
  }

  .tab-bar {
    width: 100%;
    height: 100px;
    display: flex;
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
}
</style>
