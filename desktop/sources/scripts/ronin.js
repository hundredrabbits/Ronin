'use strict'

/* global Acels */
/* global Theme */
/* global Source */
/* global Commander */
/* global Surface */
/* global Library */
/* global Lisp */
/* global Image */
/* global requestAnimationFrame */

function Ronin () {
  this.el = document.createElement('div')
  this.el.id = 'ronin'

  this.acels = new Acels()
  this.theme = new Theme()
  this.source = new Source()

  this.commander = new Commander(this)
  this.surface = new Surface(this)
  this.library = new Library(this)
  this.lisp = new Lisp(this.library)

  this.bindings = {}

  this.install = function (host = document.body) {
    this._wrapper = document.createElement('div')
    this._wrapper.id = 'wrapper'

    this.commander.install(this._wrapper)
    this.surface.install(this._wrapper)
    this.el.appendChild(this._wrapper)
    host.appendChild(this.el)
    this.theme.install()

    window.addEventListener('dragover', this.onDrag)
    window.addEventListener('drop', this.onDrop)

    this.acels.set('File', 'New', 'CmdOrCtrl+N', () => { this.source.new(); this.surface.clear(); this.commander.clear() })
    this.acels.set('File', 'Save', 'CmdOrCtrl+S', () => { this.source.save('export.lisp', this.commander._input.value, 'text/plain') })
    this.acels.set('File', 'Export Image', 'CmdOrCtrl+E', () => { this.source.download('export.png', this.surface.el.toDataURL('image/png', 1.0), 'image/png') })
    this.acels.set('File', 'Open', 'CmdOrCtrl+O', () => { this.source.open('lisp', this.whenOpen) })
    this.acels.set('File', 'Revert', 'CmdOrCtrl+W', () => { this.source.revert() })
    this.acels.set('View', 'Toggle Guides', 'CmdOrCtrl+Shift+H', () => { this.surface.toggleGuides() })
    this.acels.set('View', 'Toggle Commander', 'CmdOrCtrl+K', () => { this.commander.toggle() })
    this.acels.set('View', 'Expand Commander', 'CmdOrCtrl+Shift+K', () => { this.commander.toggle(true) })
    this.acels.set('Project', 'Run', 'CmdOrCtrl+R', () => { this.commander.run() })
    this.acels.set('Project', 'Reload Run', 'CmdOrCtrl+Shift+R', () => { this.source.revert(); this.commander.run() })
    this.acels.set('Project', 'Re-Indent', 'CmdOrCtrl+Shift+I', () => { this.commander.reindent() })
    this.acels.set('Project', 'Clean', 'Escape', () => { this.commander.cleanup() })
    this.acels.install(window)
  }

  this.start = function () {
    console.log('Ronin', 'Starting..')
    console.info(`${this.acels}`)
    this.theme.start()
    this.source.start()
    this.commander.start()
    this.surface.start()
    this.loop()
  }

  this.whenOpen = (res) => {
    this.commander.load(res)
    this.commander.show()
  }

  this.loop = () => {
    if (this.bindings.animate && typeof this.bindings.animate === 'function') {
      this.bindings.animate()
    }
    requestAnimationFrame(() => this.loop())
  }

  this.log = (...msg) => {
    this.commander.setStatus(msg.reduce((acc, val) => {
      return acc + JSON.stringify(val).replace(/"/g, '').trim() + ' '
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
    const pos = { x: e.offsetX * this.surface.ratio, y: e.offsetY * this.surface.ratio }
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

  this.onKeyDown = (e, id = 'key-down') => {
    if (this.bindings[id]) {
      this.bindings[id](e)
    }
  }

  this.onKeyUp = (e, id = 'key-up') => {
    if (this.bindings[id]) {
      this.bindings[id](e)
    }
  }

  this.onMouseMove = (e, id = 'mouse-move') => {
    const pos = { x: e.offsetX * this.surface.ratio, y: e.offsetY * this.surface.ratio }
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
    const pos = { x: e.offsetX * this.surface.ratio, y: e.offsetY * this.surface.ratio }
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

  this.onDrag = (e) => {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  this.onDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]

    if (file.name.indexOf('.lisp') > -1) {
      this.source.load(e.dataTransfer.files[0], this.whenOpen)
    }
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const img = new Image()
      img.onload = () => {
        this.cache.set(file.name, img.src)
      }
      img.src = URL.createObjectURL(file)
    }
  }

  this.cache = {
    data: {},
    set: (key, content) => {
      this.log((this.cache.data[key] ? 'Updated ' : 'Stored ') + key)
      this.cache.data[key] = content
    },
    get: (key) => {
      return this.cache.data[key]
    }
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
}
