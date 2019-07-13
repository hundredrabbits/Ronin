function Surface () {
  this.el = document.createElement('canvas')
  this.el.id = 'surface'

  this.install = function (host) {
    host.appendChild(this.el)
  }

  this.start = function () {

  }

  this.update = function () {

  }
}
