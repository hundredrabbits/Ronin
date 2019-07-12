function Filter () {
  Module.call(this, 'filter', 'Pixel filter')

  this.methods.balance = new Method('balance', '#ff0033', 'Filter color balance.', function (q) {
    var color = new Color(q).floats()

    var originalData = ronin.cursor.target.context().getImageData(0, 0, ronin.frame.width * 2, ronin.frame.height * 2)
    var data = originalData.data

    for (var i = 0; i < data.length; i += 4) {
      data[i] = data[i] * (color.r + 0.5)
      data[i + 1] = data[i + 1] * (color.g + 0.5)
      data[i + 2] = data[i + 2] * (color.b + 0.5)
    }

    ronin.cursor.target.context().putImageData(originalData, 0, 0)
  })

  this.methods.saturation = new Method('saturation', '#ff00333', 'Filter color saturation.', function (q) {
    var color = new Color(q).floats()

    var originalData = ronin.cursor.target.context().getImageData(0, 0, ronin.frame.width * 2, ronin.frame.height * 2)
    var data = originalData.data

    for (var i = 0; i < data.length; i += 4) {
      var r = data[i]
      var g = data[i + 1]
      var b = data[i + 2]
      var v = color.r * r + color.g * g + color.b * b
      data[i] = data[i + 1] = data[i + 2] = v
    }

    ronin.cursor.target.context().putImageData(originalData, 0, 0)
  })

  this.preview = function (q) {
    if (!q.methods.saturation) { return }

    ronin.preview.clear()

    // var color = new Color(q).floats();

    var x = q.methods.saturation.x / ronin.frame.width

    var originalData = ronin.cursor.target.context().getImageData(0, 0, ronin.frame.width * 2, ronin.frame.height * 2)
    var data = originalData.data

    for (var i = 0; i < data.length; i += 4) {
      var r = data[i]
      var g = data[i + 1]
      var b = data[i + 2]
      var v = (r + g + b) / 3
      data[i] = (r * x) + (v * (1 - x))
      data[i + 1] = (g * x) + (v * (1 - x))
      data[i + 2] = (b * x) + (v * (1 - x))
    }

    ronin.preview.context().putImageData(originalData, 0, 0)
  }
}
