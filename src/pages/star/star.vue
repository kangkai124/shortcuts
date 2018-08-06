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
        <SwiperList :list="list" @handleDetele="handleDetele" />
      </div>
      <div v-if="list.length === 0 && !isFetching" class="no-content">
        ╮(╯▽╰)╭ 还没有收藏哦
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { get, getW, delW } from '../../utils/fetch'
import { showLoading, showFail } from '../../utils'
import SwiperList from '../../components/SwiperList'

const orderbys = ['time', 'alp']

export default {
  data () {
    return {
      list: [],
      userInfo: null,
      isFetching: true,
      value: 0,
      range: ['时间', '字母'],
      actions : [
            {
                name : '喜欢',
                color : '#fff',
                fontsize : '20',
                width : 100,
                icon : 'like',
                background : '#ed3f14'
            },
            {
                name : '返回',
                width : 100,
                color : '#80848f',
                fontsize : '20',
                icon : 'undo'
            }
        ]
    }
  },
  components: { SwiperList },
  onLoad () {
    const userInfo = wx.getStorageSync('user')
    this.userInfo = userInfo
    this.getMyStars()
  },
  onShow (a) {
    console.log(a, 'onshow')
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
    },
    async handleDetele (id) {
      try {
        const res = await delW('/weapp/star', { scId: id })
        this.getMyStars(orderbys[this.value])
      } catch (err) {
        showFail(err.msg)
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

    .list-item {
      // height: 40px;
      font-size: 14px;
      border-bottom: @base_border;
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
