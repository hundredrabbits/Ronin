function Library (ronin) {
  this.import = async (path, rect) => { // Imports a graphic file with format.
    const img = new Image()
    img.src = path
    return ronin.surface.draw(img, rect)
  }

  this.export = (path, format = 'image/png', quality = 1.0) => { // Exports a graphic file with format.
    if (!path) { console.warn('Missing export path'); return path }
    const dataUrl = ronin.surface.el.toDataURL(format, quality)
    const data = dataUrl.replace(/^data:image\/png;base64,/, '').replace(/^data:image\/jpeg;base64,/, '')
    fs.writeFileSync(path, data, 'base64')
    return path
  }

  this.open = async (path) => { // Imports a graphic file and resizes the frame.
    return ronin.surface.open(path)
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

  this.circle = (cx, cy, r, t = 'circle') => { // Returns a circle shape.
    return { cx, cy, r, t }
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

  // Frame

  this.frame = () => { // Returns a rect of the frame.
    return ronin.surface.getFrame()
  }

  this.center = () => { // Returns a position of the center of the frame.
    const rect = this.frame()
    return this.pos(rect.w / 2, rect.h / 2)
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

  this.crop = async (rect) => { // Crop canvas to rect.
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

  // Strings

  this.concat = function (...items) { // Concat multiple strings.
    return items.reduce((acc, item) => { return `${acc}${item}` }, '')
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
    return result
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

  this.set = (item, ...args) => { // Sets an object's parameter with name as value.
    for (let i = 0; i < args.length; i += 2) {
      const key = args[i]
      const val = args[i + 1]
      item[key] = val
    }
    return item
  }

  this.of = (h, ...keys) => { // Gets object parameters with names.
    return keys.reduce((acc, key) => {
      return acc[key]
    }, h)
  }

  this.keys = (item) => { // Returns a list of the object's keys
    return Object.keys(item)
  }

  this.values = (item) => { // Returns a list of the object's values
    return Object.values(item)
  }

  // Convolve

  this.convolve = (rect, kernel) => {
    const sigma = kernel.flat().reduce((a, x) => (a + x))
    const kw = kernel[0].length; const kh = kernel.length
    const img = ronin.surface.context.getImageData(rect.x, rect.y, rect.w, rect.h)
    const out = new Uint8ClampedArray(rect.w * 4 * rect.h)
    for (let i = 0, outer = img.data.length; i < outer; i++) { // bytes
      const ix = Math.floor(i / 4) % rect.w; const iy = Math.floor((i / 4) / rect.w)
      let acc = 0.0
      for (let k = 0, inner = kw * kh; k < inner; k++) { // kernel
        const kx = (k % kw); const ky = (Math.floor(k / kw))
        const x = Math.ceil(ix + kx - kw / 2); const y = Math.ceil(iy + ky - kh / 2)
        if (x < 0 || x >= rect.w || y < 0 || y >= rect.h) continue // edge case
        acc += img.data[x * 4 + y * rect.w * 4 + i % 4] * kernel[kx][ky] / sigma
      }
      out[i] = acc
      if (i % 4 == 3) out[i] = 255
    }
    img.data.set(out, 0)
    ronin.surface.context.putImageData(img, rect.x, rect.y)
    return rect
  }

  this.blur = [[1, 2, 1],
    [2, 4, 2],
    [1, 2, 2]]

  this.sharpen = [[ 0, -1, 0],
    [-1, 5, -1],
    [ 0, -1, 0]]

  this.edge = [[-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1]]

  // File System

  this.dir = (path = this.dirpath()) => { // Returns the content of a directory.
    return fs.existsSync(path) ? fs.readdirSync(path) : []
  }

  this.file = (path = this.filepath()) => { // Returns the content of a file.
    return fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : ''
  }

  this.dirpath = (path = this.filepath()) => { // Returns the path of a directory.
    return require('path').dirname(path)
  }

  this.filepath = (path = ronin.source.path) => { // Returns the path of a file.
    return path
  }

  this.exit = (force = false) => { // Exits Ronin.
    ronin.source.quit(force)
  }

  this.echo = (...args) => {
    ronin.log(args)
    return args
  }

  this.table = (arg) => {
    console.table(arg)
    return arg
  }

  this.debug = (arg) => {
    console.log(arg)
    return arg
  }

  this.time = (rate = 1) => { // Returns timestamp in milliseconds.
    return (Date.now() * rate)
  }

  this.animate = (play = true) => { // Toggles animation.
    ronin.animate(play)
  }

  this.js = () => { // Javascript interop.
    return window
  }

  this.on = (event, f) => {
    ronin.bind(event, f)
  }

  this.test = (name, a, b) => {
    if (`${a}` !== `${b}`) {
      console.warn('failed ' + name, a, b)
    } else {
      console.log('passed ' + name, a)
    }
    return a === b
  }

  this.benchmark = async (fn) => { // logs time taken to execute a function.
    const start = Date.now()
    const result = await fn()
    console.log(`time taken: ${Date.now() - start}ms`)
    return result
  }

  // IO

  this.osc = (path) => { // Returns the latest osc message at path
    return path ? ronin.osc.msg[path] : ronin.osc.msg
  }
}
