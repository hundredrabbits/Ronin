function Surface (ronin) {
  this.el = document.createElement('canvas')
  this.el.id = 'surface'
  this.ratio = window.devicePixelRatio
  this.context = this.el.getContext('2d')

  this.install = function (host) {
    host.appendChild(this.el)
    window.addEventListener('resize', (e) => { this.onResize() }, false)

    this.el.addEventListener('mousedown', ronin.commander.onMouseDown, false)
    this.el.addEventListener('mousemove', ronin.commander.onMouseMove, false)
    this.el.addEventListener('mouseup', ronin.commander.onMouseUp, false)
  }

  this.start = function () {
    this.maximize()
    console.log('Surface', `Ratio:${this.ratio}`)
  }

  this.update = function () {

  }

  // Shape

  this.stroke = (shape, width, color) => {
    if (shape.t === 'rect') {
      this.strokeRect(shape, width, color)
    } else if (shape.t === 'line') {
      this.strokeLine(shape, width, color)
    } else {
      console.warn('Unknown type')
    }
  }

  this.strokeRect = (rect, width, color) => {
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

  this.strokeLine = function (line, width, color) {
    this.context.beginPath()
    this.context.moveTo(line.a.x, line.a.y)
    this.context.lineTo(line.b.x, line.b.y)
    this.context.lineWidth = width
    this.context.strokeStyle = color
    this.context.stroke()
    this.context.closePath()
  }

  // Fill

  this.fill = (shape, color) => {
    if (shape.t === 'rect') {
      this.fillRect(shape, color)
    } else {
      console.warn('Unknown type')
    }
  }

  this.fillRect = (rect, color) => {
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

  // IO

  this.open = function (path, scale) {
    const img = new Image()
    img.src = path
    img.onload = () => {
      ronin.log(`Image(${img.width}x${img.height}), scale:${scale.w}:${scale.h}`)
      this.resize({ w: img.width * scale.w, h: img.height * scale.h })
      this.context.drawImage(img, 0, 0, img.width * scale.w, img.height * scale.h)
    }
  }

  this.draw = function (path, rect = this.getFrame()) {
    const img = new Image()
    img.src = path
    img.onload = () => {
      const ratio = img.width / img.height
      const scale = rect.w / img.width
      this.context.drawImage(img, rect.x, rect.y, rect.w, img.height * scale)
    }
  }

  this.clear = function (rect = this.getFrame()) {
    this.context.clearRect(rect.x, rect.y, rect.w, rect.h)
  }

  this.clone = function (a, b) {
    this.context.drawImage(this.el, a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h)
  }

  this.resize = function (size) {
    this.el.width = size.w
    this.el.height = size.h
    this.el.style.width = size.w + 'px'
    this.el.style.height = size.h + 'px'
  }

  this.maximize = function () {
    this.resize(this.getFrame())
  }

  this.onResize = function () {
    if (ronin.commander._input.value === '') {
      this.maximize()
    }
  }

  this.getFrame = function () {
    return { x: 0, y: 0, w: window.innerWidth - 60, h: window.innerHeight - 60, t: 'rect' }
  }
}
