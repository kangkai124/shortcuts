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
          @input="onTextChange"
          @focus="onTextFocus"
          @blur="onTextBlur" />
      </div>
    </div>
    <div class="list">
      <ListItem
        v-for="item in list"
        :key="item.id"
        :scKey="item.scKey"
        :content="item.content" />
    </div>
  </div>
</template>
<script>
import { get } from '../../utils'
import ListItem from '../../components/ListItem'
import logoUrl from '../../../static/image/logo.png'

export default {
  data () {
    return {
      text: '',
      logo: logoUrl,
      placeholder: '请输入快捷键/功能...',
      canInput: false,
      pageNum: 0,
      more: true,
      list: [],
      focus: false
    }
  },
  components: { ListItem },
  updated () {
    console.log('update')
  },
  computed: {
    inputClass () {
      return this.canInput ? 'active-input' : 'default-input'
    }
  },
  onPullDownRefresh () {
    this.initialSclist()
  },
  onReachBottom () {
    if (this.more) {
      this.pageNum = this.pageNum + 1
      this.getShortCutList()
    } else {
      console.log('已经加载全部了...')
    }
  },
  methods: {
    async getShortCutList (init, option) {
      if (!this.canInput) return
      if (init) {
        this.pageNum = 0
        this.more = true
      }
      const list = [...this.list]
      const res = await get('/weapp/list', option || { pageNum: this.pageNum, scKey: this.text })
      wx.stopPullDownRefresh()
      if (res.data.list.length < 10 && this.pageNum > 0) this.more = false
      if (init) {
        this.list = res.data.list
      } else {
        this.list = list.concat(res.data.list)
      }
    },
    onTextChange () {
      console.log('text change')
      this.getShortCutList(true)
    },
    onTextFocus () {
      console.log('text focus')
      this.placeholder = ''
      this.focus = true
    },
    onTextBlur () {
      console.log('text blur')
      this.focus = false
      if (this.text === '') this.placeholder = '请输入快捷键/功能...'
    },
    onInputClick (e) {
      console.log('text click')
      if (!this.canInput) {
        this.canInput = true
        this.placeholder = ''
        setTimeout(() => {
          this.focus = true
          this.initialSclist()
        }, 500)
      }
    },
    initialSclist () {
      this.text = ''
      this.getShortCutList(true, { pageNum: 0 })
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
      transition: top 0.5s ease-in-out,
                  height 0.3s ease-in-out 0.5s,
                  background 0.3s ease-in-out  0.5s;

      .fake-input {
        width: 90%;
        height: 100%;
        margin: 0 auto;
        border: @base_border;
        border-radius: 6px;
        font-size: 14px;
        background: url(../../../static/image/logo_s.png) #fff no-repeat;
        background-position: 18px center;
        background-size: 40px;
        transition: all 0.3s ease-in-out .5s;

        input {
          width: 80%;
          height: 100%;
          margin: 0 auto;
          text-align: center;
        }
      }
    }

    .default-input {
      top: 40%;
      left: 0;
    }

    .active-input {
      height: 50px;
      background-color: #ededee;
      top: 0;
      left: 0;

      .fake-input {
        margin-top: 10px;
        height: 30px;
        background-size: 20px;
      }
    }

    .list {
      overflow: hidden;
      margin-top: 50px;
      background-color: @background_color;
    }
}
</style>
