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

  this.keyboard = new Keyboard()
  this.commander = new Commander()
  this.cursor = new Cursor()
  this.docs = new Docs()

  this.guide = new Guide()
  this.above = new Layer('above')
  this.below = new Layer('below')

  this.io = new IO()
  this.brush = new Brush()
  this.frame = new Frame()
  this.path = new Path()
  this.filter = new Filter()
  this.type = new Type()

  this.layers = {
    guide: this.guide,
    above: this.above,
    below: this.below,
    cursor: this.cursor,
    guide: this.guide
  }

  this.modules = {
    brush: this.brush,
    frame: this.frame,
    io: this.io,
    path: this.path,
    filter: this.filter,
    type: this.type
  }

  this.install = function (host) {
    this.brush.swatch.start()

    document.body.appendChild(this.el)

    this.frame.width = window.innerWidth
    this.frame.height = window.innerHeight

    this.commander.install()
    this.frame.install()

    this.cursor.target = this.layers.above

    // this.guide.install();
    this.above.install()
    this.below.install()
    this.guide.install()

    this.guide.update()
    this.theme.install(host, () => { this.update() })
  }

  this.start = function () {
    this.theme.start()
    window.addEventListener('dragover', ronin.io.drag_over)
    window.addEventListener('drop', ronin.io.drop)
    ronin.frame.el.addEventListener('mousedown', ronin.cursor.mouse_down)
    ronin.frame.el.addEventListener('mousemove', ronin.cursor.mouse_move)
    ronin.frame.el.addEventListener('mouseup', ronin.cursor.mouse_up)
    ronin.frame.el.addEventListener('contextmenu', ronin.cursor.mouse_alt)
    window.addEventListener('keydown', ronin.keyboard.key_down)
    window.addEventListener('keyup', ronin.keyboard.key_up)
    ronin.commander.input_el.addEventListener('input', ronin.commander.on_input)

    console.log('Ronin', 'Started')
    this.above.update()
    this.below.update()
    this.guide.update()
    this.commander.update()

    this.load()
  }

  this.reset = function () {
    this.theme.reset()
  }

  this.update = function () {

  }

  this.load = function (content = this.default()) {

  }

  this.default = function () {
    return 'select_layer:below ; fill:#fff ; select_layer:above ; add_cursor:1,1 ; add_cursor:-1,-1'
  }
}
