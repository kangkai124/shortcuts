<template>
  <div class="swiper-list">
    <div
      @tap="toCardPage"
      @longpress="longpress(item, $event)"
      :data-id="item.id"
      class="list-item"
      v-for="item in list"
      :key="item.id">
      <h2>{{item.scKey}}</h2>
      <p>{{item.content}}</p>
    </div>
  </div>
</template>
<script>
import Item from './Item'

export default {
  props: ['list'],
  components: { Item },
  data () {
    return {

    }
  },
  methods: {
    toCardPage (event) {
      if (this.display === 'block') {
        this.display = 'none'
      } else {
        const scId = event.currentTarget.dataset.id
        wx.navigateTo({ url: `/pages/card/main?scId=${scId}`})
      }
    },
    longpress (item, event) {
      console.log(item)
      const _this = this
      wx.showModal({
        title: '移除收藏',
        content: `确定要移除 '${item.scKey}' 吗`,
        success (res) {
          if (res.confirm) {
            _this.$emit('handleDetele', item.id)

          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../styles/variables';
.swiper-list {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .list-item {
    font-size: 14px;
    border-bottom: @base_border;
    padding: 8px 10px;

    h2 {
      height: 24px;
      line-height: 24px;
    }

    p {
      line-height: 16px;
      color: @content_color;
    }
  }

  aside {
    width: 40px;
    height: 30px;
    background-color: pink;
    font-size: 18px;
    position: fixed;
  }
}
</style>
