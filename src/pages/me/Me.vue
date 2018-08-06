<template>
  <div class="container">
    <div class="login" v-if="showLogin">
      <button
          v-if="showLogin"
          class="login"
          open-type="getUserInfo"
          lang="zh_CN"
          @getuserinfo="doLogin">
            登录
        </button>
    </div>
    <div class="logined" v-else>
      <div class="user-info">
      <h2>
        <img :src="avatar" alt="user avatar">
      </h2>
      <h3>{{userInfo.nickName}}</h3>
    </div>
    <ul class="list">
      <li
        class="list-item"
        :style="{ background: colors[i] }"
        @click="navigate(item.link)"
        v-for="(item, i) in list"
        :key="i">
        <h3>{{item.text}}</h3>
      </li>
    </ul>
    </div>

  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { showSuccess } from '@/utils'
import { showFail } from '../../utils'

const colors = [
    'rgba(168, 230, 207, 0.474)',
    'rgba(168, 230, 207, 0.774)',
    '#a8e6cf',
    '#a8e7df'
  ]

export default {
  data () {
    return {
      showLogin: true,
      avatar: '',
      userInfo: {},
      list: [],
      colors
    }
  },
  mounted () {
    this.checkLogin()
    this.genList()
  },
  methods: {
    doLogin (options) {
      const that = this
      wx.showLoading({ title: '正在登录中' })
      qcloud.login({
        success: res => {
          that.userInfo = res
          that.avatar = res.avatarUrl
          that.showLogin = false
          wx.hideLoading()
          wx.setStorageSync('user', res)
          const { from } = this.$root.$mp.query
          if (from) {
            wx.navigateBack({ delta: 1 })
          }
        },
        fail: err => {
          wx.hideLoading()
          showFail(err.message)
          console.error(err)
        }
      })
    },
    checkLogin () {
      wx.showLoading({ title: '正在加载中' })
      const userInfo = wx.getStorageSync('user');
      this.showLogin = !userInfo
      this.userInfo = userInfo
      this.avatar = userInfo.avatarUrl
      wx.hideLoading()
    },
    genList () {
      this.list = [
        { text: '消息中心', link: '/pages/message/main' },
        { text: '我的收藏', link: '/pages/star/main' },
        { text: '关于我们', link: '/pages/about/main' },
        { text: '意见反馈', link: '/pages/contact/main' }
      ]
    },
    navigate (link) {
      wx.navigateTo({ url: link })
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../styles/variables';

.container {
  width: 100%;
  height: 100%;
}

.logined {
  height: 100%;
  overflow: hidden;

  .user-info {
    width: 100%;
    height: 30vh;

    h2 {
      width: 100%;
      height: 20vh;
      text-align: center;

      img {
        width: 80px;
        height: 80px;
        margin-top: 20px;
        border-radius: 50%;
      }
    }

    h3 {
      width: 100%;
      height: 10vh;
      text-align: center;
      font-size: 20px;
    }
  }

  .list {
    width: 100%;
    box-sizing: border-box;
    height: 70vh;
    padding: 0 6.6vw;
    overflow: hidden;
    list-style-type: none;

    li {
      font-family: "pingfang", sans-serif;
      height: 26vh;
      line-height: 26vh;
      width: 40vw;
      float: left;
      margin-right: 6.8vw;
      margin-bottom: 6.8vw;
      text-align: center;
      background-color: #2ee;
      color: #333;
      font-size: 20px;
    }

    li:nth-of-type(2n) {
      margin-right: 0;
    }

    li:active {
      filter: contrast(0.9) brightness(0.9);
    }
  }
}

.login {

  button {
    width: 80vw;
    height: 60px;
    line-height: 60px;
    margin-top: calc(~'50vh - 30px');
    border: none;
    color: #fff;
    font-size: 20px;
    background-color: #a8e6cf;

    &:active {
      background-color: darken(#a8e6cf, 20%);
    }

    &::after {
      border: 0;
    }
  }
}
</style>
