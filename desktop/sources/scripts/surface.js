function Surface (ronin) {
  this.el = document.createElement('canvas')
  this.el.id = 'surface'
  this.ratio = window.devicePixelRatio

  this.install = function (host) {
    host.appendChild(this.el)
    window.addEventListener('resize', (e) => { this.onResize() }, false)
  }

  this.start = function () {
    this.maximize()
    console.log('Surface', `Ratio:${this.ratio}`)
  }

  this.update = function () {

  }

  this.resize = function (size) {
    this.el.width = size.w
    this.el.height = size.h
    this.el.style.width = size.w + 'px'
    this.el.style.height = size.h + 'px'
  }

  this.maximize = function () {
    const size = { w: Math.floor(window.innerWidth / 2) - 15, h: Math.floor(window.innerHeight) - 30 }
    this.resize(size)
  }

  this.onResize = function () {
    this.maximize()
  }
}
