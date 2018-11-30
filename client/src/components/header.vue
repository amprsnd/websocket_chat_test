<template>
  <header class="template">
    <div class="avatar">{{avatar}}</div>
    <div class="name">{{store.userName}}</div>
    <button @click="edit()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
  </header>
</template>

<script>
import store from '../store.js'

export default {
  name: 'headerComponent',
  data: function () {
    return {
      store: store
    }
  },
  computed: {
    avatar: function () {
      return store.userName[0]
    }
  },
  methods: {
    edit: function () {
      alert('В разработке...')
    }
  }
}
</script>

<style lang="scss">
  header.template {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 10vh;
    border-bottom: 1px solid #000;

    .avatar {
      width: 8vh;
      height: 8vh;
      line-height: 8vh;
      background: #999;
      text-align: center;
      border-radius: 50%;
      font-size: 2.5rem;
      margin: 1rem;
    }

    .name {
      font-size: 2rem;
      margin-right: 0.5rem;
    }

    button {
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
    }

  }
</style>
