function Surface (ronin) {
  this.el = document.createElement('canvas')
  this.el.id = 'surface'
  this._guide = document.createElement('canvas')
  this._guide.id = 'guide'
  this.ratio = window.devicePixelRatio
  this.context = this.el.getContext('2d')
  this.guide = this.el.getContext('2d')

  this.install = function (host) {
    host.appendChild(this.el)
    host.appendChild(this._guide)
    window.addEventListener('resize', (e) => { this.onResize() }, false)
    this._guide.addEventListener('mousedown', ronin.commander.onMouseDown, false)
    this._guide.addEventListener('mousemove', ronin.commander.onMouseMove, false)
    this._guide.addEventListener('mouseup', ronin.commander.onMouseUp, false)
  }

  this.start = function () {
    this.maximize()
    console.log('Surface', `Ratio:${this.ratio}`)
  }

  this.update = function () {

  }

  this.select = function (rect) {
    const img = this.context.getImageData(rect.x, rect.y, rect.w, rect.h)
    const pixels = []
    for (let i = 0, loop = img.data.length; i < loop; i += 4) {
      pixels.push({ r: img.data[i], g: img.data[i + 1], b: img.data[i + 2], a: img.data[i + 3] })
    }
    return pixels
  }

  // Shape

  this.stroke = (shape, width, color, context = this.context) => {
    context.beginPath()
    this.trace(shape, context)
    context.lineWidth = width
    context.strokeStyle = color
    if (shape.t === 'text') {
      context.font = `${shape.g}px ${shape.f}`
      context.strokeText(shape.s, shape.x, shape.y)
    } else if (shape.t === 'svg') {
      context.lineWidth = width
      context.strokeStyle = color
      context.stroke(new Path2D(shape.d))
    } else {
      context.stroke()
    }
    context.closePath()
  }

  // Fill

  this.fill = (shape, color, context = this.context) => {
    context.beginPath()
    context.fillStyle = color
    this.trace(shape, context)
    if (shape.t === 'text') {
      context.font = `${shape.g}px ${shape.f}`
      context.fillText(shape.s, shape.x, shape.y)
    } else if (shape.t === 'svg') {
      context.lineWidth = width
      context.fillStyle = color
      context.fill(new Path2D(shape.d))
    } else {
      context.fill()
    }
    context.closePath()
  }

  // Tracers

  this.trace = function (shape, context) {
    if (shape.t === 'rect') {
      this.traceRect(shape, context)
    } else if (shape.t === 'line') {
      this.traceLine(shape, context)
    } else if (shape.t === 'circle') {
      this.traceCircle(shape, context)
    } else if (shape.t === 'text') {
      this.traceText(shape, context)
    } else if (shape.t === 'svg') {
      this.traceSVG(shape, context)
    } else {
      console.warn('Unknown type')
    }
  }

  this.traceRect = function (rect, context) {
    context.moveTo(rect.x, rect.y)
    context.lineTo(rect.x + rect.w, rect.y)
    context.lineTo(rect.x + rect.w, rect.y + rect.h)
    context.lineTo(rect.x, rect.y + rect.h)
    context.lineTo(rect.x, rect.y)
  }

  this.traceLine = function (line, context) {
    context.moveTo(line.a.x, line.a.y)
    context.lineTo(line.b.x, line.b.y)
  }

  this.traceCircle = function (circle, context) {
    context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
  }

  this.traceText = function (text, context) {

  }

  this.traceSVG = function (text, context) {

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

  this.draw = function (path, rect = this.getFrame(), callback = () => {}) {
    const img = new Image()
    img.src = path
    img.onload = () => {
      this.context.drawImage(img, rect.x, rect.y, rect.w, img.height * (rect.w / img.width))
      if (typeof callback === 'function') {
        callback()
      }
    }
  }

  this.clear = function (rect = this.getFrame(), context = this.context) {
    context.clearRect(rect.x, rect.y, rect.w, rect.h)
  }

  this.clearGuide = function () {
    this.clear(ronin.surface.getFrame(), ronin.surface.guide)
  }

  this.clone = function (a, b) {
    this.context.drawImage(this.el, a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h)
  }

  this.resize = function (size) {
    this.el.width = size.w
    this.el.height = size.h
    this.el.style.width = size.w + 'px'
    this.el.style.height = size.h + 'px'
    this._guide.width = size.w
    this._guide.height = size.h
    this._guide.style.width = size.w + 'px'
    this._guide.style.height = size.h + 'px'
  }

  this.maximize = function () {
    this.resize(this.getFrame())
  }

  this.onResize = function () {
    if (ronin.commander._input.value === '') {
      this.maximize()
    }
    const f = this.getFrame()
    ronin.log(`resize ${f.w}x${f.h}`)
  }

  this.getFrame = function () {
    return { x: 0, y: 0, w: window.innerWidth - 60, h: window.innerHeight - 60, t: 'rect' }
  }
}
