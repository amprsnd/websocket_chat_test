<template>
  <div v-if="store.history.length > 0">
    <md-toolbar class="md-dense form" :style="{width: width + 'px'}">
      <md-field>
        <label>Write Message here:</label>
        <md-input
          v-model="store.message.text"
          md-autogrow
          @keyup.enter="send()"
        ></md-input>
      </md-field>
      <md-button @click="send()" class="md-icon-button md-raised md-primary">
        <md-icon>send</md-icon>
      </md-button>
    </md-toolbar>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import store from '../store.js'

export default {
  name: 'messageForm',
  data: function () {
    return {
      store: store,
      width: 0
    }
  },
  watch: {
    'store.history': function (v) {
      if (v.length > 0) {
        this.computeWidth()
      }
    }
  },
  mounted: function () {
    window.addEventListener('resize', () => {
      this.computeWidth()
    })
  },
  methods: {
    send: function () {
      if (this.store.message.text.length > 0) {
        this.store.message.type = 'message'
        this.store.ws.send(JSON.stringify(this.store.message))
        this.store.message.text = ''
      }
    },
    computeWidth: function () {
      let msgWidth = document.querySelector('.one-message').offsetWidth
      this.width = msgWidth
    }
  }
}
</script>

<style lang="scss" scopped>
  .form {
    position: fixed;
    bottom: 0;
    z-index: 3;
    width: inherit;

    display: flex;
    flex-direction: row;

    .md-field {
      width: auto;
      flex-grow: 1;
    }
  }
</style>
