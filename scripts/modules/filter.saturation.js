Filter.prototype.filter_saturation = function(pixels = this.pixels(),p = null)
{
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
	ronin.canvas.clear();
	ronin.canvas.context().putImageData(pixels, 0, 0, 0, 0, pixels.width, pixels.height);
}