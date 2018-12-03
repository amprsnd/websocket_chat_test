<template>
  <div class="mobile">
    <button class="users" @click="showUsers()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"/>
      </svg>
    </button>
    <button class="message" @click="showForm()">
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
  name: 'mobile',
  data () {
    return {
      store: store
    }
  },
  methods: {
    showForm () {
      this.store.mobileMessage = !this.store.mobileMessage
    },
    showUsers () {
      this.store.mobileUsers = !this.store.mobileUsers
    }
  }
}
</script>

<style lang="scss">
  .mobile {
    display: none;
    position: absolute;
    right: .5rem;
    bottom: .5rem;

    button {
      border: none;
      width: 3rem;
      height: 3rem;
      border-radius: 1.5rem;
      display: inline-block;
      margin-left: .5rem;
      vertical-align: middle;
      background: #21897E;
      box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.4);

      svg {
        margin: 0 auto;
      }
    }
  }

  @media only screen
  and (max-device-width: 768px) {
    .mobile {
      display: block !important;
    }
  }
</style>
