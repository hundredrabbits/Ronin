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
  }

  this.start = function () {
    this._input.value = `
(clear)
(stroke (rect 15 15 120 80))
`.trim()

    this._status.textContent = 'Idle, RUN(cmd+enter).'

    this._input.focus()
    this.run()
  }

  this.run = function (txt = this._input.value) {
    const inter = new Lisp(txt, ronin.library)
    console.log(inter.toPixels())
  }

  this.update = function () {

  }

  this.onInput = function () {

  }

  this.getQuery = function () {

  }
}
