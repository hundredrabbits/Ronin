function Library (ronin) {
  this.clear = (rect = this.select_all()) => {
  }

  this.draw = (path, rect) => {
    ronin.surface.draw(path, rect)
    return rect
  }

  // Rects

  this.pos = (x, y, t = 'pos') => {
    return { x, y }
  }

  this.size = (w, h, t = 'size') => {
    return { w, h }
  }

  this.rect = (x, y, w, h, t = 'rect') => {
    return { x, y, w, h, t }
  }

  this.line = (a, b, t = 'line') => {
    return { a, b, t }
  }

  this.frame = () => {
    return this.rect(0, 0, Math.floor(window.innerWidth / 2) - 15, Math.floor(window.innerHeight) - 30)
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

  this.echo = function (any) {
    console.log(any)
    return any
  }
}
