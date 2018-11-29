<template>
  <div id="app">
    Chat App
  </div>
</template>

<script>
import Faker from 'faker'
import store from './store.js'

export default {
  name: 'app',
  components: {
  },
  data: function () {
    return {
      store: store
    }
  },
  mounted: function () {
    this.initWS()
  },
  methods: {
    initWS () {
      this.store.ws = new WebSocket(this.store.server)

      this.store.ws.onopen = () => {
        // Open connection
        // Set Name
        this.store.message.type = 'new'
        this.store.message.name = this.setUserName()
        this.store.ws.send(JSON.stringify(this.store.message))
      }

      this.store.ws.onclose = (event) => {
        if (event.wasClean) {
          // close clean
        } else {
          // Bad...
        }
      }
      this.store.ws.onmessage = (event) => {
        // get data
        console.log(event)
        let data = JSON.parse(event.data)
        this.store.usersList = data.users
        this.store.history = data.history
      }
      this.store.ws.onerror = (error) => {
        // error
        console.log(error)
      }
    },
    setUserName () {
      if (localStorage.getItem('userName') === null) {
        localStorage.setItem('userName', Faker.internet.userName())
      }
      this.store.userName = localStorage.getItem('userName')
      return this.store.userName
    }
  }
}
</script>

<style lang="scss">
</style>
