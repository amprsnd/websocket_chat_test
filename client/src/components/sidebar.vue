<template>
  <aside class="template">
    <vue-scroll :ops="store.scroll">
      <ul>
        <user v-for="(user, index) in store.usersList" :key="index" :user="user" />
      </ul>
    </vue-scroll>
  </aside>
</template>

<script>
import store from '../store.js'

import user from './_user'

export default {
  name: 'sidebarComponent',
  components: {
    user
  },
  data: function () {
    return {
      store: store
    }
  }
}
</script>

<style lang="scss">
 aside.template {
  position: relative;
  z-index: 9;

  min-width: 10rem;
  box-sizing: border-box;

  border-right: 1px solid black;
  box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.75);

  ul {
    padding: 1rem;
  }
 }

</style>
