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

  this.rect = (x, y, w, h) => {
    return { x, y, w, h }
  }

  this.frame = () => {
    return { x: 0, y: 0, w: Math.floor(window.innerWidth / 2) - 15, h: Math.floor(window.innerHeight) - 30 }
  }

  // Copy/Paste

  this.clone = (a, b) => {
    ronin.surface.clone(a, b)
  }

  this.stroke = (rect = this.frame(), thickness, color) => {
    ronin.surface.stroke(rect, thickness, color)
    return rect
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
