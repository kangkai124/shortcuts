<template>
  <div>
    <!-- 数字键 -->
    <ul class="number-keys">
      <li :key="i" v-for="(key, i) in numberKeys" v-text="key" @click="clickKey(key)"></li>
    </ul>
    <!-- 符号键 -->
    <ul class="punctuation-keys">
      <li :key="i" v-for="(key, i) in punctuationKeys" v-text="key" @click="clickKey(key)"></li>
    </ul>
    <!-- 字母键 + Backspace -->
    <ul class="alphabet-keys">
      <ul class="alphabet" :key="index" v-for="(list, index) in alphabetKeys">
        <li class="test" :key="i" v-for="(key, i) in list" v-text="key" @click="clickKey(key)"></li>
      </ul>
      <aside class="switch" @click="switchMode">
        <img v-if="normal" src="../../static/image/shift_color.png" />
        <img v-else src="../../static/image/shift_colored.png" />
      </aside>
      <aside class="delete" @click="deleteWord">
        <img src="../../static/image/backspace_color.png" />
      </aside>
    </ul>
    <!-- 控制键 -->
    <ul class="control-keys">
      <li :key="i" v-for="(key, i) in winControlKeys" v-text="key" @click="clickKey(key)"></li>
    </ul>
    <!-- F键 -->
    <ul class="function-keys">
      <li :key="i" v-for="(key, i) in functionKeys" v-text="key" @click="clickKey(key)"></li>
    </ul>
    <!-- 计算键 -->
    <ul class="function-keys">
      <li :key="i" v-for="(key, i) in computeKeys" v-text="key" @click="clickKey(key)"></li>
    </ul>
  </div>
</template>
<script>
  import * as keyboard from '../utils/keyboard'
  export default {
    props: ['text'],
    data () {
      return {
        numberKeys: [],
        punctuationKeys: [],
        computeKeys: [],
        alphabetKeys: [],
        functionKeys: [],
        winControlKeys: [],
        macControlKeys: [],
        hasShifted: false,
        hasCapsed: false,
        normal: true
      }
    },
    methods: {
      clickKey (key) {
        let text = this.text
        if (text.length > 0 && key === '+') {
          text += '+(' + key.toString() + ')'
        } else if (text.length > 0) {
          const newText = '+' + key.toString()
          text += newText
        } else {
          text += key.toString()
        }
        if (key === '+') {

        }
        this.$emit('on-change', text)
      },
      deleteWord () {
        let text = this.text
        if (text.length > 0) {
          const index = text.lastIndexOf('+')
          if (index > -1 && text[index - 1] === '(') {
            const subText = text.substring(0, index - 1)
            const realIndex = subText.lastIndexOf('+')
            text = subText.substring(0, realIndex)
          } else if (index > -1) {
            text = text.substring(0, index)
          } else {
            text = ''
          }
        }
        // newText = newText.length ? newText.substring(0, newText.length - 1) : newText
        this.$emit('on-change', text)
      },
      switchMode () {
        if (this.normal) {
          this.wiredMode()
        } else {
          this.normalMode()
        }
      },
      normalMode () {
        this.numberKeys = keyboard.numberKeys
        this.alphabetKeys = keyboard.alphabetKeys
        this.punctuationKeys = keyboard.punctuationKeys
        this.normal = true
      },
      wiredMode () {
        this.numberKeys = keyboard.tableKeys
        this.alphabetKeys = keyboard.bigAlphabetKeys
        this.punctuationKeys = keyboard.subPunctuationKeys
        this.normal = false
      }
    },
    created () {
      this.normalMode()
      this.computeKeys = keyboard.computeKeys
      this.functionKeys = keyboard.functionKeys
      this.winControlKeys = keyboard.winControlKeys
      this.macControlKeys = keyboard.macControlKeys
    }
  }
</script>
<style lang="less" scoped>
@import '../styles/variables';
.keyboard {
	width: 100%;
	margin: 0;
	padding: 0;
	list-style: none;
	user-select: none;

	.tab, .delete {
		width: 70px;
	}
	.capslock {
		width: 80px;
	}
	.enter {
		width: 77px;
	}
	.shift {
		width: 102px;
	}
	.space {
		clear: left;
		width: 681px;
	}
	.shifted {
		position: relative;
		top: 1px;
		left: 1px;
		border-color: #e5e5e5;
		cursor: pointer;
	}
	.capsed {
		position: relative;
		top: 1px;
		left: 1px;
		border-color: #e5e5e5;
		cursor: pointer;
	}
}
ul {
  overflow: hidden;
  text-align: center;
}
li {
		display: inline-block;
		margin: 0 2px 2px 0;
		width: 32px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		background: #fff;
		border: 1px solid #e5e5e5;
		border-radius: 4px;
		&:active {
			border-color: #999;
    }
  }
li:last-child {
  margin-right: 0;
}

// F键
.function-keys {
  float: left;
  width: 220rpx;
  overflow: hidden;
  font-size: 14px;
  margin: 10px 0;
}

// 控制键
.control-keys {
  float: left;
  width: 280rpx;
  text-align: left;
  overflow: hidden;
  font-size: 14px;
  margin: 10px 0;
  li {
    width: 66px;
    text-align: center;
  }

  li:nth-of-type(1) {
    width: 50px;
  }
  li:nth-of-type(2) {
    width: 80px;
  }
  li:nth-of-type(4) {
    width: 40px;
    height: 104px;
    line-height: 100px;
    float: right;
  }
  li:nth-of-type(5) {
    width: 80px;
  }
  li:nth-of-type(6) {
    width: 90px;
  }
}

// 符号键
.punctuation-keys {
  margin: 10px 0;
}

// 字母键
.alphabet-keys {
  position: relative;

  .alphabet:last-child li:first-child {
    width: 50px;
    border: 1px solid #999;
  }
  .alphabet:last-child li:last-child {
    width: 50px;
    border: 1px solid #999;
  }
  aside {
    width: 50px;
    height: 32px;
    margin: 0 2px 2px 0;
    text-align: center;
		background: #fff;
		// border: 1px solid #e5e5e5;
		border: 1px solid rgba(252, 81, 133, 0.706);
		border-radius: 4px;
    position: absolute;
    bottom: 0;
    right: 4px;
		&:active {
			// border-color: #999;
			border-color: #d4237a;
    }
    img {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin-top: 6px;
      vertical-align: bottom;
    }
  }

  .switch {
    left: 4px;
    border-color: #95e1d3;
    &:active {
      border-color: #61c0bf;
    }
  }
}


</style>
