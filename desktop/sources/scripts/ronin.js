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
  this.commander = new Commander()
  this.surface = new Surface()

  this.install = function (host = document.body) {
    host.appendChild(this.el)

    this.commander.install(this.el)
    this.surface.install(this.el)

    this.theme.install(host, () => { this.update() })
  }

  this.start = function () {
    this.theme.start()
    this.commander.start()
    this.surface.start()

    // window.addEventListener('dragover', ronin.io.drag_over)
    // window.addEventListener('drop', ronin.io.drop)
    // ronin.frame.el.addEventListener('mousedown', ronin.cursor.mouse_down)
    // ronin.frame.el.addEventListener('mousemove', ronin.cursor.mouse_move)
    // ronin.frame.el.addEventListener('mouseup', ronin.cursor.mouse_up)
    // ronin.frame.el.addEventListener('contextmenu', ronin.cursor.mouse_alt)
    // window.addEventListener('keydown', ronin.keyboard.key_down)
    // window.addEventListener('keyup', ronin.keyboard.key_up)

    console.log('Ronin', 'Started')
  }

  this.reset = function () {
    this.theme.reset()
  }

  this.update = function () {

  }

  this.load = function (content = this.default()) {

  }
}
