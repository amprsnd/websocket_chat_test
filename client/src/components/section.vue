<template>
  <section>
    <div class="messages">
      <message  v-for="(message, index) in store.history" :key="index" :message="message" />
    </div>
    <div class="form">
      <message-form />
    </div>
  </section>
</template>

<script>
import store from '../store.js'

import message from './_message'
import messageForm from './_form'

export default {
  name: 'sectionComponent',
  components: {
    message,
    messageForm
  },
  data: function () {
    return {
      store: store
    }
  },
  watch: {
    'store.history': function (v) {
      this.scrollChat()
    }
  },
  mounted: function () {
    this.scrollChat()
  },
  methods: {
    scrollChat () {
      this.$refs['messages'].scrollTo({ y: '120%' })
    }
  }
}
</script>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    box-sizing: border-box;

    .messages {
      height: 80vh;
      overflow: hidden;
      box-sizing: border-box;
      padding-left: 1rem;
    }
    .form {
      height: 10vh;
    }
  }

  @media only screen
  and (max-device-width: 768px) {
    .messages {
      height: calc(100vh - 3rem);
      padding: 0 0 5rem 0;
    }
    .form {
      position: absolute;
      z-index: 5;
      width: 80%;
      height: 10rem !important;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.4);

      box-sizing: border-box;
      padding: 1rem;

      &.mobile-hide {
        display: none;
      }
      &.mobile-show {
        display: block;
      }
    }
  }

</style>
