<template>
  <div class="star">
    <div class="blank" v-if="messages.length === 0">暂时没有什么消息...</div>
    <div class="content" v-else>
      <section v-for="item in messages" :key="item.id" @click="onClick(item.id, item.index)">
        <div class="title">
          {{item.title}}
        <aside v-show="item.index"><img mode="aspectFit" src="../../../static/image/new.png" /></aside>
        </div>
        <div class="sub-title">{{item.subTitle}}</div>
        <div class="detail">→查看详情</div>
      </section>
    </div>
  </div>
</template>
<script>
import { getW, delW } from '../../utils/fetch'
export default {
  data () {
    return {
      messages: []
    }
  },
  onLoad () {
    wx.showLoading()
    this.getMessages()
  },
  methods: {
    async getMessages () {
      const res = await getW('/weapp/messages')
      wx.hideLoading()
      this.messages = res.data.list
    },
    async onClick (id, unRead) {
      if (unRead) {
        await delW('/weapp/read', { id })
        this.getMessages()
      }
      wx.navigateTo({ url: `/pages/messageDetail/main?messageId=${id}` })
    }
  }
}
</script>
<style lang="less">
.star {

  .blank {
    color: #999;
    font-size: 14px;
    text-align: center;
    padding-top: 20vh;
  }

  .content {
    overflow: hidden;

    section {
      width: 90%;
      margin: 0 auto;
      padding: 10px 0;
      padding-top: 10px;
      border-bottom: 1px solid #d9d9d9;

      .title {
        height: 16px;
        line-height: 16px;
        border-left: 3px solid #d9d9d9;
        padding-left: 10px;
        font-size: 14px;
        position: relative;

        aside {
          width: 32px;
          height: 16px;
          position: absolute;
          top: 0;
          right: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .sub-title {
        font-size: 14px;
        font-weight: normal;
        padding: 10px 0;
        padding-left: 10px;
      }

      .detail {
        font-size: 12px;
        font-weight: normal;
        padding-left: 10px;
        color: #999;
      }
    }
  }
}
</style>
