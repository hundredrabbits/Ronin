Filter.prototype.filter_offset = function(pixels = this.pixels(),p = null)
{
  var v = 255; // defaults to 255 if no parameter specified
  if (p.length > 0 && p[0]) {
      v = parseInt(p[0]);
      // permissible range is 0 <= v <= 255
      if (v > 255) { v = 255;} 
      if (v < 0) { v = 0;}
  }
  var d = pixels.data;

  for (var i=0; i<d.length; i+=4) {
      for (var j=0; j<3; j++) {
          d[i+j] = v - d[i+j];
      }
  }
	ronin.canvas.clear();
	ronin.canvas.context().putImageData(pixels, 0, 0, 0, 0, pixels.width, pixels.height);
}
