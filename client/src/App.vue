<template>
  <div id="app">
    <header-component />
    <div class="chat">
      <sidebar-component />
      <section-component />
    </div>
  </div>
</template>

<script>
import Faker from 'faker'
import store from './store.js'

import headerComponent from './components/header'
import sidebarComponent from './components/sidebar'
import sectionComponent from './components/section'

export default {
  name: 'app',
  components: {
    headerComponent,
    sidebarComponent,
    sectionComponent
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
      this.store.ws.onmessage = (event) => {
        // get data
        let data = JSON.parse(event.data)
        this.store.usersList = data.users
        this.store.history = data.history
      }

      this.store.ws.onclose = (event) => {
        if (event.wasClean) {
          // close clean
        } else {
          // Bad...
        }
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
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&subset=cyrillic');
  @import 'reset-css';

  body {
    overflow: hidden;
    font-size: 16px;
  }

  #app {
    font-family: 'Roboto Condensed', sans-serif;
    width: 100%;
    max-width: 1200px;
    min-width: 340px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;

    display: flex;
    flex-direction: column;

    border-left: 1px solid #000;
    border-right: 1px solid #000;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
  }

  .chat {
    display: flex;
    flex-direction: row;
  }

</style>
