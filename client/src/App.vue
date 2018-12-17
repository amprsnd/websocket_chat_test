<template>
  <div id="app" class="page-container md-elevation-5">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary md-elevation-5">
        <span class="md-title" style="flex: 1;">Chat App</span>
        <div class="userInfo">
          <span>{{store.userName}}</span>
          <md-avatar class="md-avatar-icon md-accent">
            <md-icon>person</md-icon>
          </md-avatar>
        </div>
      </md-app-toolbar>

      <md-app-drawer class="md-elevation-7" md-permanent="clipped">
        <md-toolbar class="md-transparent" md-elevation="0">
          Users list
        </md-toolbar>

        <md-list>
          <user v-for="(user, index) in store.usersList" :key="index" :user="user" />
        </md-list>
      </md-app-drawer>

      <md-app-content class="messages">
        <message v-for="(message, index) in store.history" :key="index" :message="message" />
        <message-form />
        <div id="lastMessage"></div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Faker from 'faker'
import store from './store.js'

import user from './components/_user'
import message from './components/_message'
import messageForm from './components/_form'

export default {
  name: 'app',
  components: {
    user,
    message,
    messageForm
  },
  data: function () {
    return {
      store: store,
      menuVisible: false
    }
  },
  watch: {
    'store.history': function () {
      this.scrollToLastMessage()
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
        this.scrollToLastMessage()
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
    },
    scrollToLastMessage: function () {
      location.hash = 'lastMessage'
      location.hash = ''
    }
  }
}
</script>

<style lang="scss">
  @import url('//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
  @import 'reset-css';

  body {
    // overflow: hidden;
    font-size: 16px;
  }

  #app {
    font-family: 'Roboto Condensed', sans-serif;
    width: 100%;
    max-width: 1200px;
    min-width: 340px;
    margin: 0 auto;

    .md-app {
      height: 100vh;
    }

    .userInfo {
      span {
        vertical-align: middle;
        margin-right: 1rem;
      }
    }

    .messages {
      height: auto !important;
      background: url('/images/bg2.jpg') 50% 50% no-repeat fixed;
      background-size: cover;
      min-height: 100%;
      overflow: hidden;
    }

    #lastMessage {
      height: 72px;
      position: relative;
      top: 36px;
    }

    .md-drawer {
      width: auto;
    }
  }
</style>
