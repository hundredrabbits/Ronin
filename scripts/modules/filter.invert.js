Filter.prototype.filter_invert = function(pixels = this.pixels(),p = null)
{
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
      for (var j=0; j<3; j++) {
          d[i+j] = 255 - d[i+j];
      }
  }
	ronin.canvas.clear();
	ronin.canvas.context().putImageData(pixels, 0, 0, 0, 0, pixels.width, pixels.height);
}
