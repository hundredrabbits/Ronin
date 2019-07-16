function Surface (ronin) {
  this.el = document.createElement('canvas')
  this.el.id = 'surface'
  this._guide = document.createElement('canvas')
  this._guide.id = 'guide'
  this.ratio = window.devicePixelRatio

  // Contexts
  this.context = this.el.getContext('2d')
  this.guide = this.el.getContext('2d')

  this.install = function (host) {
    host.appendChild(this.el)
    host.appendChild(this._guide)
    window.addEventListener('resize', (e) => { this.onResize() }, false)
    this._guide.addEventListener('mousedown', ronin.commander.onMouseDown, false)
    this._guide.addEventListener('mousemove', ronin.commander.onMouseMove, false)
    this._guide.addEventListener('mouseup', ronin.commander.onMouseUp, false)
    this.context.scale(this.ratio, this.ratio)
    this.guide.scale(this.ratio, this.ratio)
  }

  this.start = function () {
    this.maximize()
    console.log('Surface', `Ratio:${this.ratio}`)
  }

  this.update = function () {

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

  this.open = function (path, callback = () => {}) {
    const img = new Image()
    img.src = path
    img.onload = () => {
      console.log(`Open img: ${img.width}x${img.height}`)
      const rect = { x: 0, y: 0, w: img.width, h: img.height }
      this.resize(rect, true)
      this.context.drawImage(img, 0, 0, img.width, img.height)
      if (typeof callback === 'function') {
        callback()
      }
    }
  }

  this.draw = function (img, rect = this.getFrame(), callback = () => {}) {
    img.onload = () => {
      console.log(`Drawing img: ${img.width}x${img.height}`)
      this.context.drawImage(img, rect.x, rect.y, rect.w, rect.h) // no strect: img.height * (rect.w / img.width)
      if (typeof callback === 'function') {
        callback()
      }
    }
  }

  this.crop = function (rect) {
    console.log(`Crop ${rect.w}x${rect.h} from ${rect.x}x${rect.y}`)
    const crop = this.getCrop(rect)
    this.resize(rect, true)
    this.context.drawImage(crop, 0, 0)
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

  this.resize = function (size, fit = false) {
    this.el.width = size.w
    this.el.height = size.h
    this.el.style.width = size.w + 'px'
    this.el.style.height = size.h + 'px'
    this._guide.width = size.w
    this._guide.height = size.h
    this._guide.style.width = size.w + 'px'
    this._guide.style.height = size.h + 'px'
    if (fit === true) {
      this.fitWindow(size)
    }
  }

  this.fitWindow = function (size) {
    const win = require('electron').remote.getCurrentWindow()
    const pad = { w: 60, h: 60 }
    win.setSize(size.w + pad.w, size.h + pad.h, false)
  }

  this.maximize = function () {
    this.resize({ x: 0, y: 0, w: window.innerWidth - 60, h: window.innerHeight - 60, t: 'rect' })
  }

  this.onResize = function () {
    if (ronin.commander._input.value === '') {
      this.maximize()
    }
    const f = this.getFrame()
    ronin.log(`resize ${f.w}x${f.h}`)
  }

  this.getFrame = function () {
    return { x: 0, y: 0, w: this.el.width, h: this.el.height, t: 'rect' }
  }

  this.getCrop = function (rect) {
    const newCanvas = document.createElement('canvas')
    newCanvas.width = rect.w
    newCanvas.height = rect.h
    newCanvas.getContext('2d').drawImage(this.el, rect.x, rect.y, rect.w, rect.h, 0, 0, rect.w, rect.h)
    return newCanvas
  }

  this.resizeImage = function (src, dst, type = 'image/jpeg', quality = 0.92) {
    var tmp = new Image()
    var canvas
    var context
    var cW
    var cH

    cW = src.naturalWidth
    cH = src.naturalHeight

    tmp.src = src.src
    tmp.onload = function () {
      canvas = document.createElement('canvas')

      cW /= 2
      cH /= 2

      if (cW < src.width) {
        cW = src.width
      }
      if (cH < src.height) {
        cH = src.height
      }

      canvas.width = cW
      canvas.height = cH
      context = canvas.getContext('2d')
      context.drawImage(tmp, 0, 0, cW, cH)

      dst.src = canvas.toDataURL(type, quality)

      if (cW <= src.width || cH <= src.height) { return }

      tmp.src = dst.src
    }
  }
}
