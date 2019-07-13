function Ronin () {
  const defaultTheme = {
    background: '#222',
    f_high: '#000',
    f_med: '#999',
    f_low: '#ccc',
    f_inv: '#000',
    b_high: '#000',
    b_med: '#888',
    b_low: '#aaa',
    b_inv: '#ffb545'
  }

  this.el = document.createElement('div')
  this.el.id = 'ronin'

  this.theme = new Theme(defaultTheme)
  this.commander = new Commander(this)
  this.surface = new Surface(this)
  this.library = new Library(this)

  this.install = function (host = document.body) {
    this._wrapper = document.createElement('div')
    this._wrapper.id = 'wrapper'

    this.commander.install(this._wrapper)
    this.surface.install(this._wrapper)
    this.el.appendChild(this._wrapper)
    host.appendChild(this.el)
    this.theme.install()
  }

  this.start = function () {
    this.theme.start()
    this.commander.start()
    this.surface.start()

    console.log('Ronin', 'Started')
  }

  this.reset = function () {
    this.theme.reset()
  }

  this.log = function (msg) {
    this.commander.setStatus(msg)
  }

  this.load = function (content = this.default()) {

  }
}
