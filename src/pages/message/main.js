import Vue from 'vue'
import Message from './message'

const app = new Vue(Message)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '我的消息'
  }
}
