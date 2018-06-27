<template>
  <div class="container">
    <button
      class="login"
      open-type="getUserInfo"
      lang="zh_CN"
      @getuserinfo="doLogin">
        登录
    </button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { showSuccess } from '@/utils'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  methods: {
    doLogin (options) {
      qcloud.login({
        success: res => {
          console.log(res)
          showSuccess(`${res.nickName}, 欢迎`)
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style scoped>

</style>
