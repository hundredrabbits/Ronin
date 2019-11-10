'use strict'

/* global Path2D */
/* global Image */

function Surface (client) {
  this.el = document.createElement('canvas')
  this.el.id = 'surface'
  this._guide = document.createElement('canvas')
  this._guide.id = 'guide'
  this._guide.setAttribute('tabindex', '1') // focus is necessary to capture keyboard events
  this.ratio = window.devicePixelRatio

  // Contexts
  this.context = this.el.getContext('2d')
  this.guide = this._guide.getContext('2d')

  this.install = function (host) {
    host.appendChild(this.el)
    host.appendChild(this._guide)
    window.addEventListener('resize', (e) => { this.onResize() }, false)
    this._guide.addEventListener('mousedown', client.onMouseDown, false)
    this._guide.addEventListener('mousemove', client.onMouseMove, false)
    this._guide.addEventListener('mouseup', client.onMouseUp, false)
    this._guide.addEventListener('mouseover', client.onMouseOver, false)
    this._guide.addEventListener('mouseout', client.onMouseOut, false)
    this._guide.addEventListener('keydown', client.onKeyDown, false)
    this._guide.addEventListener('keyup', client.onKeyUp, false)
    this._guide.addEventListener('keypress', client.onKeyPress, false)
  }

  this.start = function () {
    this.maximize()
  }

  this.onResize = function () {
    if (client.commander._input.value === '') {
      this.maximize()
    }
    const f = this.getFrame()
    client.log(`resize ${f.w}x${f.h}`)
  }

  // Shape

  this.stroke = (shape, color = client.theme.get('f_high'), width = 2, context = this.context) => {
    context.beginPath()
    this.trace(shape, context)
    context.lineWidth = width
    context.strokeStyle = color.rgba ? color.rgba : color
    if (isText(shape)) {
      context.textAlign = shape.a
      context.font = `${shape.p}px ${shape.f}`
      context.strokeText(`${shape.t}`, shape.x, shape.y)
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

  this.fill = (shape, color = client.theme.get('b_high'), context = this.context) => {
    context.beginPath()
    context.fillStyle = typeof color === 'object' && color.rgba ? color.rgba : color
    this.trace(shape, context)
    if (isText(shape)) {
      context.textAlign = shape.a
      context.font = `${shape.p}px ${shape.f}`
      context.fillText(`${shape.t}`, shape.x, shape.y)
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

  // Clear

  this.clear = function (rect = this.getFrame(), context = this.context) {
    context.clearRect(rect.x, rect.y, rect.w, rect.h)
  }

  this.clearGuide = function (rect = this.getFrame(), context = this.guide) {
    context.clearRect(rect.x, rect.y, rect.w, rect.h)
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
    } else if (isPoly(shape)) {
      this.tracePoly(shape, context)
    }
    if (isArc(shape)) {
      this.traceArc(shape, context)
    } else if (isCircle(shape)) {
      this.traceCircle(shape, context)
    } else if (isEllipse(shape)) {
      this.traceEllipse(shape, context)
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

  this.tracePoly = function (poly, context) {
    const positions = Object.values(poly)
    const origin = positions.shift()
    context.moveTo(origin.x, origin.y)
    for (const pos of positions) {
      context.lineTo(pos.x, pos.y)
    }
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

  this.traceArc = function (arc, context) {
    context.arc(arc.cx, arc.cy, arc.r, arc.sa, arc.ea)
  }

  this.traceEllipse = function (ellipse, context) {
    context.ellipse(ellipse.cx, ellipse.cy, ellipse.rx, ellipse.ry, 0, 2 * Math.PI, false)
  }

  this.traceText = function (text, context) {

  }

  this.traceSVG = function (text, context) {

  }

  // IO

  this.open = (path, ratio = 1) => {
    return new Promise(resolve => {
      const img = new Image()
      img.src = path
      img.onload = () => {
        const rect = { x: 0, y: 0, w: img.width * ratio, h: img.height * ratio }
        this.resize(rect, true)
        this.context.drawImage(img, rect.x, rect.y, rect.w, rect.h)
        resolve()
      }
    })
  }

  this.draw = function (img, shape = this.getFrame(), alpha = 1) {
    return new Promise(resolve => {
      img.onload = () => {
        this.context.globalAlpha = alpha
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
        this.context.globalAlpha = 1
        resolve()
      }
    })
  }

  this.crop = function (rect) {
    client.log(`Crop ${rect.w}x${rect.h} from ${rect.x}x${rect.y}`)
    const crop = this.copy(rect)
    this.resize(rect, true)
    this.context.drawImage(crop, 0, 0)
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

  this.resize = (size, fit = false) => {
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
  }

  this.copy = function (rect) {
    const newCanvas = document.createElement('canvas')
    newCanvas.width = rect.w
    newCanvas.height = rect.h
    newCanvas.getContext('2d').drawImage(this.el, rect.x, rect.y, rect.w, rect.h, 0, 0, rect.w, rect.h)
    return newCanvas
  }

  this.paste = function (copy, rect) {
    return this.context.drawImage(copy, rect.x, rect.y, rect.w, rect.h)
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

  this.maximize = () => {
    this.resize(this.bounds())
  }

  this.bounds = () => {
    return { x: 0, y: 0, w: ((window.innerWidth - 60) * this.ratio), h: ((window.innerHeight - 60) * this.ratio) }
  }

  this.getFrame = () => {
    return { x: 0, y: 0, w: this.el.width, h: this.el.height, c: this.el.width / 2, m: this.el.height / 2 }
  }

  this.toggleGuides = function () {
    this._guide.className = this._guide.className === 'hidden' ? '' : 'hidden'
  }

  function isRect (shape) {
    return shape && !isNaN(shape.x) && !isNaN(shape.y) && !isNaN(shape.w) && !isNaN(shape.h)
  }
  function isCircle (shape) {
    return shape && !isNaN(shape.cx) && !isNaN(shape.cy) && !isNaN(shape.r)
  }
  function isArc (shape) {
    return shape && !isNaN(shape.cx) && !isNaN(shape.cy) && !isNaN(shape.r) && !isNaN(shape.sa) && !isNaN(shape.ea)
  }
  function isEllipse (shape) {
    return shape && !isNaN(shape.cx) && !isNaN(shape.cy) && !isNaN(shape.rx) && !isNaN(shape.ry)
  }
  function isPos (shape) {
    return shape && !isNaN(shape.x) && !isNaN(shape.y)
  }
  function isSvg (shape) {
    return shape && shape.d
  }
  function isText (shape) {
    return shape && !isNaN(shape.x) && !isNaN(shape.y) && shape.p && shape.t && shape.f && shape.a
  }
  function isLine (shape) {
    return shape && shape.a && shape.b && !isNaN(shape.a.x) && !isNaN(shape.a.y) && !isNaN(shape.b.x) && !isNaN(shape.b.y)
  }
  function isPoly (shape) {
    return shape && shape[0] && shape[1] && !isNaN(shape[0].x) && !isNaN(shape[0].y) && !isNaN(shape[1].x) && !isNaN(shape[1].y)
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
