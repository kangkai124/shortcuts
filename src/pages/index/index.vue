<template>
  <div class="container">
    <div class="top">
      <div class="fake-input">
        <input
          v-model="text"
          :placeholder="placeholder"
          @input="onTextChange"
          @focus="onTextFocus"
          @blur="onTextBlur" />
      </div>
    </div>
    <div class="list">
      <ListItem
        v-for="item in list"
        :key="item.id"
        :scKey="item.key"
        :content="item.content" />
    </div>
  </div>
</template>
<script>
import { get } from '../../utils'
import ListItem from '../../components/ListItem'

export default {
  data () {
    return {
      pageNum: 1,
      more: true,
      list: [],
      text: '',
      placeholder: '请输入快捷键/功能...'
    }
  },
  components: { ListItem },
  mounted () {
    this.initialSclist()
  },
  onShareAppMessage () {

  },
  onPullDownRefresh () {
    this.initialSclist()
  },
  onReachBottom () {
    if (this.more) {
      this.pageNum = this.pageNum + 1
      this.getShortCutList()
    } else {
      console.log('已经加载全部了...')
    }
  },
  methods: {
    async getShortCutList (init, option) {
      if (init) {
        this.pageNum = 1
        this.more = true
      }
      const list = [...this.list]
      // FIXME  2018-07-03
      // 不把 this.list 置为空数组，之后 this.list = res.data.list 无法更新 ListItem 子组件内容
      this.list = []
      const res = await get('/weapp/list', option || { pageNum: this.pageNum, scKey: this.text })
      if (res.data.list.length < 10 && this.pageNum > 0) this.more = false
      if (init) {
        this.list = res.data.list
      } else {
        this.list = list.concat(res.data.list)
      }
    },
    onTextChange () {
      this.getShortCutList(true)
    },
    onTextFocus () {
      this.placeholder = ''
    },
    onTextBlur () {
      if (this.text === '') this.placeholder = '请输入快捷键/功能...'
    },
    initialSclist () {
      this.text = ''
      this.placeholder = '请输入快捷键/功能...'
      this.getShortCutList(true, { pageNum: 1 })
    }

  }
}
</script>
<style lang="less">
  @import '../../styles/variables';
  .container {
    padding-top: 0;

    .top {
      padding: 10px 0;
      line-height: 40px;
      background-color: #ededee;
      // border-bottom: 1px solid #333;

      .fake-input {
        width: 90%;
        margin: 0 auto;
        border: @base_border;
        border-radius: 6px;
        font-size: 12px;
        background: url(../../../static/image/search.png) #fff no-repeat;
        background-position: 18px center;
        background-size: 18px;

        input {
          width: 80%;
          margin: 0 auto;
          text-align: center;
        }
      }
    }

    .list {
      overflow: hidden;
      background-color: @background_color;
    }
  }
</style>
