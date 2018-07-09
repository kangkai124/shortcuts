<template>
  <div class="container">
    <div class="user-info">
      <h2>
        <img :src="avatar" alt="user avatar">
      </h2>
      <h3>
        <button
          v-if="showLogin"
          class="login"
          open-type="getUserInfo"
          lang="zh_CN"
          @getuserinfo="doLogin">
            登录
        </button>
        <p v-else>{{userInfo.nickName}}</p>
      </h3>
      <h4><img src="../../../static/image/right.png" alt="login"></h4>
    </div>
    <ul class="list">
      <li
        class="list-item"
        v-for="(item, i) in list"
        :key="i">
        <h2><img :src="item.icon" alt="item.text"></h2>
        <h3>{{item.text}}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { showSuccess } from '@/utils'
import { showFail } from '../../utils'
import message from '../../../static/image/message.png'
import like from '../../../static/image/like.png'
import img from '../../../static/image/user.png'

export default {
  data () {
    return {
      showLogin: true,
      avatar: img,
      userInfo: {},
      list: []
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
        { text: '消息中心', link: '', icon: message },
        { text: '我的收藏', link: '', icon: like }
      ]
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
@import '../../styles/variables';

.container {

  .user-info {
    width: 100%;
    height: 80px;
    display: flex;
    background-color: #fff;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      flex: 2;
      width: 60px;
      height: 60px;
      text-align: center;

      img {
        margin-top: 6px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: @border_color;
      }
    }

    h3 {
      flex: 3;

      button {
        border: none;
        text-align: left;
        color: #333;
        font-size: 20px;
        background-color: transparent;

        &:active {
          background-color: transparent;
        }

        &::after {
          border: 0;
        }
      }

      p {
        font-size: 20px;
      }
    }

    h4 {
      flex: 1;
      text-align: center;

      img {
        width: 24px;
        height: 24px;
        margin-top: 10px;
      }
    }
  }

  .list {
    overflow: hidden;
    list-style-type: none;

    li {
      height: 36px;
      display: flex;
      background-color: #fff;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 10px;

      h2 {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        img {
          width: 20px;
          height: 20px;
        }
      }

      h3 {
        flex: 4;
        font-size: 16px;
      }
    }
  }
}
</style>
