<template>
  <div class="container">
    <div class="top">
      <img
        class="icon"
        mode="aspectFit"
        src='../../../static/image/home_color.png'
        alt="back"
        @click="goBack" />
      <div class="fake-input">
        <input
          v-model="text"
          :placeholder="placeholder"
          @input="onTextChange"
          @focus="onTextFocus"
          @blur="onTextBlur" />
        <h5 class="clear" @click="clearText">x</h5>
      </div>
      <aside />
    </div>
    <div class="list" v-if="list.length > 0">
      <ListItem :list="list" :query="text" />
      <p class="no-more" v-if="!more">已经到最底部了</p>
    </div>
    <div v-if="list.length === 0 && !isFetching" class="no-content">╮(╯▽╰)╭ 没有"{{text}}"的搜索结果</div>
  </div>
</template>
<script>
import { get, showLoading } from '../../utils'
import ListItem from '../../components/ListItem'

export default {
  data () {
    return {
      pageNum: 0,
      more: true,
      list: [],
      text: '',
      placeholder: '请输入快捷键/功能...',
      isFetching: true
    }
  },
  components: { ListItem },
  // 小程序钩子
  onShow () {
    wx.setNavigationBarTitle({ title: '快捷键列表' })
    showLoading('加载中...')
    const { query = '' } = this.$root.$mp.query
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
      console.log('没有更多了')
    }
  },
  methods: {
    async getShortCutList (init, option) {
      if (init) {
        this.pageNum = 0
        this.more = true
      }
      this.isFetching = true
      const res = await get('/weapp/list', option || { pageNum: this.pageNum, scKey: this.text })
      this.isFetching = false
      wx.stopPullDownRefresh()
      wx.hideLoading()
      if (res.data.list.length < 20 && this.pageNum > 0) this.more = false
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
    },
    goBack () {
      console.log('go back')
      wx.switchTab({ url: '/pages/home/main' })
    },
    clearText () {
      this.initialSclist()
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
      display: flex;
      align-items: center;
      justify-content: space-around;

      .icon {
        width: 20px;
        height: 20px;
        flex: 1;
      }

      aside {
        flex: none;
        width: 16px;
      }

      .fake-input {
        width: 84%;
        height: 30px;
        flex: 7;
        display: flex;
        align-items: center;
        position: relative;
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

        .clear {
          width: 20px;
          height: 30px;
          line-height: 30px;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }

    .list {
      overflow: hidden;
      margin-top: 50px;
      background-color: @background_color;

      .no-more {
        font-size: 12px;
        color: @sub_color;
        text-align: center;
        padding: 10px 0;
      }
    }

    .no-content {
      overflow: hidden;
      margin-top: 50px;
      height: 60px;
      line-height: 60px;
      font-size: 12px;
      color: @sub_color;
      text-align: center;
    }
  }
</style>
