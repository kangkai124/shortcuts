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
            <div class="cover">
              <img
                class="screenshot"
                @click.stop="preview(imgs[i])"
                mode="aspectFit"
                :src="imgs[i]"
                alt="F1" />
            </div>
          </div>
          <div class="icon-con">
              <img
                class="icon"
                @click="handleStar"
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
import { get, postW, delW } from '../../utils/fetch'
import { showLoading, showFail } from '../../utils'
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
      userInfo: null,
      fresh: true,
      imgs: []
    }
  },
  onShow () {
    console.log('card page', this.$root.$mp.appOptions)
    if (this.fresh) {
      const userInfo = wx.getStorageSync('user')
      if (userInfo) this.userInfo = userInfo
      // onShow 就要立马check
      this.checkCurrent()
      this.getShortCutList()
    } else {
      this.fresh = true
    }
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
      try {
        const res = await get('/weapp/list', body)
        const list = res.data.list
        if (list.length > 0) {
          const prefix = 'http://pcba4p0cq.bkt.clouddn.com/shortcuts/v2/'
          const imgs = list.map(l => `${prefix}${encodeURIComponent(l.scKey)}.jpg`)
          this.cards = res.data.list
          this.imgs = imgs
        }
        this.max = res.data.list.length - 1
        setTimeout(() => {
          wx.hideLoading()
        }, 300)
      } catch (err) {
        wx.hideLoading()
        console.log(err)
      }
    },
    sliderChange (event) {
      this.current = event.mp.detail.value
    },
    preview (imgUrl) {
      wx.getImageInfo({
        src: imgUrl,
        success (res) {
          wx.previewImage({
            urls: [imgUrl]
          })
        },
        fail (res) {
          showFail(res.errMsg)
        }
      })
      this.fresh = false
    },
    handleStar () {
      const card = this.cards[this.current]
      if (card.star) {
        this.delStar(card)
      } else {
        this.star(card)
      }
    },
    async star (card) {
        const body = { scId: card.id }
        try {
          const res = await postW('/weapp/star', body)
          if (res) {
            const newCard = Object.assign({}, card, { star: true })
            this.cards.splice(this.current, 1, newCard)
          }
        } catch (err) {
          if (err.code) showFail('收藏失败，小口袋好像生病了哦')
        }
    },
    async delStar (card) {
      try {
        const res = await delW('/weapp/star', { scId: card.id })
        const newCard = Object.assign({}, card, { star: false      })
        this.cards.splice(this.current, 1, newCard)
      } catch (err) {
        showFail(err.msg)
      }
    },
    checkCurrent () {
      const { scId } = this.$root.$mp.query
      if (scId && this.cards.length > 0) {
        const index = this.cards.findIndex(c => c.id === Number(scId))
        this.current = index
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

    .cover {
      width: 48vw;
      height: 32vw;
      border-radius: 4px;
      overflow: hidden;
      border: 2px solid rgba(2, 164, 210, 0.6);
      margin: 0 auto;
      background-color: rgba(238, 235, 235, 0.4);
    }

    .screenshot {
      width: 48vw;
      height: 32vw;
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
      transform: scale(1.2);
    }
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
