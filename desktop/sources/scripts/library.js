function Library (ronin) {
  this.clear = (rect = this.select_all()) => {
  }

  // IO

  this.open = (path, w = 1, h = 1) => {
    ronin.surface.open(path, { w, h })
    return path
  }

  this.save = function (path, type = 'jpg') {
    console.log('save', path)
    // TODO: Save file
    return path
  }

  this.draw = (path, rect) => {
    ronin.surface.draw(path, rect)
    return rect
  }

  this.exit = () => {
    // TODO: Closes Ronin
  }

  // Logic

  this.gt = (a, b) => {
    return a > b
  }

  this.lt = (a, b) => {
    return a < b
  }

  this.eq = (a, b) => {
    return a === b
  }

  this.and = (...args) => {
    for (let i = 0; i < args.length; i++) {
      if (!args[i]) {
        return args[i]
      }
    }
    return args[args.length - 1]
  }

  this.or = (...args) => {
    for (let i = 0; i < args.length; i++) {
      if (args[i]) {
        return args[i]
      }
    }
    return args[args.length - 1]
  }

  // Arrays

  this.map = (fn, arr) => {
    return arr.map(fn)
  }

  this.filter = (fn, arr) => {
    return arr.filter(fn)
  }

  this.first = (arr) => {
    return arr[0]
  }

  this.last = (arr) => {
    return arr[arr.length - 1]
  }

  this.rest = ([_, ...arr]) => {
    return arr
  }

  // Shapes

  this.pos = (x, y, t = 'pos') => {
    return { x, y }
  }

  this.size = (w, h, t = 'size') => {
    return { w, h }
  }

  this.rect = (x, y, w, h, t = 'rect') => {
    return { x, y, w, h, t }
  }

  this.circle = (x, y, r, t = 'circle') => {
    return { x, y, r, t }
  }

  this.line = (a, b, t = 'line') => {
    return { a, b, t }
  }

  this.frame = () => {
    return ronin.surface.getFrame()
  }

  this.center = () => {
    const rect = this.frame()
    return this.pos(rect.w / 2, rect.h / 2)
  }

  this.path = (path) => {
    return path
  }

  this.scale = (rect, w, h) => {
    return { x: rect.x, y: rect.y, w: rect.w * w, h: rect.h * h }
  }

  // Copy/Paste

  this.clone = (a, b) => {
    ronin.surface.clone(a, b)
    return [a, b]
  }

  this.stroke = (shape = this.frame(), thickness, color) => {
    ronin.surface.stroke(shape, thickness, color)
    return shape
  }

  this.fill = (rect = this.frame(), color) => {
    ronin.surface.fill(rect, color)
    return rect
  }

  this.clear = (rect = this.frame()) => {
    ronin.surface.clear(rect)
    return rect
  }

  //

  this.of = function (h, k) {
    return h[k]
  }

  // Math

  this.add = function (...args) {
    return args.reduce((sum, val) => sum + val)
  }

  this.sub = function (...args) {
    return args.reduce((sum, val) => sum - val)
  }

  this.mul = function (...args) {
    return args.reduce((sum, val) => sum * val)
  }

  this.div = function (...args) {
    return args.reduce((sum, val) => sum / val)
  }

  this.mod = function (a, b) {
    return a % b
  }

  this.clamp = function (val, min, max) {
    return Math.min(max, Math.max(min, val))
  }

  this.step = function (val, step) {
    return Math.round(val / step) * step
  }

  // Generics

  this.echo = function (...args) {
    console.log(args.reduce((acc, val) => { return acc + val + ' ' }, ''))
    return args
  }

  this.test = function (name, a, b) {
    if (a !== b) {
      console.warn('failed ' + name, a, b)
    } else {
      console.log('passed ' + name, a, b)
    }
    return a === b
  }
}
