function Commander (ronin) {
  this.el = document.createElement('div')
  this.el.id = 'commander'
  this._input = document.createElement('textarea')
  this._status = document.createElement('div')
  this._status.id = 'status'
  this.isVisible = true

  this.install = function (host) {
    this.el.appendChild(this._input)
    this.el.appendChild(this._status)
    host.appendChild(this.el)

    this._input.addEventListener('input', this.onInput)
  }

  this.start = function () {
    this._status.textContent = 'Idle. (zoom 100%)'
    this._input.focus()
    this.run()
    this.hide()
  }

  this.run = (txt = this._input.value) => {
    if (txt.indexOf('$') > -1) { ronin.log('Present: $'); return }
    const inter = new Lisp(txt, ronin.library)
    inter.toPixels()
    ronin.always && requestAnimationFrame(() => this.run(txt))
  }

  this.load = function (txt) {
    this._input.value = txt
    this.run()
  }

  this.setStatus = function (msg) {
    if (!msg) { return }
    this._status.textContent = `${(msg + '').substr(0, 40)}`
  }

  this.update = function () {

  }

  this.onInput = function () {

  }

  this.getQuery = function () {

  }

  // Mouse

  this.mouseRect = { x: 0, y: 0, w: 0, h: 0, a: { x: 0, y: 0 }, b: { x: 0, y: 0 } }
  this.mouseDown = false

  this.onMouseDown = (e) => {
    this.mouseDown = true
    this.mouseRect.x = e.offsetX
    this.mouseRect.y = e.offsetY
    this.mouseRect.a.x = e.offsetX
    this.mouseRect.a.y = e.offsetY
    this.mouseRect.t = 'pos'
    this._status.textContent = `${this.mouseRect.x},${this.mouseRect.y} ${this.mouseRect.w},${this.mouseRect.h}`
    this.capture()
    this.show()
  }

  this.onMouseMove = (e) => {
    if (this.mouseDown === true) {
      this.mouseRect.w = e.offsetX - this.mouseRect.x
      this.mouseRect.h = e.offsetY - this.mouseRect.y
      this.mouseRect.b.x = e.offsetX
      this.mouseRect.b.y = e.offsetY
      this._status.textContent = `${this.mouseRect.x},${this.mouseRect.y} ${this.mouseRect.w},${this.mouseRect.h}`
      this.commit()
    }
  }

  this.onMouseUp = (e) => {
    this.mouseDown = false
    this.mouseRect.w = e.offsetX - this.mouseRect.x
    this.mouseRect.h = e.offsetY - this.mouseRect.y
    this.mouseRect.b.x = e.offsetX
    this.mouseRect.b.y = e.offsetY
    this.mouseRect.t = ''
    this._status.textContent = `${this.mouseRect.x},${this.mouseRect.y} ${this.mouseRect.w},${this.mouseRect.h}`
    this.commit()
    this._input.focus()
    ronin.surface.clearGuide()
  }

  // Injection

  this.cache = ''

  this.capture = function () {
    this.cache = this._input.value
  }

  this.canInject = function () {
    return this._input.value.indexOf('$path') > -1
  }

  this.injectPath = function (path) {
    if (this.canInject()) {
      this._input.value = this._input.value.replace('$path', `"${path}"`)
    }
  }

  this.commit = function () {
    let value = this.cache

    if (value.indexOf('$') < 0) {
      return
    }

    ronin.surface.clearGuide()

    const next = value.split('$')[1]

    if (next.substr(0, 4) === 'pos)') {
      value = value.replace('($pos)', `(pos ${this.mouseRect.x} ${this.mouseRect.y})`)
      this.mouseRect.t = 'pos'
      ronin.surface.stroke(this.mouseRect, 2, 'white', ronin.surface.guide)
    }

    if (next.substr(0, 5) === 'rect)') {
      value = value.replace('($rect)', `(rect ${this.mouseRect.x} ${this.mouseRect.y} ${this.mouseRect.w} ${this.mouseRect.h})`)
      this.mouseRect.t = 'rect'
      ronin.surface.stroke(this.mouseRect, 2, 'white', ronin.surface.guide)
    }

    if (next.substr(0, 5) === 'line)') {
      value = value.replace('($line)', `(line (pos ${this.mouseRect.a.x} ${this.mouseRect.a.y}) (pos ${this.mouseRect.b.x} ${this.mouseRect.b.y}))`)
      this.mouseRect.t = 'line'
      ronin.surface.stroke(this.mouseRect, 2, 'white', ronin.surface.guide)
    }

    this._input.value = value
  }

  // Display

  this.show = function () {
    if (this.isVisible === true) { return }
    ronin.el.className = ''
    this.isVisible = true
  }

  this.hide = function () {
    if (this.isVisible !== true) { return }
    ronin.el.className = 'hidden'
    this.isVisible = false
  }

  this.toggle = function () {
    if (this.isVisible !== true) {
      this.show()
    } else {
      this.hide()
    }
  }
}
