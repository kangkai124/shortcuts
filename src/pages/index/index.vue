<template>
  <div class="container">
    <div class="top">
      <div class="fake-input">
        <input
          v-model="text"
          :placeholder="placeholder"
          @input="onTextChange"
          @focus="onTextFocus"
          @blur="onTextBlur" />
      </div>
    </div>
    <div class="list" v-if="list.length > 0">
      <ListItem :list="list" />
    </div>
  </div>
</template>
<script>
import { get } from '../../utils'
import ListItem from '../../components/ListItem'

export default {
  data () {
    return {
      pageNum: 0,
      more: true,
      list: [],
      text: '',
      placeholder: '请输入快捷键/功能...'
    }
  },
  components: { ListItem },
  // 小程序钩子
  onShow () {
    const { query = '' } = this.$root.$mp.query
    console.log(query)
    this.text = query
    this.getShortCutList(true)
  },
  onShareAppMessage () {

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
      if (init) {
        this.pageNum = 0
        this.more = true
      }
      const res = await get('/weapp/list', option || { pageNum: this.pageNum, scKey: this.text })
      wx.stopPullDownRefresh()
      if (res.data.list.length < 10 && this.pageNum > 0) this.more = false
      if (init) {
        this.list = res.data.list
      } else {
        this.list = this.list.concat(res.data.list)
      }
    },
    onTextChange () {
      this.getShortCutList(true)
    },
    onTextFocus () {
      this.placeholder = ''
    },
    onTextBlur () {
      if (this.text === '') this.placeholder = '请输入快捷键/功能...'
    },
    initialSclist () {
      this.text = ''
      this.placeholder = '请输入快捷键/功能...'
      this.getShortCutList(true)
    }

  }
}
</script>
<style lang="less">
  @import '../../styles/variables';
  .container {
    padding-top: 0;

    .top {
      width: 100%;
      height: 50px;
      background-color: #ededee;
      position: fixed;
      top: 0;
      left: 0;

      .fake-input {
        width: 90%;
        height: 30px;
        margin: 0 auto;
        margin-top: 10px;
        border: @base_border;
        border-radius: 6px;
        font-size: 12px;
        background: url(../../../static/image/logo_s.png) #fff no-repeat;
        background-position: 18px center;
        background-size: 20px;

        input {
          width: 80%;
          margin: 0 auto;
          text-align: center;
        }
      }
    }

    .list {
      overflow: hidden;
      margin-top: 50px;
      background-color: @background_color;
    }
  }
</style>
