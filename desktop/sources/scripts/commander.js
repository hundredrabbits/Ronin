function Commander (ronin) {
  this.el = document.createElement('div')
  this.el.id = 'commander'
  this._input = document.createElement('textarea')
  this._status = document.createElement('div')
  this._status.id = 'status'

  this.install = function (host) {
    this.el.appendChild(this._input)
    this.el.appendChild(this._status)
    host.appendChild(this.el)

    this._input.addEventListener('input', this.onInput)

    window.addEventListener('dragover', this.drag)
    window.addEventListener('drop', this.drop)
  }

  this.start = function () {
    this._status.textContent = 'Idle. (zoom 100%)'
    this._input.focus()
    this.run()
  }

  this.run = function (txt = this._input.value) {
    console.log('========')
    const inter = new Lisp(txt, ronin.library)
    inter.toPixels()
  }

  this.load = function (txt) {
    this._input.value = txt
    this.run()
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
    this._status.textContent = `${this.mouseRect.x},${this.mouseRect.y} ${this.mouseRect.w},${this.mouseRect.h}`
    this.capture()
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
    this._status.textContent = `${this.mouseRect.x},${this.mouseRect.y} ${this.mouseRect.w},${this.mouseRect.h}`
    this.commit()
  }

  // Injection

  this.cache = ''

  this.capture = function () {
    this.cache = this._input.value
  }

  this.commit = function () {
    let value = this.cache

    if (value.indexOf('$') < 0) {
      return
    }

    const next = value.split('$')[1]

    if (next.substr(0, 4) === 'pos)') {
      value = value.replace('($pos)', `(pos ${this.mouseRect.x} ${this.mouseRect.y})`)
    }

    if (next.substr(0, 5) === 'rect)') {
      value = value.replace('($rect)', `(rect ${this.mouseRect.x} ${this.mouseRect.y} ${this.mouseRect.w} ${this.mouseRect.h})`)
    }

    if (next.substr(0, 5) === 'line)') {
      value = value.replace('($line)', `(line (pos ${this.mouseRect.a.x} ${this.mouseRect.a.y}) (pos ${this.mouseRect.b.x} ${this.mouseRect.b.y}))`)
    }

    this._input.value = value
  }

  // Events

  this.drag = function (e) {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  this.drop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    if (!file || !file.name || file.name.indexOf('.lisp') < 0) { console.warn('File', 'Not a .lisp file.'); return }
    const reader = new FileReader()
    reader.onload = function (e) {
      ronin.commander.load(e.target.result)
    }
    reader.readAsText(file)
  }
}
