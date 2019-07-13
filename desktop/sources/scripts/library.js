function Library (ronin) {
  this.clear = (rect = this.select_all()) => {
  }

  this.select = (x, y, w, h) => {
    const rect = { x, y, w, h }
    ronin.surface.addGuide(rect)
    return rect
  }

  this.select_all = () => {
    ronin.surface.getRect()
  }
}
