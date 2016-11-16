function Filter(element)
{
  Module.call(this);
  
  this.parameters = [Text,Value];
  
  this.active = function(cmd)
  {
    if(cmd.content.length < 1){ return; }
    
    var p = cmd.content;
    var filter_name = p[0];
    p.shift();
    
    switch(filter_name) {
      case "saturation":
        this.filter_saturation(this.pixels(),p);
        break;
    }
  }
  
  this.passive = function(cmd)
  {
  }
  
  // Filters
  
  this.filter_saturation = function(pixels = this.pixels(),p = null)
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
  
  //
  
  this.pixels = function()
  {
    return ronin.canvas.context().getImageData(0,0,ronin.canvas.element.width,ronin.canvas.element.height);
  }
}