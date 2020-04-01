'use strict'

/* global Image */

function Library (client) {
  // IO
  this.open = (name, scale = 1) => { // Import a graphic and scale canvas to fit.
    const img = client.cache.get(name)
    if (!img) { client.log('No data for ' + name); return }
    const rect = this.rect(0, 0, img.width * scale, img.height * scale)
    this.resize(rect.w, rect.h)
    this.import(name, rect)
    return rect
  }

  this.import = (name, shape, alpha = 1) => { // Imports a graphic file with format.
    const img = client.cache.get(name)
    if (!img) { client.log('No data for ' + name); return }
    client.surface.draw(img, shape, alpha)
    return shape || this.rect(0, 0, img.width, img.height)
  }

  this.export = (name = 'ronin', type = 'image/png', quality = 1.0) => { // Exports a graphic file with format.
    const ext = type === 'image/png' ? name + '.png' : name + '.jpg'
    client.source.write(name, ext, client.surface.el.toDataURL(type, quality), type)
  }

  // Shapes

  this.pos = (x = 0, y = 0) => { // Returns a position shape.
    return { x, y }
  }

  this.line = (ax, ay, bx, by) => { // Returns a line shape.
    return { a: this.pos(ax, ay), b: this.pos(bx, by) }
  }

  this.size = (w, h) => { // Returns a size shape.
    return { w, h }
  }

  this.rect = (x, y, w, h) => { // Returns a rect shape.
    return { x, y, w, h, pos: { x, y }, size: { w, h } }
  }

  this.circle = (cx, cy, r) => { // Returns a circle shape.
    return { cx, cy, r }
  }

  this.ellipse = (cx, cy, rx, ry) => { // Returns a ellipse shape.
    return { cx, cy, rx, ry }
  }

  this.arc = (cx, cy, r, sa, ea) => { // Returns an arc shape.
    return { cx, cy, r, sa, ea }
  }

  this.poly = (...pos) => { // Returns a poly shape.
    return pos
  }

  this.text = (x, y, p, t, a = 'left', f = 'Arial') => { // Returns a text shape.
    return { x, y, p, t, a, f }
  }

  this.svg = (x, y, d) => { // Returns a svg shape.
    return { x, y, d }
  }

  this.color = (r, g, b, a = 1) => { // Returns a color object.
    const hex = '#' + ('0' + parseInt(r, 10).toString(16)).slice(-2) + ('0' + parseInt(g, 10).toString(16)).slice(-2) + ('0' + parseInt(b, 10).toString(16)).slice(-2)
    const rgba = `rgba(${r},${g},${b},${a})`
    return { r, g, b, a, hex, rgba, toString: () => { return rgba }, 0: r, 1: g, 2: b, 3: a, f: [r / 255, g / 255, b / 255, a] }
  }

  this.hsl = (h, s, l, a = 1) => { // returns a HSL color object
    return { h, s, l, a, toString: () => { return `hsla(${h},${s}%,${l}%,${a})` }, 0: h, 1: s, 2: l, 3: a, f: [h / 360, s / 100, l / 100, a] }
  }

  // Frame

  this.resize = (w = client.surface.bounds().w, h = client.surface.bounds().h, fit = true) => { // Resizes the canvas to target w and h, returns the rect.
    if (w === this['get-frame']().w && h === this['get-frame']().h) { return }
    const rect = { x: 0, y: 0, w, h }
    const a = document.createElement('img')
    const b = document.createElement('img')
    a.src = client.surface.el.toDataURL()
    client.surface.resizeImage(a, b)
    client.surface.resize(rect, fit)
    return client.surface.draw(b, rect)
  }

  this.rescale = (w = 1, h) => { // Rescales the canvas to target ratio of w and h, returns the rect.
    const rect = { x: 0, y: 0, w: this['get-frame']().w * w, h: this['get-frame']().h * (h || w) }
    const a = document.createElement('img')
    const b = document.createElement('img')
    a.src = client.surface.el.toDataURL()
    client.surface.resizeImage(a, b)
    client.surface.resize(rect, true)
    return client.surface.draw(b, rect)
  }

  this.crop = (rect = this['get-frame']()) => { // Crop canvas to rect.
    return client.surface.crop(rect)
  }

  this.copy = (rect = this['get-frame']()) => { // Copy a section of the canvas.
    return client.surface.copy(rect)
  }

  this.paste = (copy, rect = this['get-frame']()) => { // Paste a section of the canvas.
    return client.surface.paste(copy, rect)
  }

  this.drag = (rect = this['get-frame'](), line = this.line()) => { // Drag a part of the canvas.
    const pos = { x: line.b.x - line.a.x, y: line.b.y - line.a.y }
    const crop = client.surface.copy(rect)
    client.surface.clear(rect)
    this.guide({ a: { x: rect.x, y: rect.y }, b: { x: pos.x + rect.x, y: pos.y + rect.y } })
    this.guide(rect)
    this.guide(this.offset(rect, { x: pos.x, y: pos.y }))
    client.surface.context.drawImage(crop, rect.x, rect.y)
  }

  this.view = (a, b) => { // View a part of the canvas.
    if (!a || !b) { return }
    this.guide({ a: { x: a.x, y: a.y }, b: { x: b.x, y: b.y } })
    this.guide(a)
    this.guide(b)
    client.surface.context.drawImage(this.copy(a), b.x, b.y, b.w, b.h)
  }

  this.pick = (shape = this['get-frame']()) => { // Returns the color of a pixel at pos, or of the average of the pixels in rect.
    const rect = shape.w && shape.h ? shape : this.rect(shape.x, shape.y, 1, 1)
    const img = client.surface.context.getImageData(rect.x, rect.y, rect.w, rect.h)
    const sum = [0, 0, 0]
    const count = img.data.length / 4
    for (let i = 0, loop = img.data.length; i < loop; i += 4) {
      sum[0] += img.data[i]
      sum[1] += img.data[i + 1]
      sum[2] += img.data[i + 2]
    }
    return this.color(this.floor(sum[0] / count), this.floor(sum[1] / count), this.floor(sum[2] / count))
  }

  this.orient = (deg = 0) => { // Orient canvas with angle in degrees.
    const copy = this.copy()
    const frame = this['get-frame']()
    const mode = Math.floor(deg / 90) % 4
    const offset = { x: [0, 0, -frame.w, -frame.w], y: [0, -frame.h, -frame.h, 0] }
    const rect = { x: 0, y: 0, w: (mode === 1 || mode === 3 ? frame.h : frame.w), h: (mode === 1 || mode === 3 ? frame.w : frame.h) }
    client.surface.resize(rect, false)
    client.surface.context.save()
    client.surface.context.rotate(this.rad(mode * 90))
    client.surface.context.translate(offset.x[mode], offset.y[mode])
    client.surface.context.drawImage(copy, 0, 0)
    client.surface.context.restore()
  }

  this.mirror = { // Mirror canvas, methods: `x`, `y`.
    x: (j = 0) => {
      const copy = this.copy()
      const frame = this['get-frame']()
      client.surface.context.save()
      client.surface.context.translate(frame.w, 0)
      client.surface.context.scale(-1, 1)
      client.surface.context.drawImage(copy, 0, 0)
      client.surface.context.restore()
    },
    y: (j = 0) => {
      const copy = this.copy()
      const frame = this['get-frame']()
      client.surface.context.save()
      client.surface.context.translate(0, frame.h)
      client.surface.context.scale(1, -1)
      client.surface.context.drawImage(copy, 0, 0)
      client.surface.context.restore()
    }
  }

  // Transforms

  this.transform = { // The transform toolkit, methods `push`, `pop`, `reset`, `move`, `scale`, `rotate`.
    push: () => {
      client.surface.context.save()
    },
    pop: () => {
      client.surface.context.restore()
    },
    reset: () => {
      client.surface.context.resetTransform()
      client.surface.guide.resetTransform()
    },
    move: (x, y) => {
      client.surface.context.translate(x, y)
      this.guide(this.line(0, 0, x, y))
      client.surface.guide.translate(x, y)
    },
    scale: (w, h) => {
      client.surface.context.scale(w, h === undefined ? w : h)
      this.guide(this.rect(0, 0, 50 * w, 50 * h))
      client.surface.guide.scale(w, h === undefined ? w : h)
    },
    rotate: (a) => {
      client.surface.context.rotate(a)
      this.guide(this.arc(0, 0, 50, 0, a))
      client.surface.guide.rotate(a)
    }
  }

  // Actions

  this.stroke = (shape, color, thickness = 2) => { // Strokes a shape.
    client.surface.stroke(shape, color, thickness)
    return shape
  }

  this.fill = (rect = this['get-frame'](), color) => { // Fills a shape.
    client.surface.fill(rect, color)
    return rect
  }

  this.clear = (rect = this['get-frame']()) => { // Clears a rect.
    client.surface.clearGuide(rect)
    client.surface.clear(rect)
    return rect
  }

  this.gradient = (line, colors = ['white', 'black']) => { // Defines a gradient color.
    const gradient = client.surface.context.createLinearGradient(line.a.x, line.a.y, line.b.x, line.b.y)
    colors.forEach((color, i) => {
      gradient.addColorStop(i * (1 / (colors.length - 1)), color)
    })
    return gradient
  }

  this.guide = (shape, color) => { // Draws a shape on the guide layer.
    client.surface.drawGuide(shape, color)
    return shape
  }

  // Pixels

  this.pixels = (fn, q = 1, rect = this['get-frame']()) => {
    if (!fn) { console.warn('Unknown function'); return rect }
    const img = client.surface.context.getImageData(rect.x, rect.y, rect.w, rect.h)
    for (let i = 0, loop = img.data.length; i < loop; i += 4) {
      const pixel = [img.data[i], img.data[i + 1], img.data[i + 2], img.data[i + 3]]
      const processed = fn(pixel, q)
      img.data[i] = this.clamp(parseInt(processed[0]), 0, 255)
      img.data[i + 1] = this.clamp(parseInt(processed[1]), 0, 255)
      img.data[i + 2] = this.clamp(parseInt(processed[2]), 0, 255)
      img.data[i + 3] = this.clamp(parseInt(processed[3]), 0, 255)
    }
    client.surface.context.putImageData(img, rect.x, rect.y)
    return rect
  }

  this.saturation = (pixel, q) => { // Change the saturation of pixels.
    const color = this.lum(pixel)
    return [(color * (1 - q)) + (pixel[0] * q), (color * (1 - q)) + (pixel[1] * q), (color * (1 - q)) + (pixel[2] * q), pixel[3]]
  }

  this.contrast = (pixel, q) => { // Change the contrast of pixels.
    const intercept = 128 * (1 - q)
    return [pixel[0] * q + intercept, pixel[1] * q + intercept, pixel[2] * q + intercept, pixel[3]]
  }

  this.brightness = (pixel, q) => { // Change the brightness of pixels.
    const range = 255 - -q
    return [((pixel[0] / 255) * range), ((pixel[1] / 255) * range), ((pixel[2] / 255) * range), pixel[3]]
  }

  this.additive = (pixel, q) => { // Condense the data of pixels.
    return [pixel[0] + q, pixel[1] + q, pixel[2] + q, pixel[3]]
  }

  this.multiply = (pixel, q) => { // Change the color balance of pixels.
    return [pixel[0] * q[0], pixel[1] * q[1], pixel[2] * q[2], pixel[3]]
  }

  this.normalize = (pixel, q) => { // Normalize the color of pixels with another color.
    const averaged = [128 - q.r + pixel[0], 128 - q.g + pixel[1], 128 - q.b + pixel[2], pixel[3]]
    const offset = this.lum(pixel) - this.lum(averaged)
    return this.additive(averaged, offset)
  }

  // Color

  this.lum = (color) => { // Return the luminance of a color.
    return 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2]
  }

  // Strings

  this.concat = (...items) => { // Concat multiple strings.
    return items.reduce((acc, item) => { return `${acc}${item}` }, '')
  }

  this.split = (string, char) => { // Split string at character.
    return string.split(char)
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

  this.rad = (degrees) => { // Convert radians to degrees.
    return degrees * (Math.PI / 180)
  }

  this.deg = (radians) => { // Convert degrees to radians.
    return radians * (180 / Math.PI)
  }

  this.clamp = (val, min, max) => { // Clamps a value between min and max.
    return this.min(max, this.max(min, val))
  }

  this.step = (val, step) => {
    return this.round(val / step) * step
  }

  this.min = Math.min // Returns lowest value.

  this.max = Math.max // Returns highest value.

  this.ceil = Math.ceil // Rounds up to the nearest integer.

  this.floor = Math.floor // Rounds down to the nearest integer.

  this.round = Math.round // Rounds to the nearest integer

  this.sin = Math.sin

  this.cos = Math.cos

  this.log = Math.log

  this.pow = Math.pow

  this.sqrt = Math.sqrt // Calculate the square root.

  this.sq = (a) => { // Calculate the square.
    return a * a
  }

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

  this.and = (...args) => { // Returns true if all conditions are true.
    for (let i = 0; i < args.length; i++) {
      if (!args[i]) {
        return args[i]
      }
    }
    return args[args.length - 1]
  }

  this.or = (a, b, ...rest) => { // Returns true if at least one condition is true.
    const args = [a, b].concat(rest)
    for (let i = 0; i < args.length; i++) {
      if (args[i]) {
        return args[i]
      }
    }
    return args[args.length - 1]
  }

  // Arrays

  this.each = (arr, fn) => { // Run a function for each element in a list.
    for (let i = 0; i < arr.length; i++) {
      const arg = arr[i]
      fn(arg, i)
    }
  }

  this.map = (arr, fn) => { // Run a function on each element in a list.
    return Promise.all(arr.map(fn)).then(result => { return result })
  }

  this.filter = (arr, fn) => { // Remove from list, when function returns false.
    const list = Array.from(arr)
    return Promise.all(list.map((element, index) => fn(element, index, list)))
      .then(result => {
        return list.filter((_, index) => {
          return result[index]
        })
      })
  }

  this.reduce = (arr, fn, acc) => {
    const length = arr.length
    let result = acc === undefined ? arr[0] : acc
    for (let i = acc === undefined ? 1 : 0; i < length; i++) {
      result = fn(result, arr[i], i, arr)
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
    const arr = []
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
    return item && key ? item[key] : null
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

  this.convolve = (kernel, rect = this['get-frame']()) => {
    const sigma = kernel.flat().reduce((a, x) => (a + x))
    const kw = kernel[0].length; const kh = kernel.length
    const img = client.surface.context.getImageData(rect.x, rect.y, rect.w, rect.h)
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
      if (i % 4 === 3) out[i] = 255
    }
    img.data.set(out, 0)
    client.surface.context.putImageData(img, rect.x, rect.y)
    return rect
  }

  this.blur = () => { // Returns the blur kernel.
    return [[1, 2, 1],
      [2, 4, 2],
      [1, 2, 2]]
  }

  this.sharpen = () => { // Returns the sharpen kernel.
    return [[0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0]]
  }

  this.edge = () => { // Returns the edge kernel.
    return [[-1, -1, -1],
      [-1, 9, -1],
      [-1, -1, -1]]
  }

  this.offset = (a, b) => { // Offsets pos a with pos b, returns a.
    a.x += b.x
    a.y += b.y
    return a
  }

  const defaultVertShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    
    uniform vec2 u_resolution;
    
    varying vec2 v_texCoord;
    
    void main() {
      // convert the rectangle from pixels to 0.0 to 1.0
      vec2 zeroToOne = a_position / u_resolution;
    
      // convert from 0->1 to 0->2
      vec2 zeroToTwo = zeroToOne * 2.0;
    
      // convert from 0->2 to -1->+1 (clipspace)
      vec2 clipSpace = zeroToTwo - 1.0;
    
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    
      // pass the texCoord to the fragment shader
      // The GPU will interpolate this value between points.
      v_texCoord = a_texCoord;
    }
  `;
  this.vertexshader = (vertexShaderCodeString = defaultVertShaderSource) => { //prepare vertex shader code and return reference
    let gl = client.surface.glContext;
    let vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertexShaderCodeString);

    return vertShader;
  }

  const defaultFragShaderSource = `
    precision highp float;

    // our texture
    uniform sampler2D u_image;
    
    // the texCoords passed in from the vertex shader.
    varying vec2 v_texCoord;
    
    void main() {
       gl_FragColor = texture2D(u_image, v_texCoord);
    }
  `;
  this.fragmentshader = (fragmentShaderCodeString=defaultFragShaderSource) => { //prepare fragment shader code and return reference
    let gl = client.surface.glContext;
    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragmentShaderCodeString);
    return  fragShader;
  }

  this.runshader = (fragShader, vertShader, rect) => { //compile and link shaders and execute on canvas
    let gl = client.surface.glContext

    const image = client.surface.context.getImageData(rect.x, rect.y, rect.w, rect.h)

    if(!vertShader){
      vertShader = this.vertexshader()
    }

    gl.compileShader(vertShader)
    gl.compileShader(fragShader)
    const program = gl.createProgram()
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    let x1 = rect.x
    let x2 = rect.x + image.width
    let y1 = rect.y
    let y2 = rect.y + image.height

    const positionVertices = new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2,
    ])

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positionVertices, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0,0)
    gl.enableVertexAttribArray(positionLocation)


    const texcoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        0.0,  1.0,
        1.0,  0.0,
        1.0,  1.0,
    ]), gl.STATIC_DRAW)

    const texcoordLocation = gl.getAttribLocation(program, "a_texCoord")
    gl.enableVertexAttribArray(texcoordLocation)

    const texture = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0,0)

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    // lookup uniforms
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    // set the resolution
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    gl.drawArrays(gl.TRIANGLES, 0, 6)

    let pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4)
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
    
    pixels = new Uint8ClampedArray(pixels);

    let processedImage = new ImageData(pixels, gl.canvas.width, gl.canvas.height)
    processedImage = createImageBitmap(processedImage, 0, 0, gl.canvas.width, gl.canvas.height)

    client.surface.clear()
    client.surface.draw(processedImage)

  }

  this.distance = (a, b) => { // Get distance between positions.
    return Math.sqrt(((a.x - b.x) * (a.x - b.x)) + ((a.y - b.y) * (a.y - b.y)))
  }

  this.print = (value) => {
    client.source.write('ronin-print', 'txt', value, 'text/plain')
    return value
  }

  this.echo = (...args) => { // Print arguments to interface.
    client.log(args)
    return args
  }

  this.debug = (arg) => { // Print arguments to console.
    console.log(arg)
    return arg
  }

  this.time = (rate = 1) => { // Returns timestamp in milliseconds.
    return (Date.now() * rate)
  }

  this.js = () => { // Javascript interop.
    return window
  }

  this.on = (event, f) => { // Triggers on event.
    client.bind(event, f)
  }

  this.test = (name, a, b) => {
    if (`${a}` !== `${b}`) {
      console.warn('failed ' + name, a, b)
    } else {
      console.log('passed ' + name, a)
    }
    return a === b
  }

  this.benchmark = (fn) => { // Logs time taken to execute a function.
    const start = Date.now()
    const result = fn()
    console.log(`time taken: ${Date.now() - start}ms`)
    return result
  }

  // Accessors

  this['get-theme'] = () => { // Get theme values.
    return client.theme.active
  }

  this['get-frame'] = () => { // Get theme values.
    return client.surface.getFrame()
  }
}
