import Vue from 'vue'
import App from './card.vue'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '卡片浏览'
  }
}
