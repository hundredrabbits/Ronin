function Library (ronin) {
  this.open = async (path) => {
    return ronin.surface.open(path)
  }

  this.export = (path, type = 'image/png', quality = 1.0) => {
    if (!path) { console.warn('Missing export path'); return path }
    var dataUrl = ronin.surface.el.toDataURL(type, quality)
    const data = dataUrl.replace(/^data:image\/png;base64,/, '')
    fs.writeFileSync(path, data, 'base64')
    return path
  }

  this.draw = async (path, rect) => {
    const img = new Image()
    img.src = path
    return ronin.surface.draw(img, rect)
  }

  this.resize = async (w = 1, h = 1) => {
    const rect = w <= 1 || h <= 1 ? { x: 0, y: 0, w: this.frame().w * w, h: this.frame().h * h } : { x: 0, y: 0, w, h }
    const a = document.createElement('img')
    const b = document.createElement('img')
    a.src = ronin.surface.el.toDataURL()
    ronin.surface.resizeImage(a, b)
    ronin.surface.resize(rect, true)
    return ronin.surface.draw(b, rect)
  }

  this.crop = async (rect) => {
    return ronin.surface.crop(rect)
  }

  this.folder = (path = ronin.source.path) => {
    return fs.existsSync(path) ? fs.readdirSync(path) : []
  }

  this.exit = () => {
    ronin.source.quit()
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

  this.and = (a, b, ...rest) => {
    let args = [a, b].concat(rest)
    for (let i = 0; i < args.length; i++) {
      if (!args[i]) {
        return args[i]
      }
    }
    return args[args.length - 1]
  }

  this.or = (a, b, ...rest) => {
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

  this._filter = (fn, arr) => {
    return arr.filter(fn)
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

  this.reduce = (fn, arr, acc = 0) => {
    return arr.reduce(fn, acc)
  }

  this.len = (item) => {
    return item.length
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

  // Shapes

  this.pos = (x, y, t = 'pos') => {
    return { x, y, t }
  }

  this.size = (w, h, t = 'size') => {
    return { w, h, t }
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

  this.text = (x, y, g, s, f = 'Arial', t = 'text') => {
    return { x, y, g, s, f, t }
  }

  this.svg = (d, t = 'svg') => {
    return { d, t }
  }

  // Helpers

  this.frame = () => {
    return ronin.surface.getFrame()
  }

  this.center = () => {
    const rect = this.frame()
    return this.pos(rect.w / 2, rect.h / 2)
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

  this.get = (item, key) => {
    return item[key]
  }

  this.set = (item, key, val) => {
    item[key] = val
    return item[key]
  }

  // TODO: Should remove (of) for (get)?

  this.of = (h, ...keys) => {
    return keys.reduce((acc, key) => {
      return acc[key]
    }, h)
  }

  this.theme = (variable, el = document.documentElement) => {
    // ex. (theme "f_main") -> :root { --f_main: "#fff" }
    return getComputedStyle(el).getPropertyValue(`--${variable}`)
  }

  // Gradients

  this.gradient = ([x1,y1,x2,y2], colors=['white','black']) => {
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

  // Math

  this.add = (...args) => {
    return args.reduce((sum, val) => sum + val)
  }

  this.sub = (...args) => {
    return args.reduce((sum, val) => sum - val)
  }

  this.mul = (...args) => {
    return args.reduce((sum, val) => sum * val)
  }

  this.div = (...args) => {
    return args.reduce((sum, val) => sum / val)
  }

  this.mod = (a, b) => {
    return a % b
  }

  this.clamp = (val, min, max) => {
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

  // Generics

  this.echo = (...args) => {
    ronin.log(args)
    return args
  }

  this.str = (...args) => {
    return args.reduce((acc, val) => { return acc + val }, '')
  }

  this.test = (name, a, b) => {
    if (Array.isArray(a)) {
      // TODO: make testing more solid
      a = a.toString()
      b = b.toString()
    }
    if (a !== b) {
      console.warn('failed ' + name, a, b)
    } else {
      console.log('passed ' + name, a)
    }
    return a === b
  }

  // Livecoding
  this.time = Date.now

  // javascript interop
  this.js = window

  // Client
  this.ronin = ronin
}
