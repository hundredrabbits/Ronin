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
