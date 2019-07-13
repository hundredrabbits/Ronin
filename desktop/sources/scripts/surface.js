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
      this.drawRect(this.guides[id])
    }
  }

  this.drawRect = function (u) {
    console.log(u)
    u.x = !u.x ? 0 : u.x
    u.y = !u.y ? 0 : u.y

    var offset = { x: u.x * 2, y: u.y * 2 }
    var rect = { w: u.w * 2, h: u.h * 2 }

    // Outline

    this.context.beginPath()
    this.context.moveTo(offset.x, offset.y)
    this.context.lineTo(offset.x + rect.w, offset.y)
    this.context.lineTo(offset.x + rect.w, offset.y + rect.h)
    this.context.lineTo(offset.x, offset.y + rect.h)
    this.context.lineTo(offset.x, offset.y)
    this.context.lineCap = 'round'
    this.context.lineWidth = 2
    this.context.strokeStyle = '#f00'
    this.context.stroke()
    this.context.closePath()
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
    return { x: 0, y: 0, w: Math.floor(window.innerWidth / 2) - 15, h: Math.floor(window.innerHeight) - 30 }
  }
}
