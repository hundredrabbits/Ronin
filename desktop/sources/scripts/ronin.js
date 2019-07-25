function Ronin () {
  const defaultTheme = {
    background: '#111',
    f_high: '#fff',
    f_med: '#999',
    f_low: '#444',
    f_inv: '#000',
    b_high: '#000',
    b_med: '#888',
    b_low: '#aaa',
    b_inv: '#ffb545'
  }

  this.includes = ['prelude']

  this.el = document.createElement('div')
  this.el.id = 'ronin'

  this.theme = new Theme(defaultTheme)
  this.source = new Source(this)
  this.commander = new Commander(this)
  this.surface = new Surface(this)
  this.library = new Library(this)
  this.interpreter = new Lisp(this.library, this.includes)
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
      return acc + JSON.stringify(val).replace(/\"/g,'').trim() + ' ' 
    }, ''))
  }

  this.load = function (content = this.default()) {

  }

  this.bind = (event, fn) => {
    this.bindings[event] = fn
  }

  // Cursor

  this.mouseTouch = null

  this.onMouseDown = (e, id = 'mouse-down') => {
    this.mouseTouch = { x: e.offsetX, y: e.offsetY }
    const shape = this.makeMouseOffset({ x: e.offsetX, y: e.offsetY }, id)
    if (this.bindings[id]) {
      this.bindings[id](shape)
    }
    this.commander.capture()
    this.surface.drawGuide(shape)
  }

  this.onMouseMove = (e, id = 'mouse-move') => {
    const shape = this.makeMouseOffset({ x: e.offsetX, y: e.offsetY }, id)
    if (this.bindings[id]) {
      this.bindings[id](shape)
    }
    if (this.mouseTouch) {
      this.commander.commit(shape)
      this.surface.drawGuide(shape)
    }
  }

  this.onMouseUp = (e, id = 'mouse-up') => {
    this.mouseTouch = null
    const shape = this.makeMouseOffset({ x: e.offsetX, y: e.offsetY }, id)
    if (this.bindings[id]) {
      this.bindings[id](shape)
    }
    this.surface.clearGuide()
  }

  this.makeMouseOffset = (pos, type) => {
    if (!this.mouseTouch) { return }
    const x = this.mouseTouch.x * ronin.surface.ratio
    const y = this.mouseTouch.y * ronin.surface.ratio
    const w = this.mouseTouch.x ? (pos.x * ronin.surface.ratio) - (this.mouseTouch.x * ronin.surface.ratio) : 0
    const h = this.mouseTouch.y ? (pos.y * ronin.surface.ratio) - (this.mouseTouch.y * ronin.surface.ratio) : 0
    const a = { x, y }
    const b = { x: x + w, y: y + h }
    return { x, y, w, h, a, b, type, 'is-down': this.mouseTouch !== null }
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
