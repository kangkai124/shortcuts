<template>
<div class="card-container">
  <swiper
    style="height: 60vh;margin-top: 40px;padding-top: 1vh;"
    :indicator-dots="dots"
    :current="current"
    previous-margin="60px"
    next-margin="60px"
    duration="200"
    @change="onSlideChange">
    <div :key="i" v-for="(item, i) in cards">
      <swiper-item>
        <div class="item" :class="{normal: i !== current}">
          <h2>{{item.scKey}}</h2>
          <p>{{item.content}}</p>
          <div>
            <img
              @click.stop="preview"
              mode="aspectFit"
              src="../../../static/image/F1.png"
              alt="F1" />
          </div>
          <div class="icon-con">
              <img
              class="icon"
              @click="star"
              mode="aspectFit"
              :src="item.star ? activeStar : defaultStar"
              alt="star" />
          </div>
          </div>
      </swiper-item>
    </div>
  </swiper>
  <div class="bottom">
    <slider
      @changing="sliderChange"
      step="1"
      :max="max"
      activeColor="#a8e6cf"
      :value="current"
      block-size="20" />
  </div>
</div>
</template>
<script>
import { get, post, showLoading } from '../../utils'
import defaultStar from '../../../static/image/star.png'
import activeStar from '../../../static/image/star-color.png'

export default {
  data () {
    return {
      defaultStar,
      activeStar,
      cards: [],
      dots: false,
      current: 0,
      max: 100,
      userInfo: null
    }
  },
  mounted () {
    // const { current } = this.$root.$mp.query
    // if (current) this.current = +current
    // const userInfo = wx.getStorageSync('user')
    // if (userInfo) this.userInfo = userInfo
    // this.getShortCutList()
  },
  onShow () {
    const userInfo = wx.getStorageSync('user')
    if (userInfo) this.userInfo = userInfo
    this.getShortCutList()
  },
  methods: {
    onSlideChange (event, a) {
      this.current = event.mp.detail.current
    },
    async getShortCutList () {
      showLoading('加载中...')
      let body = {
        pageNum: 0,
        pageSize: 999,
      }
      if (this.userInfo && this.userInfo.openId) {
        body.openId = this.userInfo.openId
      }
      const res = await get('/weapp/list', body)
      this.cards = res.data.list
      this.max = res.data.list.length - 1
      setTimeout(() => {
        wx.hideLoading()
      }, 300)
    },
    sliderChange (event) {
      this.current = event.mp.detail.value
    },
    preview () {
      wx.previewImage({
        urls: ['http://pcba4p0cq.bkt.clouddn.com/shortcuts/F1.png']
      })
    },
    async star () {
      if (this.userInfo && this.userInfo.openId) {
        const card = this.cards[this.current]
        const body = {
          scId: card.id,
          openId: this.userInfo.openId
        }
        const res = await post('/weapp/star', body)
        if (res.code === 0) {
          const newCard = Object.assign({}, card, { star: true })
          this.cards.splice(this.current, 1, newCard)
        }
      } else {
        const that = this
        wx.showModal({
          title: '未登录',
          content: '是否前往登录？',
          cancelText: '取消',
          confirmText: '登录',
          success (res) {
            if (res.confirm) {
              wx.navigateTo({ url: `/pages/me/main?from=/pages/card/main&current=${that.current}` })
            }
          }
        })
      }
    }
  }
}
</script>
<style lang="less">
@import '../../styles/variables';

.card-container {
  height: 100%;
  overflow: hidden;
  background: url(http://pcba4p0cq.bkt.clouddn.com/hah.jpg) no-repeat;
  background-size: cover;

  .item {
    width: 90%;
    height: 58vh;
    margin: 0 auto;
    border-radius: 6px;
    box-shadow: 2px 4px 8px #a8e6cf;
    transition: all .2s ease-in-out;
    // border: 1px solid #a8e6cf;
    // background-color: #fff;
    text-align: center;
    background: url(http://pcba4p0cq.bkt.clouddn.com/card-bg.jpg) no-repeat;
    background-size: cover;

    h2 {
      font-size: 16px;
      height: 10vh;
      line-height: 10vh;
      text-align: center;
      color: #02a4d3;
    }

    p {
      height: 14vh;
      font-size: 14px;
      padding: 0 10px;
      color: @sub_color;
    }

    img {
      width: 80%;
      height: 20vh;
    }

    .icon-con {
      height: 14vh;
      line-height: 14vh;
    }

    .icon {
      width: 36px;
      height: 36px;
    }

    .icon:active {
      transform: scale(1.2)
;    }
  }

  .normal {
    transform: scale(0.8)
  }

}

.bottom {
  width: 90%;
  height: 20vh;
  position: fixed;
  bottom: 0;
  left: 5%;
}
</style>
