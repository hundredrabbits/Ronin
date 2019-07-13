function Surface (ronin) {
  this.el = document.createElement('canvas')
  this.el.id = 'surface'
  this.ratio = window.devicePixelRatio
  this.context = this.el.getContext('2d')

  this.guides = []

  this.install = function (host) {
    host.appendChild(this.el)
    window.addEventListener('resize', (e) => { this.onResize() }, false)
  }

  this.start = function () {
    this.maximize()
    console.log('Surface', `Ratio:${this.ratio}`)
  }

  this.update = function () {
    for (const id in this.guides) {
      // this.drawRect(this.guides[id])
    }
  }

  this.stroke = (rect, width, color) => {
    this.context.beginPath()
    this.context.moveTo(rect.x, rect.y)
    this.context.lineTo(rect.x + rect.w, rect.y)
    this.context.lineTo(rect.x + rect.w, rect.y + rect.h)
    this.context.lineTo(rect.x, rect.y + rect.h)
    this.context.lineTo(rect.x, rect.y)
    this.context.lineWidth = width
    this.context.strokeStyle = color
    this.context.stroke()
    this.context.closePath()
  }

  this.fill = (rect, color) => {
    this.context.beginPath()
    this.context.moveTo(rect.x, rect.y)
    this.context.lineTo(rect.x + rect.w, rect.y)
    this.context.lineTo(rect.x + rect.w, rect.y + rect.h)
    this.context.lineTo(rect.x, rect.y + rect.h)
    this.context.lineTo(rect.x, rect.y)
    this.context.fillStyle = color
    this.context.fill()
    this.context.closePath()
  }

  this.clear = function (rect = this.getRect()) {
    this.context.clearRect(rect.x, rect.y, rect.w, rect.h)
  }

  this.clone = function (a, b) {
    this.context.drawImage(this.el, a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h)
  }

  this.addGuide = function (rect) {
    this.guides.push(rect)
    this.update()
  }

  this.resize = function (size) {
    this.el.width = size.w
    this.el.height = size.h
    this.el.style.width = size.w + 'px'
    this.el.style.height = size.h + 'px'
  }

  this.maximize = function () {
    this.resize(this.getRect())
  }

  this.onResize = function () {
    this.maximize()
  }

  this.getRect = function () {
    return { x: 0, y: 0, w: Math.floor(window.innerWidth / 2) - 30, h: Math.floor(window.innerHeight) - 60 }
  }
}
