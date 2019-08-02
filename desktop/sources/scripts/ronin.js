function Ronin () {
  const defaultTheme = {
    background: '#111',
    f_high: '#fff',
    f_med: '#999',
    f_low: '#444',
    f_inv: '#000',
    b_high: '#72dec2',
    b_med: '#888',
    b_low: '#aaa',
    b_inv: '#ffb545'
  }

  this.el = document.createElement('div')
  this.el.id = 'ronin'

  this.theme = new Theme(defaultTheme)
  this.source = new Source(this)
  this.commander = new Commander(this)
  this.surface = new Surface(this)
  this.library = new Library(this)
  this.interpreter = new Lisp(this.library)
  this.osc = new Osc(this)

  this.bindings = {}

  this.install = function (host = document.body) {
    this._wrapper = document.createElement('div')
    this._wrapper.id = 'wrapper'

    this.commander.install(this._wrapper)
    this.surface.install(this._wrapper)
    this.el.appendChild(this._wrapper)
    host.appendChild(this.el)
    this.theme.install()

    window.addEventListener('dragover', this.drag)
    window.addEventListener('drop', this.drop)
  }

  this.start = function () {
    this.theme.start()
    this.source.start()
    this.commander.start()
    this.surface.start()
    this.osc.start()
    this.loop()
  }

  this.loop = () => {
    if (this.bindings['animate'] && typeof this.bindings['animate'] === 'function') {
      this.bindings['animate']()
    }
    requestAnimationFrame(() => this.loop())
  }

  this.reset = function () {
    this.theme.reset()
  }

  this.log = function (...msg) {
    this.commander.setStatus(msg.reduce((acc, val) => {
      return acc + JSON.stringify(val).replace(/\"/g, '').trim() + ' '
    }, ''))
  }

  this.load = function (content = this.default()) {

  }

  this.bind = (event, fn) => {
    this.bindings[event] = fn
  }

  // Cursor

  this.mouseOrigin = null

  this.onMouseDown = (e, id = 'mouse-down') => {
    const pos = { x: e.offsetX * ronin.surface.ratio, y: e.offsetY * ronin.surface.ratio }
    this.mouseOrigin = pos
    const shape = this.mouseShape(pos, id)
    if (this.bindings[id]) {
      this.bindings[id](shape)
    }
    this.commander.capture()
    this.surface.clearGuide()
    this.surface.drawGuide(shape)
  }

  this.onKeyPress = (e, id = 'key-press') => {
    if (this.bindings[id]) {
      this.bindings[id](e)
    }
  }

  this.onKeyUp = (e, id = 'key-up') => {
    if (this.bindings[id]) {
      this.bindings[id](e)
    }
  }

  this.onKeyDown = (e, id = 'key-down') => {
    if (this.bindings[id]) {
      this.bindings[id](e)
    }
  }

  this.onMouseMove = (e, id = 'mouse-move') => {
    const pos = { x: e.offsetX * ronin.surface.ratio, y: e.offsetY * ronin.surface.ratio }
    const shape = this.mouseShape(pos, id)
    if (this.bindings[id]) {
      this.bindings[id](shape)
    }
    if (this.mouseOrigin) {
      this.commander.commit(shape, false, e.which !== 1)
      this.surface.clearGuide()
      this.surface.drawGuide(shape)
    }
  }

  this.onMouseUp = (e, id = 'mouse-up') => {
    const pos = { x: e.offsetX * ronin.surface.ratio, y: e.offsetY * ronin.surface.ratio }
    const shape = this.mouseShape(pos, id)
    if (this.bindings[id]) {
      this.bindings[id](shape)
    }
    if (this.mouseOrigin) {
      this.commander.commit(shape, true, e.which !== 1)
    }
    this.mouseOrigin = null
    this.surface.clearGuide()
  }

  this.onMouseOver = (e) => {
    this.mouseOrigin = null
  }

  this.onMouseOut = (e) => {
    this.mouseOrigin = null
  }

  this.mouseShape = (position, type) => {
    if (!this.mouseOrigin) { return }
    const x = position.x
    const y = position.y
    const xy = x + ' ' + y
    const pos = { x, y }
    const line = {
      a: { x: this.mouseOrigin.x, y: this.mouseOrigin.y },
      b: { x: pos.x, y: pos.y }
    }
    const size = { w: line.a.x ? pos.x - line.a.x : 0, h: line.a.y ? pos.y - line.a.y : 0 }
    const rect = {
      x: line.a.x,
      y: line.a.y,
      w: size.w,
      h: size.h
    }
    const wh = rect.w + ' ' + rect.h
    const d = Math.sqrt(((line.a.x - line.b.x) * (line.a.x - line.b.x)) + ((line.a.y - line.b.y) * (line.a.y - line.b.y))).toFixed(2)
    const a = Math.atan2(pos.y - line.a.y, pos.x - line.a.x).toFixed(2)
    const circle = {
      cx: line.a.x,
      cy: line.a.y,
      r: d
    }
    const arc = {
      cx: line.a.x,
      cy: line.a.y,
      r: d,
      sa: 0,
      ea: a
    }
    return { x, y, xy, wh, d, a, line, rect, pos, size, circle, arc, type, 'is-down': type !== 'mouse-up' ? true : null }
  }

  // Zoom

  this.modZoom = function (mod = 0, set = false) {
    try {
      const { webFrame } = require('electron')
      const currentZoomFactor = webFrame.getZoomFactor()
      webFrame.setZoomFactor(set ? mod : currentZoomFactor + mod)
      console.log(window.devicePixelRatio)
    } catch (err) {
      console.log('Cannot zoom')
    }
  }

  this.setZoom = function (scale) {
    try {
      webFrame.setZoomFactor(scale)
    } catch (err) {
      console.log('Cannot zoom')
    }
  }

  // Events

  this.drag = (e) => {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  this.drop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    if (!file || !file.name) { console.warn('File', 'Not a valid file.'); return }
    const path = file.path ? file.path : file.name
    if (this.commander._input.value.indexOf('$path') > -1) {
      this.commander.injectPath(file.path)
      this.commander.show()
    } else if (path.indexOf('.lisp') > -1) {
      this.source.read(path)
      this.commander.show()
    }
  }
}
