import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'usingComponents': {
      'i-input': '/iview/input/index'
    },
    // enablePullDownRefresh: true,
    onReachBottomDistance: 20
  }
}
