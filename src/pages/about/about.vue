<template>
  <div class="about">
    <div class="logo">
      <img src='http://pcba4p0cq.bkt.clouddn.com/shortcuts/v2/logo.png' />
    </div>
    <div class="footer">
      <p>旨在成为大中华地区最靠谱的Excel工具，为您提供最.....文案... </p>
      <p>
        微信公众号：gh_407e6532399c
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.about {
  height: 100%;
  overflow: hidden;

  .logo {
    width: 80%;
    margin: 0 auto;
    height: 70vh;
    text-align: center;
    border-bottom: 1px solid #d9d9d9;

    img {
      width: 80px;
      height: 80px;
      margin-top: 10vh;
    }
  }

  .footer {
    height: 30vh;
    width: 80%;
    margin: 0 auto;
    font-size: 12px;
    padding: 20px;

    p {
      padding: 6px 0;
    }
  }
}
</style>
