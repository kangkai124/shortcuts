<template>
<div class="card-container">
  <swiper
    style="height: 60vh;margin-top: 40px;"
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
          </div>
      </swiper-item>
    </div>
  </swiper>
  <div class="bottom">
    <div class="useless">
      <h5><img src="../../../static/image/dislike.png" /></h5>
    </div>
    <div class="star">
      <h5><img src="../../../static/image/like.png" /></h5>
    </div>
  </div>
</div>
</template>
<script>
import { get, showLoading } from '../../utils'

export default {
  data () {
    return {
      cards: [],
      dots: false,
      current: 0
    }
  },
  mounted () {
    this.getShortCutList()
  },
  methods: {
    onSlideChange (event, a) {
      this.current = event.mp.detail.current
    },
    async getShortCutList () {
      showLoading('加载中...')
      const res = await get('/weapp/list', { pageNum: 0, pageSize: 999 })
      this.cards = res.data.list
      setTimeout(() => {
        wx.hideLoading()
      }, 300)
    },
  }
}
</script>
<style lang="less">
@import '../../styles/variables';

.card-container {
  height: 100%;
  overflow: hidden;
  // background: #e3fdfd;

  .item {
    width: 90%;
    height: 58vh;
    margin: 0 auto;
    border-radius: 6px;
    box-shadow: 0 0 8px #cbf1f5;
    transition: all .2s ease-in-out;
    border: 1px solid #cbf1f5;
    background-color: #fff;

    h2 {
      font-size: 16px;
      height: 10vh;
      line-height: 10vh;
      text-align: center;
      color: #f44032;
    }

    p {
      font-size: 14px;
      padding: 0 10px;
      color: @sub_color;
    }
  }

  .normal {
    transform: scale(0.8)
  }

  .bottom {
    height: calc(~'40vh - 40px');
    display: flex;

    div {
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      h5 {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 6px solid #eeeff1;
        border-radius: 50%;
      }

      img {
        width: 36px;
        height: 36px;

      }
    }
  }

}
</style>
