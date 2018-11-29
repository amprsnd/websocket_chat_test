(function () {
  'use strict'
  
  log('Starting server')

  let config = {
    server: {
      port: 3000
    },
    client: {
      protocol: 'http',
      host: 'localhost',
      port: 8080
    },
    historyLength: 100
  }
  
  const WebSocket = require('ws')
  const wss = new WebSocket.Server({ port: config.server.port })

  let data = {
    users: [],
    history: []
  }
 
  // Connection
  wss.on('connection', function connection(ws) {
    let userName = ''

    // Get Message
    ws.on('message', function incoming(message) {
      let msg = JSON.parse(message)
      console.dir(msg)

      switch(msg.type) {
        // New user
        case 'new':
          userName = msg.name
          let newMsg = {
            name: 'system',
            time: timestamp(),
            text: `В чат зашёл новый пользователь с именем <b>${userName}</b>.`
          }
          data.users.push(userName)
          data.history.push(newMsg)
          break
        // User update name
        case 'update':
          let updateMsg = {
            name: 'system',
            time: timestamp(),
            text: `<b>${userName}</b> сменил имя на <b>${msg.name}</b>.`
          }
          userName = msg.name
          data.users.push(userName)
          data.history.push(updateMsg)
          break
        // User send message
        case 'message':
          data.history.push(msg)
          break
      }

      // Send data for all
      wss.broadcast(data)
    })

    // Close connection
    ws.on('close', function close() {
      log('User disconnected')
      
      let outMsg = {
        name: 'system',
        time: timestamp(),
        text: `<b>${userName}</b> покинул чат.`
      }

      let index = data.users.indexOf(userName)
      if (index > -1) {
        data.users.splice(index, 1)
      }

      data.history.push(outMsg)
      wss.broadcast(data)
    })
  })
  
  // Helpers

  wss.broadcast = function broadcast(data) {
    // check history limit
    if (data.history.length === config.historyLength) {
      data.history.shift()
    }

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  }

  function timestamp () {
    let d = new Date()
    let day = format(d.getDate())
    let month = format(d.getMonth() + 1)
    let year = format(d.getFullYear())
    let hours = format(d.getHours())
    let minutes = format(d.getMinutes())
    let seconds = format(d.getSeconds())
    let date = `${day}.${month}.${year}`
    let time = `${hours}:${minutes}:${seconds}`
    return `${date}, ${time}`
  }

  function format(n) {
    if (n.length < 2) {
      n = '0' + n
    }
    return n
  }

  function log (msg) {
    console.log(`${timestamp()} >> ${msg}`)
  }
}())
