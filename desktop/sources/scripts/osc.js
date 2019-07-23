'use strict'

function Osc (ronin) {
  const osc = require('node-osc')
  this.port = 49162

  this.start = function () {
    const server = new osc.Server(49162, '0.0.0.0')
    server.on('message', this.onMsg)
  }

  this.onMsg = (msg) => {
    const address = msg.shift()
    if (ronin.bindings[address]) {
      ronin.bindings[address](msg)
    }
  }
}
