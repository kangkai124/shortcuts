<template>
<div class="card-container">
  <swiper
    style="height: 300px;margin-top: 40px;perspective: 1200px;"
    :indicator-dots="dots"
    previous-margin="30px"
    next-margin="30px"
    duration="1000"
    @change="onSlideChange">
      <swiper-item :key="i" v-for="(item, i) in cards">
        <div class="item">
          {{item}}
          </div>
      </swiper-item>
  </swiper>
</div>
</template>
<script>
export default {
  data () {
    return {
      cards: [1, 2, 3, 4, 5, 6, 7],
      dots: false
    }
  },
  onShow () {

  },
  methods: {
    onSlideChange (event, a) {
      console.log(event, a)
    }
  }
}
</script>
<style lang="less">
.card-container {
  height: 100%;
  overflow: hidden;

  .item {
    width: 200px;
    height: 300px;
    margin: 0 auto;
    transform-style: preserve-3d;
    background-color: aliceblue;
  }
}
</style>
