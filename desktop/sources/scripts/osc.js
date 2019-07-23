'use strict'

function Osc (ronin) {
  const osc = require('node-osc')

  this.msg = {}

  this.start = function () {

    const udpPort = new osc.Server(
      49162,
      '0.0.0.0'
    )

    udpPort.on('message', this.onMsg)
    ronin.log('OSC', 'Started.')
  }

  this.onMsg = (msg, timeTag, info) => {
    if (ronin.bindings[msg.address]) {
      ronin.bindings[msg.address](msg.args)
    }
  }
}
