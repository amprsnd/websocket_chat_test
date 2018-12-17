<template>
  <div class="one-message">
  <template v-if="message.name === 'system'">
    <div class="system" v-html="`<span>${message.text}</span>`"></div>
  </template>
  <template v-else>
    <div :class="[message.name === store.userName ? 'iAm' : '', 'user']">
      <div class="bubble">
        <span class="name" v-if="message.name !== store.userName">{{message.name}}</span>
        <span class="time" v-html="timestamp"></span>
        <div class="text">{{message.text}}</div>
      </div>
    </div>
  </template>
  </div>
</template>

<script>
import store from '../store.js'

export default {
  name: 'message',
  props: ['message'],
  data: function () {
    return {
      store: store
    }
  },
  computed: {
    timestamp: function () {
      return this.message.time.replace(' ', '&nbsp;')
    }
  }
}
</script>

<style lang="scss">
  .one-message {
    margin: 1rem .25rem .25rem .25rem;
  }
  .system {
    font-size: .75rem;
    color: #448aff;
    text-align: center;

    span {
      display: inline-block;
      background: #fff;
      padding: 5px;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.4);
    }
    b {font-weight: 700;}
  }

  .user {
    box-sizing: border-box;
    padding-right: 1rem;

    .bubble {
      display: inline-block;
      box-sizing: border-box;
      padding: 1rem;
      border-radius: 1rem;
      border-bottom-left-radius: 0;
      box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.4);
      background: #448aff;
      color: #fff;

      .name {
        font-size: .8rem;
        margin-right: .3rem;
        font-weight: 700;
      }

      .time {
        font-size: .7rem;
      }

      .text {
        padding-top: .5rem;
      }
    }

    &.iAm {
      text-align: right;

      .bubble {
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 0;
        background: #ff5252;
        text-align: left;
      }
    }
  }
</style>
