<template>
    <li :class="{iAm : user === store.userName}">
      <span class="avatar">{{avatar(user)}}</span>&nbsp;{{user}}
    </li>
</template>

<script>
import store from '../store.js'

export default {
  name: 'user',
  props: ['user'],
  data: function () {
    return {
      store: store
    }
  },
  methods: {
    avatar: function (u) {
      return u[0]
    }
  }
}
</script>

<style lang="scss">
  .avatar {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    background: #999;
    text-align: center;
    border-radius: 50%;
    font-size: 1rem;
    margin: 0 1rem .5rem 0;
  }
  li {
    &.iAm {
      font-weight: bold;
    }
  }
</style>
