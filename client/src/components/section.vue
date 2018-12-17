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
      // TODO: add scroll
      // this.$refs['messages'].scrollTo({ y: '120%' })
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
</style>
