function Library (ronin) {
  this.clear = (rect = this.select_all()) => {
  }

  // Rects

  this.pos = (x, y) => {
    return { x, y }
  }

  this.size = (w, h) => {
    return { w, h }
  }

  this.rect = (x, y, w, h, t = 'rect') => {
    return { x, y, w, h, t }
  }

  this.line = (a, b, t = 'line') => {
    return { a, b, t }
  }

  this.frame = () => {
    return { x: 0, y: 0, w: Math.floor(window.innerWidth / 2) - 15, h: Math.floor(window.innerHeight) - 30 }
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
}
