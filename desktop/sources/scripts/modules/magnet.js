function Magnet () {
  Module.call(this, 'magnet', 'Cursor magnetisation settings, changes are reflected on the grid layer.')

  this.size = 0
  this.step = 4

  this.methods.lock = new Method('lock', '10', 'Magnetize cursor', function (q) {
    var size = parseInt(q)
    if (size < 5) { this.unlock(); return }
    ronin.magnet.size = size
    ronin.grid.draw(size, ronin.magnet.step)
  })

  this.methods.unlock = new Method('unlock', '', 'Release cursor', function (q) {
    ronin.magnet.size = 0
    ronin.grid.clear()
  })

  this.filter = function (pos) {
    if (this.size < 5) {
      return pos
    }

    var s = this.size
    return { x: parseInt(pos.x / s) * s, y: parseInt(pos.y / s) * s }
  }
}
