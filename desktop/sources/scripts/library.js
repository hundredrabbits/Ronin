function Library (ronin) {
  this.clear = (rect = this.select_all()) => {
  }

  // Rects

  this.rect = (x, y, w, h) => {
    return { x, y, w, h }
  }

  this.frame = () => {
    return { x: 0, y: 0, w: Math.floor(window.innerWidth / 2) - 15, h: Math.floor(window.innerHeight) - 30 }
  }

  this.stroke = (rect, thickness, color) => {
    ronin.surface.stroke(rect, thickness, color)
    return rect
  }

  this.fill = (rect = this.frame(), thickness, color) => {
    ronin.surface.fill(rect, thickness, color)
    return rect
  }

  this.clear = (rect) => {
    ronin.surface.clear(rect)
    return rect
  }
}
