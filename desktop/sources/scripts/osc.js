'use strict'

function Osc (ronin) {
  const osc = require('osc')

  this.msg = {}

  this.start = function () {
    const udpPort = new osc.UDPPort({
      localAddress: '0.0.0.0',
      localPort: 49162,
      metadata: true
    })
    udpPort.on('message', this.onMsg)
    udpPort.open()
    ronin.log('OSC','Started.')
  }

  this.onMsg = (msg, timeTag, info) => {
    this.msg[msg.address] = msg.args
    // ronin.log(`${info.address}:${info.port} > ${msg.args}`, info)
  }
}
