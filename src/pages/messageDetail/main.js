import Vue from 'vue'
import Message from './messageDetail'

const app = new Vue(Message)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '我的消息'
  }
}
