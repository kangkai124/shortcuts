<script>
import qcloud from 'wafer2-client-sdk'
import conf from './config'

export default {
  created () {
    qcloud.setLoginUrl(conf.loginUrl)
  }
}
</script>

<style lang="less">
@import './styles/variables';
html, body {
  height: 100%;
}
.container {
  height: 100%;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; */
  padding: 20rpx 0;
  box-sizing: border-box;
  background-color: @background_color;
}
.icon {
  width: 30px;
  height: 30px;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
