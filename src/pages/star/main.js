import Vue from 'vue'
import Star from './star'

const app = new Vue(Star)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '我的收藏',
    enablePullDownRefresh: true
  }
}
