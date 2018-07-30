<template>
  <div class="star container">
    <div class="order-container">
      <picker
        :value="value"
        :range="range"
        @change="onPickerChange">
        <div class="orderby">
          排序方式：{{ range[value] }}
        </div>
      </picker>
    </div>
    <scroll-view
      class="scroll-view"
      scroll-y="true"
      enable-back-to-top="true">
      <div id="stars" class="list" v-if="list.length > 0">
        <ListItem :list="list" :query="text" />
        <!-- <p class="no-more" v-if="!more">已经到最底部了</p> -->
      </div>
      <div v-if="list.length === 0 && !isFetching" class="no-content">
        ╮(╯▽╰)╭ 还没有收藏哦
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { get, getW } from '../../utils/fetch'
import { showLoading, showFail } from '../../utils'
import ListItem from '../../components/ListItem'

const orderbys = ['time', 'alp']

export default {
  data () {
    return {
      list: [],
      userInfo: null,
      isFetching: true,
      value: 0,
      range: ['时间', '字母']
    }
  },
  components: { ListItem },
  onLoad () {
    const userInfo = wx.getStorageSync('user')
    this.userInfo = userInfo
    this.getMyStars()
  },
  onPullDownRefresh () {
    this.getMyStars(orderbys[this.value])
  },
/*  ===============================================
 * res 无法获取到 #stars 的信息，==> setTimeout
  updated () {
    console.log(wx.getSystemInfoSync())
    const query = wx.createSelectorQuery()
    query.select('.list').boundingClientRect()
    console.log(query)
    query.exec(res => {
      console.log(res)
    })
  },
===============================================  */
  methods: {
    async getMyStars (orderby = 'time') {
      showLoading('加载中...')
      try {
        this.isFetching = true
        const res = await getW('/weapp/stars', { orderby })
        console.log(res)
        wx.hideLoading()
        this.isFetching = false
        this.list = res.data.stars
      } catch (err) {
        this.isFetching = false
        wx.hideLoading()
        showFail(err.msg)
      }
    },
    onPickerChange (event) {
      const value = parseInt(event.mp.detail.value)
      if (value !== this.value) {
        this.value = value
        this.getMyStars(orderbys[value])
      }
    }
  }
}
</script>
<style lang="less">
@import "../../styles/variables";
.scroll-view {
  height: 90vh;
}
.star {
  padding: 0;
  position: relative;

  .order-container {
    width: 100%;
    height: 10vh;
    line-height: 10vh;
    text-align: center;
    font-size: 18px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: @main_color;
    color: #fff;
  }

  .list {
    overflow: hidden;

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
