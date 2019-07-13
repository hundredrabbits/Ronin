function Library (ronin) {
  this.clear = (rect = this.select_all()) => {
  }

  this.rect = (x, y, w, h) => {
    return { x, y, w, h }
  }

  this.stroke = (rect, thickness, color) => {
    ronin.surface.stroke(rect, thickness, color)
    return rect
  }

  this.fill = (rect, thickness, color) => {
    ronin.surface.fill(rect, thickness, color)
    return rect
  }

  this.clear = (rect) => {
    ronin.surface.clear(rect)
    return rect
  }

  this.select_all = () => {
    ronin.surface.getRect()
  }
}
