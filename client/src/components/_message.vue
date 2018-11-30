<template>
  <div class="one-message">
  <template v-if="message.name === 'system'">
    <div class="system" v-html="message.text"></div>
  </template>
  <template v-else>
    <div :class="[message.name === store.userName ? 'iAm' : '', 'user']">
      <div class="bubble">
        <span class="name" v-if="message.name !== store.userName">{{message.name}}</span>
        <span class="time">{{message.time}}</span>
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
  }
}
</script>

<style lang="scss">
  .one-message {
    margin: .25rem;
  }
  .system {
    font-size: .75rem;
    color: #777;
    text-align: center;

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
      background: #777;

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
        background: #fff;
        border: 1px solid #777;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 0;

        text-align: left;
      }
    }
  }
</style>
