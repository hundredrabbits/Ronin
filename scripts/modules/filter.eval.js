Filter.prototype.filter_eval = function(pixels = this.pixels(),p = null)
{
  console.log("working");

  // : eval {x} % 100 == 0
  
  var data = pixels.data;
  
  for (var i = 0; i < data.length; i += 4) {
    
    var x = (i/4) % pixels.width;
    var y = Math.floor((i/4)/pixels.width);
    
    var q = (x % parseInt(p[0]) === 0 && y % parseInt(p[1]) === 0);
    
    if(x % 20 == 0 && y % 20 == 0){
      data[i]     = 50;     // red
      data[i + 1] = 50; // green
      data[i + 2] = 50; // blue
      data[i + 3] = 255; // alpha?
    }
  }
  
	ronin.canvas.clear();
	ronin.canvas.context().putImageData(pixels, 0, 0, 0, 0, pixels.width, pixels.height);
  console.log("done.");
}