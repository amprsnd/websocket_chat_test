<template>
  <div class="input">
    <input
      v-model="store.message.text"
      @keyup.enter="send()"
      type="text"
      placeholder="Напишите сообщение"
    />
    <button @click="send()" :class="{active : this.store.message.text.length > 0}">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#000"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
  </div>
</template>

<script>
import store from '../store.js'

export default {
  name: 'messageForm',
  data: function () {
    return {
      store: store
    }
  },
  methods: {
    send: function () {
      if (this.store.message.text.length > 0) {
        this.store.message.type = 'message'
        this.store.ws.send(JSON.stringify(this.store.message))
        this.store.message.text = ''
        this.store.mobileMessage = false
      }
    }
  }
}
</script>

<style lang="scss">
  .input {
    display: flex;
    flex-direction: row;
    height: 100%;

    border-top: 1px solid #000;

    input {
      flex-grow: 1;
      box-sizing: border-box;
      padding: 0 1rem;

      border: none;
      border-right: 1px solid #000;
      outline: none;

      font-family: 'Roboto Condensed', sans-serif;
      font-size: 1.2rem;

    }
    button {
      width: 12vh;
      outline: none;
      border: none;

      background: #21897E;

      &.active {
        cursor: pointer;

        svg {
          opacity: 1;
        }
      }

      svg {
        transition: opacity 200ms ease-out;
        margin: 0;
        opacity: .4;
      }
    }
  }
</style>
