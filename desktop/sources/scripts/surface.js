function Surface (ronin) {
  this.el = document.createElement('canvas')
  this.el.id = 'surface'
  this._guide = document.createElement('canvas')
  this._guide.id = 'guide'
  this.ratio = window.devicePixelRatio
  // Contexts
  this.context = this.el.getContext('2d')
  this.guide = this._guide.getContext('2d')

  this.install = function (host) {
    host.appendChild(this.el)
    host.appendChild(this._guide)
    window.addEventListener('resize', (e) => { this.onResize() }, false)
    this._guide.addEventListener('mousedown', ronin.onMouseDown, false)
    this._guide.addEventListener('mousemove', ronin.onMouseMove, false)
    this._guide.addEventListener('mouseup', ronin.onMouseUp, false)
    this._guide.addEventListener('mouseover', ronin.onMouseOver, false)
    this._guide.addEventListener('mouseout', ronin.onMouseOut, false)
  }

  this.start = function () {
    this.maximize()
  }

  // Shape

  this.stroke = (shape, color, width, context = this.context) => {
    context.beginPath()
    this.trace(shape, context)
    context.lineWidth = width
    context.strokeStyle = `${color}`
    if (isText(shape)) {
      context.textAlign = shape.a
      context.font = `${shape.p}px ${shape.f}`
      context.strokeText(shape.t, shape.x, shape.y)
    } else if (isSvg(shape)) {
      context.lineWidth = width
      context.save()
      context.translate(shape.x, shape.y)
      context.stroke(new Path2D(shape.d))
      context.restore()
    } else {
      context.stroke()
    }
    context.closePath()
  }

  // Fill

  this.fill = (shape, color, context = this.context) => {
    context.beginPath()
    context.fillStyle = `${color}`
    this.trace(shape, context)
    if (isText(shape)) {
      context.textAlign = shape.a
      console.log(shape)
      context.font = `${shape.p}px ${shape.f}`
      context.fillText(shape.t, shape.x, shape.y)
    } else if (isSvg(shape)) {
      context.save()
      context.translate(shape.x, shape.y)
      context.fill(new Path2D(shape.d))
      context.restore()
    } else {
      context.fill()
    }
    context.closePath()
  }

  this.linearGradient = function (x1, y1, x2, y2, colors, context = this.context) {
    const gradient = context.createLinearGradient(x1, y1, x2, y2)
    const step = 1 / (colors.length - 1)
    colors.forEach((color, i) => {
      gradient.addColorStop(i * step, color)
    })
    return gradient
  }

  // Tracers

  this.trace = function (shape, context) {
    if (isRect(shape)) {
      this.traceRect(shape, context)
    } else if (isPos(shape)) {
      this.tracePos(shape, context)
    }
    if (isLine(shape)) {
      this.traceLine(shape, context)
    }
    if (isCircle(shape)) {
      this.traceCircle(shape, context)
    } else if (isText(shape)) {
      this.traceText(shape, context)
    } else if (isSvg(shape)) {
      this.traceSVG(shape, context)
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

  this.tracePos = function (pos, context, radius = 7.5) {
    context.lineCap = 'round'
    context.moveTo(pos.x - radius, pos.y)
    context.lineTo(pos.x + radius, pos.y)
    context.moveTo(pos.x, pos.y - radius)
    context.lineTo(pos.x, pos.y + radius)
  }

  this.traceCircle = function (circle, context) {
    context.arc(circle.cx, circle.cy, circle.r, 0, 2 * Math.PI)
  }

  this.traceText = function (text, context) {

  }

  this.traceSVG = function (text, context) {

  }

  // IO

  this.open = function (path, ratio = 1) {
    return new Promise(resolve => {
      const img = new Image()
      img.src = path
      img.onload = () => {
        const rect = { x: 0, y: 0, w: parseInt(img.width * ratio), h: parseInt(img.height * ratio) }
        this.resize(rect, true)
        this.context.drawImage(img, 0, 0, rect.w, rect.h)
        resolve()
      }
    })
  }

  this.draw = function (img, shape = this.getFrame()) {
    return new Promise(resolve => {
      img.onload = () => {
        if (isLine(shape)) {
          this.context.drawImage(img, shape.a.x, shape.a.y, shape.b.x - shape.a.x, shape.b.y - shape.a.y)
        } else if (isRect(shape)) {
          const fit = fitRect({ w: img.width, h: img.height }, { w: shape.w, h: shape.h })
          this.context.drawImage(img, shape.x, shape.y, fit.w, fit.h)
        } else if (isCircle(shape)) {
          const side = Math.sqrt(Math.pow(shape.r, 2) / 2)
          const rect = { x: shape.cx - (side), y: shape.cy - (side), w: side * 2, h: side * 2 }
          const fit = fitRect({ w: img.width, h: img.height }, { w: rect.w, h: rect.h })
          this.context.drawImage(img, rect.x, rect.y, fit.w, fit.h)
        } else {
          this.context.drawImage(img, shape.x, shape.y, img.width, img.height)
        }
        resolve()
      }
    })
  }

  this.crop = function (rect) {
    ronin.log(`Crop ${rect.w}x${rect.h} from ${rect.x}x${rect.y}`)
    const crop = this.getCrop(rect)
    this.resize(rect, true)
    this.context.drawImage(crop, 0, 0)
  }

  this.clear = function (rect = this.getFrame(), context = this.context) {
    context.clearRect(rect.x, rect.y, rect.w, rect.h)
  }

  this.clearGuide = function (rect = this.getFrame(), context = this.guide) {
    context.clearRect(rect.x, rect.y, rect.w, rect.h)
  }

  this.drawGuide = function (shape, color = 'white', context = this.guide) {
    if (!shape) { return }
    this.stroke(shape.rect || shape, 'black', 4, context)
    if (shape.pos) { this.stroke(shape.pos, 'black', 4, context) }
    if (shape.line) { this.stroke(shape.line, 'black', 4, context) }
    if (shape.circle) {
      this.stroke(shape.circle, 'black', 4, context)
    }

    this.stroke(shape.rect || shape, color, 1.5, context)
    if (shape.pos) { this.stroke(shape.pos, color, 1.5, context) }
    if (shape.line) { this.stroke(shape.line, color, 1.5, context) }
    if (shape.circle) {
      this.stroke(shape.circle, color, 1.5, context)
    }
  }

  this.clone = function (a, b) {
    this.context.drawImage(this.el, a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h)
  }

  this.resize = function (size, fit = false) {
    const frame = this.getFrame()
    if (frame.w === size.w && frame.h === size.h) { return }
    console.log('Surface', `Resize: ${size.w}x${size.h}`)
    this.el.width = size.w
    this.el.height = size.h
    this.el.style.width = (size.w / this.ratio) + 'px'
    this.el.style.height = (size.h / this.ratio) + 'px'
    this._guide.width = size.w
    this._guide.height = size.h
    this._guide.style.width = (size.w / this.ratio) + 'px'
    this._guide.style.height = (size.h / this.ratio) + 'px'
    if (fit === true) {
      this.fitWindow(size)
    }
  }

  this.getFrame = function () {
    return { x: 0, y: 0, w: this.el.width, h: this.el.height, t: 'rect', c: this.el.width / 2, m: this.el.height / 2 }
  }

  this.fitWindow = function (size) {
    const win = require('electron').remote.getCurrentWindow()
    const pad = { w: ronin.commander.isVisible === true ? 400 : 60, h: 60 }
    if (size.w < 10 || size.h < 10) { return }
    win.setSize(Math.floor((size.w / this.ratio) + pad.w), Math.floor((size.h / this.ratio) + pad.h), true)
  }

  this.maximize = function () {
    this.resize({ x: 0, y: 0, w: ((window.innerWidth - 60) * this.ratio), h: ((window.innerHeight - 60) * this.ratio), t: 'rect' })
  }

  this.onResize = function () {
    if (ronin.commander._input.value === '') {
      this.maximize()
    }
    const f = this.getFrame()
    ronin.log(`resize ${f.w}x${f.h}`)
  }

  this.getCrop = function (rect) {
    const newCanvas = document.createElement('canvas')
    newCanvas.width = rect.w
    newCanvas.height = rect.h
    newCanvas.getContext('2d').drawImage(this.el, rect.x, rect.y, rect.w, rect.h, 0, 0, rect.w, rect.h)
    return newCanvas
  }

  this.resizeImage = function (src, dst, type = 'image/png', quality = 1.0) {
    return new Promise(resolve => {
      const tmp = new Image()
      let canvas
      let context
      let cW = src.naturalWidth
      let cH = src.naturalHeight
      tmp.src = src.src
      // resolve()
      tmp.onload = () => {
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
        if (cW <= src.width || cH <= src.height) { return resolve() }
        tmp.src = dst.src
        return resolve()
      }
    })
  }

  function isRect (shape) {
    return !isNaN(shape.x) && !isNaN(shape.y) && !isNaN(shape.w) && !isNaN(shape.h)
  }
  function isCircle (shape) {
    return !isNaN(shape.cx) && !isNaN(shape.cy) && !isNaN(shape.r)
  }
  function isPos (shape) {
    return !isNaN(shape.x) && !isNaN(shape.y)
  }
  function isSvg (shape) {
    return shape.d
  }
  function isText (shape) {
    return !isNaN(shape.x) && !isNaN(shape.y) && shape.p && shape.t && shape.f && shape.a
  }
  function isLine (shape) {
    return shape.a && !isNaN(shape.a.x) && !isNaN(shape.a.y) && shape.b && !isNaN(shape.b.x) && !isNaN(shape.b.y)
  }

  function fitRect (image, container) {
    image.ratio = image.w / image.h
    container.ratio = container.w / container.h
    return {
      w: image.ratio < container.ratio ? container.h * image.ratio : container.w,
      h: image.ratio > container.ratio ? container.w / image.ratio : container.h
    }
  }
}
