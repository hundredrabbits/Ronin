'use strict'

function Osc (ronin) {
    const osc = require('osc')

    this.oscMsg = {}

    this.start = function () {
        var udpPort = new osc.UDPPort({
            localAddress: "0.0.0.0",
            localPort: 12940,
            metadata: true
        });

        udpPort.on("message", this.onOscMsg)

        udpPort.open();
        ronin.log("osc started")
    }

    this.onOscMsg = (oscMsg, timeTag, info) => {
      this.oscMsg[oscMsg.address] = oscMsg;
      ronin.log("An OSC message just arrived!", oscMsg)
      ronin.log("Remote info is: ", info);
    }
}
