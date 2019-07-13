function Commander () {
  this.el = document.createElement('yu')
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

; Get Image

(load "../media/test.png" 
  (rect 0 0 600 600))

; Some operations

(scale 0.5 0.5 
  (resize 150 150 
    (crop 
      (rect 0 0 300 300))))`.trim()

    this._status.textContent = 'Idle, RUN(cmd+enter).'

    this._input.focus()
  }

  this.update = function () {

  }

  this.onInput = function () {

  }

  this.getQuery = function () {

  }
}
