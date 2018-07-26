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
      <h3>
        <p>{{userInfo.nickName}}</p>
      </h3>
    </div>
    <ul class="list">
      <li
        class="list-item"
        :style="{ background: colors[i] }"
        @click="navigate(item.link)"
        v-for="(item, i) in list"
        :key="i">
        <!-- <h2><img :src="item.icon" alt="item.text"></h2> -->
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
import message from '../../../static/image/message.png'
import like from '../../../static/image/like.png'
// #a8e6cf
export default {
  data () {
    return {
      showLogin: true,
      avatar: '',
      userInfo: {},
      list: [],
      colors: ['rgba(168, 230, 207, 0.474)', 'rgba(168, 230, 207, 0.774)', '#a8e6cf', '#a8e7df']
    }
  },
  mounted () {
    this.checkLogin()
    this.genList()
    wx.setNavigationBarTitle({ title: '个人中心' })
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
        { text: '消息中心', link: '/pages/message/main', icon: message },
        { text: '我的收藏', link: '/pages/star/main', icon: like },
        { text: '关于我们', link: '/pages/star/main', icon: like },
        { text: '意见反馈', link: '/pages/star/main', icon: like }
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
  // background: #a8e6cf;

  .user-info {
    width: 100%;
    height: 30vh;

    h2 {
      width: 100%;
      height: 18vh;
      text-align: center;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }

    h3 {
      width: 100%;
      height: 12vh;
      line-height: 12vh;
      text-align: center;
      font-size: 30px;

      p {
        font-size: 20px;
      }
    }
  }

  .list {
    width: 100%;
    height: 70vh;
    overflow: hidden;
    list-style-type: none;

    li {
      font-family: "pingfang", sans-serif;
      height: 26vh;
      line-height: 26vh;
      width: 40vw;
      float: left;
      margin: 20px 5vw;
      text-align: center;
      background-color: #2ee;
      color: #333;
      font-size: 20px;
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
