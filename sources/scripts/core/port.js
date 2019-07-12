function Port (host, name, input, output, value, max, docs) {
  this.host = host

  this.name = name
  this.input = input
  this.output = output
  this.value = value
  this.max = max
  this.docs = docs

  this.write = function (value) {
    this.value = value
    var target = this.host.routes[this.name]

    if (!this.output) { return }
    if (!target) { console.log('No output for', this.name); return }

    this.host.ports[target].write(this.value)
  }
}
