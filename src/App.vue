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
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
.container {
  height: 100%;
  padding: 20rpx 0;
  box-sizing: border-box;
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
