function Library (ronin) {
  this.import = async (path, rect) => { // Imports a graphic file with format.
    const img = new Image()
    img.src = path
    return ronin.surface.draw(img, rect)
  }

  this.export = (path, format = 'image/png', quality = 1.0) => { // Exports a graphic file with format.
    if (!path) { console.warn('Missing export path'); return path }
    var dataUrl = ronin.surface.el.toDataURL(format, quality)
    const data = dataUrl.replace(/^data:image\/png;base64,/, '')
    fs.writeFileSync(path, data, 'base64')
    return path
  }

  // Shapes

  this.pos = (x, y, t = 'pos') => { // Returns a position shape.
    return { x, y, t }
  }

  this.size = (w, h, t = 'size') => { // Returns a size shape.
    return { w, h, t }
  }

  this.rect = (x, y, w, h, t = 'rect') => { // Returns a rect shape.
    return { x, y, w, h, t }
  }

  this.circle = (x, y, r, t = 'circle') => { // Returns a circle shape.
    return { x, y, r, t }
  }

  this.line = (a, b, t = 'line') => { // Returns a line shape.
    return { a, b, t }
  }

  this.text = (x, y, g, s, f = 'Arial', t = 'text') => { // Returns a text shape.
    return { x, y, g, s, f, t }
  }

  this.svg = (d, t = 'svg') => { // Returns a svg shape.
    return { d, t }
  }

  // Actions

  this.stroke = (shape = this.frame(), thickness, color) => { // Strokes a shape.
    ronin.surface.stroke(shape, thickness, color)
    return shape
  }

  this.fill = (rect = this.frame(), color) => { // Fills a shape.
    ronin.surface.fill(rect, color)
    return rect
  }

  this.clear = (rect = this.frame()) => { // Clears a rect.
    ronin.surface.clear(rect)
    return rect
  }

  // Math

  this.add = (...args) => { // Adds values.
    return args.reduce((sum, val) => sum + val)
  }

  this.sub = (...args) => { // Subtracts values.
    return args.reduce((sum, val) => sum - val)
  }

  this.mul = (...args) => { // Multiplies values.
    return args.reduce((sum, val) => sum * val)
  }

  this.div = (...args) => { // Divides values.
    return args.reduce((sum, val) => sum / val)
  }

  this.mod = (a, b) => { // Returns the modulo of a and b.
    return a % b
  }

  this.clamp = (val, min, max) => { // Clamps a value between min and max.
    return Math.min(max, Math.max(min, val))
  }

  this.step = (val, step) => {
    return Math.round(val / step) * step
  }

  this.min = Math.min

  this.max = Math.max

  this.ceil = Math.ceil

  this.floor = Math.floor

  this.sin = Math.sin

  this.cos = Math.cos

  this.PI = Math.PI

  this.TWO_PI = Math.PI * 2

  this.random = (...args) => {
    if (args.length >= 2) {
      // (random start end)
      return args[0] + Math.random() * (args[1] - args[0])
    } else if (args.length === 1) {
      // (random max)
      return Math.random() * args[0]
    }
    return Math.random()
  }

  // Logic

  this.gt = (a, b) => { // Returns true if a is greater than b, else false.
    return a > b
  }

  this.lt = (a, b) => { // Returns true if a is less than b, else false.
    return a < b
  }

  this.eq = (a, b) => { // Returns true if a is equal to b, else false.
    return a === b
  }

  this.and = (a, b, ...rest) => { // Returns true if all conditions are true.
    let args = [a, b].concat(rest)
    for (let i = 0; i < args.length; i++) {
      if (!args[i]) {
        return args[i]
      }
    }
    return args[args.length - 1]
  }

  this.or = (a, b, ...rest) => { // Returns true if at least one condition is true.
    let args = [a, b].concat(rest)
    for (let i = 0; i < args.length; i++) {
      if (args[i]) {
        return args[i]
      }
    }
    return args[args.length - 1]
  }

  // Arrays

  this.map = async (fn, arr) => {
    return Promise.all(arr.map(fn))
  }

  this.filter = (fn, arr) => {
    const list = Array.from(arr)
    return Promise.all(list.map((element, index) => fn(element, index, list)))
      .then(result => {
        return list.filter((_, index) => {
          return result[index]
        })
      })
  }

  this.reduce = async (fn, arr, acc) => {
    const length = arr.length
    let result = acc === undefined ? subject[0] : acc
    for (let i = acc === undefined ? 1 : 0; i < length; i++) {
      result = await fn(result, arr[i], i, arr)
    }
    return result;
  }

  this.len = (item) => { // Returns the length of a list.
    return item.length
  }

  this.first = (arr) => { // Returns the first item of a list.
    return arr[0]
  }

  this.last = (arr) => { // Returns the last
    return arr[arr.length - 1]
  }

  this.rest = ([_, ...arr]) => {
    return arr
  }

  this.range = (start, end, step = 1) => {
    let arr = []
    if (step > 0) {
      for (let i = start; i <= end; i += step) {
        arr.push(i)
      }
    } else {
      for (let i = start; i >= end; i += step) {
        arr.push(i)
      }
    }
    return arr
  }

  // Objects

  this.get = (item, key) => { // Gets an object's parameter with name.
    return item[key]
  }

  this.set = (item, key, val) => { // Sets an object's parameter with name as value.
    item[key] = val
    return item[key]
  }

  this.of = (h, ...keys) => {
    return keys.reduce((acc, key) => {
      return acc[key]
    }, h)
  }

  // Frame

  this.frame = () => { // Returns a rect of the frame.
    return ronin.surface.getFrame()
  }

  this.center = () => { // Returns a position of the center of the frame.
    const rect = this.frame()
    return this.pos(rect.w / 2, rect.h / 2)
  }

  this.scale = (rect, w, h) => {
    return { x: rect.x, y: rect.y, w: rect.w * w, h: rect.h * h }
  }

  this.resize = async (w, h, fit = true) => { // Resizes the canvas to target w and h, returns the rect.
    const rect = { x: 0, y: 0, w, h }
    const a = document.createElement('img')
    const b = document.createElement('img')
    a.src = ronin.surface.el.toDataURL()
    await ronin.surface.resizeImage(a, b)
    ronin.surface.resize(rect, fit)
    return ronin.surface.draw(b, rect)
  }

  this.rescale = async (w, h) => { // Rescales the canvas to target ratio of w and h, returns the rect.
    const rect = { x: 0, y: 0, w: this.frame().w * w, h: this.frame().h * h }
    const a = document.createElement('img')
    const b = document.createElement('img')
    a.src = ronin.surface.el.toDataURL()
    await ronin.surface.resizeImage(a, b)
    ronin.surface.resize(rect, true)
    return ronin.surface.draw(b, rect)
  }

  this.crop = async (rect) => {
    return ronin.surface.crop(rect)
  }

  this.clone = (a, b) => {
    ronin.surface.clone(a, b)
    return [a, b]
  }

  this.theme = (variable, el = document.documentElement) => {
    // ex. (theme "f_main") -> :root { --f_main: "#fff" }
    return getComputedStyle(el).getPropertyValue(`--${variable}`)
  }

  // Gradients

  this.gradient = ([x1, y1, x2, y2], colors = ['white', 'black']) => {
    return ronin.surface.linearGradient(x1, y1, x2, y2, colors)
  }

  // Pixels

  this.pixels = (rect, fn, q) => {
    const img = ronin.surface.context.getImageData(0, 0, rect.w, rect.h)
    for (let i = 0, loop = img.data.length; i < loop; i += 4) {
      const pixel = { r: img.data[i], g: img.data[i + 1], b: img.data[i + 2], a: img.data[i + 3] }
      const processed = fn(pixel, q)
      img.data[i] = processed[0]
      img.data[i + 1] = processed[1]
      img.data[i + 2] = processed[2]
      img.data[i + 3] = processed[3]
    }
    ronin.surface.context.putImageData(img, 0, 0)
    return rect
  }

  this.saturation = (pixel, q = 1) => {
    const color = 0.2126 * pixel.r + 0.7152 * pixel.g + 0.0722 * pixel.b
    return [(color * (1 - q)) + (pixel.r * q), (color * (1 - q)) + (pixel.g * q), (color * (1 - q)) + (pixel.b * q), pixel.a]
  }

  this.contrast = (pixel, q = 1) => {
    const intercept = 128 * (1 - q)
    return [pixel.r * q + intercept, pixel.g * q + intercept, pixel.b * q + intercept, pixel.a]
  }

  // Misc

  this.echo = (...args) => {
    ronin.log(args)
    return args
  }

  this.str = (...args) => {
    return args.reduce((acc, val) => { return acc + val }, '')
  }

  this.open = async (path) => { // Imports a graphic file and resizes the frame.
    return ronin.surface.open(path)
  }

  this.folder = (path = ronin.source.path) => { // Returns the content of a folder path.
    return fs.existsSync(path) ? fs.readdirSync(path) : []
  }

  this.exit = (force = false) => { // Exits Ronin.
    ronin.source.quit(force)
  }

  this.time = () => { // Returns timestamp in milliseconds.
    return Date.now
  }

  this.animate = (play = true) => { // Toggles animation.
    ronin.animate(play)
  }

  this.js = () => { // Javascript interop.
    return window
  }

  this.test = (name, a, b) => {
    if (`${a}` !== `${b}`) {
      console.warn('failed ' + name, a, b)
    } else {
      console.log('passed ' + name, a)
    }
    return a === b
  }
}
