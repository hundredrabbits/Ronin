function Cursor (rune) {
  this.line = { origin: null, from: null, to: null, destination: null }
  this.is_down = false
  this.query = null
  this.mode = 'vertex'

  this.size = 2
  this.pos = { x: 0, y: 0 }

  this.target = null

  this.mouse_pos = function (e) {
    var pos = { x: e.clientX, y: e.clientY }

    pos.x = ((pos.x / ronin.frame.width) / ronin.frame.zoom.scale) * ronin.frame.width
    pos.y = ((pos.y / ronin.frame.height) / ronin.frame.zoom.scale) * ronin.frame.height

    pos.x -= (ronin.frame.zoom.offset.x / ronin.frame.zoom.scale)
    pos.y -= (ronin.frame.zoom.offset.y / ronin.frame.zoom.scale)

    return pos
  }

  this.mouse_down = function (e) {
    e.preventDefault()

    var pos = ronin.cursor.mouse_pos(e)

    ronin.commander.blur()

    ronin.cursor.line.origin = { x: pos.x, y: pos.y }
    ronin.cursor.line.from = { x: pos.x, y: pos.y }

    // Save original query
    ronin.cursor.query = ronin.commander.input_el.value

    if (ronin.commander.active_module()) { /* DO NOTHING */ } else if (e.shiftKey) { /* DO NOTHING */ } else if (e.altKey && e.shiftKey) { ronin.brush.methods.pick.run(pos) } else if (e.altKey) { ronin.brush.erase(ronin.cursor.line) } else { ronin.brush.stroke(ronin.cursor.line) }

    if (e.shiftKey) { ronin.cursor.mode = 'rect' }
    if (e.altKey) { ronin.cursor.mode = 'arc_to' }
    if (e.ctrlKey) { ronin.cursor.mode = 'cc_arc_to' }
  }

  this.mouse_move = function (e) {
    e.preventDefault()

    var pos = ronin.cursor.mouse_pos(e)
    ronin.cursor.pos = pos

    if (!ronin.cursor.line.from) { return }

    ronin.cursor.line.to = { x: pos.x, y: pos.y }

    if (ronin.commander.active_module()) { ronin.cursor.inject_query() } else if (e.altKey && e.shiftKey) { ronin.brush.methods.pick.run(pos) } else if (e.shiftKey) { ronin.cursor.drag(ronin.cursor.line) } else if (e.altKey) { ronin.brush.erase(ronin.cursor.line) } else { ronin.brush.stroke(ronin.cursor.line) }

    ronin.cursor.line.from = { x: pos.x, y: pos.y }
  }

  this.mouse_up = function (e) {
    e.preventDefault()

    var pos = ronin.cursor.mouse_pos(e)

    ronin.cursor.line.destination = { x: pos.x, y: pos.y }

    ronin.cursor.inject_query()

    ronin.cursor.is_down = false
    ronin.cursor.line = {}
    ronin.cursor.mode = 'vertex'

    ronin.cursor.query = ronin.commander.input_el.value
    ronin.brush.absolute_thickness = 0
  }

  this.mouse_alt = function (e) {
    console.log(e)
  }

  this.drag = function (line) {
    var offset = make_offset(line.from, line.to)
    var data = ronin.cursor.target.select()
    ronin.cursor.target.clear()
    ronin.cursor.target.context().putImageData(data, offset.x * -2, offset.y * -2)
  }

  this.swap_layer = function () {
    this.target = this.target.name == 'above' ? ronin.layers.below : ronin.layers.above
    ronin.commander.update()
  }

  this.select_layer = function (layer) {
    this.target = layer
    ronin.commander.update()
  }

  function make_offset (a, b) {
    return { x: a.x - b.x, y: a.y - b.y }
  }

  this.inject_query = function () {
    if (ronin.cursor.query && ronin.cursor.query.indexOf('$') < 0) { return }

    var a = ronin.cursor.line.origin
    var b = ronin.cursor.line.destination ? ronin.cursor.line.destination : ronin.cursor.line.from

    var str = '<error>'

    if (ronin.cursor.mode == 'vertex') {
      str = b.x + ',' + b.y
    } else if (ronin.cursor.mode == 'rect') {
      var offset = a.x + ',' + a.y
      var rect = (b.x - a.x) + 'x' + (b.y - a.y)
      str = offset + '|' + rect
    } else if (ronin.cursor.mode == 'arc_to') {
      str = '@>' + b.x + ',' + b.y
    } else if (ronin.cursor.mode == 'cc_arc_to') {
      str = '@<' + b.x + ',' + b.y
    }
    //
    var i = ronin.cursor.query ? ronin.cursor.query.indexOf('$') : ''
    var i1 = ronin.cursor.query ? ronin.cursor.query.substr(i, 2) : ''
    var e1 = ronin.cursor.query ? ronin.cursor.query.substr(i - 1, 2) : ''

    if (e1 == '#$') {
      var r = parseInt((b.x / ronin.frame.width) * 255)
      var g = 255 - parseInt((b.x / ronin.frame.width) * 255)
      var b = parseInt((b.y / ronin.frame.height) * 255)
      var str = new Color().rgb_to_hex([r, g, b])
      ronin.commander.inject(ronin.cursor.query.replace('#$', str + ' '))
    } else if (i1 == '$+') {
      ronin.commander.inject(ronin.cursor.query.replace('$+', str + '&$+'))
    } else if (ronin.cursor.query) {
      ronin.commander.inject(ronin.cursor.query.replace('$', str))
    }
  }

  this.hint = function () {
    var html = ''

    var mode = 'paint'

    if (ronin.keyboard.is_down['Alt'] && ronin.keyboard.is_down['Shift']) {
      mode = 'pick'
    } else if (ronin.keyboard.is_down['Alt']) {
      mode = 'erase'
    } else if (ronin.keyboard.is_down['Shift']) {
      mode = 'drag'
    }

    return `
    <t class='frame'>${ronin.frame.width}X${ronin.frame.height} ${(ronin.frame.width / ronin.frame.height).toFixed(2)}:1</t>
    <t class='target_${ronin.cursor.target.name}'></t><t class='size ${mode}'>${ronin.cursor.size}</t><t class='zoom'>${ronin.frame.zoom.scale}</t>
    ${ronin.brush.swatch.hint()}`
  }

  function distance_between (a, b) {
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
  }
}
