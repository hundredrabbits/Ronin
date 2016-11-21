Filter.prototype.filter_balance = function(pixels = this.pixels(),p = null)
{
  // / media/filter.color.jpg
  // : balance 0.5 2.4 1.2
  
  p[0] = parseFloat(p[0]);
  p[1] = p[1] ? parseFloat(p[1]) : parseFloat(p[0]);
  p[2] = p[2] ? parseFloat(p[2]) : parseFloat(p[0]);
  
  var data = pixels.data;
  
  // Multiply
  if(p[0] % 1 !== 0 && p[1] % 1 !== 0 && p[2] % 1 !== 0){
    console.log("Multi");
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = data[i] * p[0];                     // red
      data[i + 1] = data[i + 1] * p[1]; // green
      data[i + 2] = data[i + 2] * p[2]; // blue
      
      // Clamp
      data[i] = data[i] < 255 ? data[i] : 255;
      data[i + 1] = data[i + 1] < 255 ? data[i + 1] : 255;
      data[i + 2] = data[i + 2] < 255 ? data[i + 2] : 255;
    }
  }
  // Add
  else{
    p[0] = parseInt(p[0]);
    p[1] = p[1] ? parseInt(p[1]) : parseInt(p[0]);
    p[2] = p[2] ? parseInt(p[2]) : parseInt(p[0]);
    
    for (i = 0; i < data.length; i += 4) {
      data[i]     = data[i] + p[0];                     // red
      data[i + 1] = data[i + 1] + p[1]; // green
      data[i + 2] = data[i + 2] + p[2]; // blue
      
      // Clamp
      data[i] = data[i] < 255 ? data[i] : 255;
      data[i + 1] = data[i + 1] < 255 ? data[i + 1] : 255;
      data[i + 2] = data[i + 2] < 255 ? data[i + 2] : 255;
    }
  }
  
	ronin.canvas.clear();
	ronin.canvas.context().putImageData(pixels, 0, 0, 0, 0, pixels.width, pixels.height);
}