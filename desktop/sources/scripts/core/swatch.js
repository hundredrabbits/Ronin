function Swatch () {
  this.index = 0
  this.colors = []

  this.start = function () {
    this.update()
  }

  this.update = function () {
    this.colors = [ronin.theme.active.f_high, ronin.theme.active.f_med, ronin.theme.active.f_low]
  }

  this.swap = function () {
    this.index += 1
  }

  this.color = function (offset = 0) {
    return this.colors[(this.index + offset) % this.colors.length]
  }
}
