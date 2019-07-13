function Ronin () {
  const defaultTheme = {
    background: '#eee',
    f_high: '#000',
    f_med: '#999',
    f_low: '#ccc',
    f_inv: '#000',
    b_high: '#000',
    b_med: '#888',
    b_low: '#aaa',
    b_inv: '#ffb545'
  }

  this.el = document.createElement('yu')
  this.el.id = 'ronin'

  this.theme = new Theme(defaultTheme)
  this.commander = new Commander(this)
  this.surface = new Surface(this)
  this.library = new Library(this)

  this.install = function (host = document.body) {
    this.commander.install(this.el)
    this.surface.install(this.el)
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

  this.load = function (content = this.default()) {

  }
}
