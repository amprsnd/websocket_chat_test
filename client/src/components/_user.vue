<template>
  <md-list-item :class="{iAm : user === store.userName}">
    <md-avatar class="md-avatar-icon md-accent">{{avatar}}</md-avatar>
    <template v-if="!editUser">
      <span class="md-list-item-text">{{user}}</span>
    </template>
    <md-field v-else :class="{'md-invalid' : errors.items.length > 0}">
      <md-input
        @keyup.enter="updateUserName()"
        v-model="name"
        v-validate="{ min: 3, required: true, regex: /[a-zA-Z\s_]$/ }"
        maxlength="16"
        md-counter="16"
        name="Name"
      ></md-input>
      <span class="md-error"><br>3-16 chars,only a-z, _ and space</span>
    </md-field>

    <md-button
      v-if="user === store.userName && !editUser"
      @click="editUser = !editUser"
      class="md-icon-button md-list-action"
    >
      <md-icon class="md-primary">edit</md-icon>
    </md-button>
    <md-button
      v-if="user !== store.userName && !editUser"
      @click="sayTo(user)"
      class="md-icon-button md-list-action"
    >
      <md-icon class="md-primary">chat_bubble</md-icon>
    </md-button>

  </md-list-item>
</template>

<script>
import store from '../store.js'

export default {
  name: 'user',
  props: ['user'],
  data: function () {
    return {
      store: store,
      name: '',
      editUser: false
    }
  },
  beforeMount: function () {
    this.name = this.user
  },
  computed: {
    avatar: function () {
      return this.user[0]
    }
  },
  methods: {
    sayTo: function (name) {
      if (store.message.text.substr(0, name.length) !== name) {
        store.message.text = `${name}, ${store.message.text}`
      }
      document.querySelector('.form input').focus()
    },
    updateUserName: function () {
      if (this.errors.items.length > 0) {

      } else {
        let message = {
          type: 'update',
          name: this.user,
          text: this.name
        }
        localStorage.setItem('userName', this.name)
        this.store.userName = this.name
        this.store.ws.send(JSON.stringify(message))
        this.editUser = !this.editUser
      }
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
</style>
