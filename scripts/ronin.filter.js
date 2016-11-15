function Filter(element)
{
  Module.call(this);
  
  this.active = function(cmd)
  {
    if(cmd.content.length < 1){ return; }
    
    var p = cmd.content;
    var filter_name = p[0];
    p.shift();
    
    switch(filter_name) {
      case "saturation":
        this.filter_saturation(p);
        break;
    }
  }
  
  this.passive = function(cmd)
  {
  }
  
  this.hint = function(cmd)
  {
    return "Filter: ";
  }
  
  // Filters
  
  this.filter_saturation = function()
  {
    var imgPixels = this.pixels();
    for(var y = 0; y < imgPixels.height; y++){
  		for(var x = 0; x < imgPixels.width; x++){
  			var i = (y * 4) * imgPixels.width + x * 4;
  			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
  			imgPixels.data[i] = avg;
  			imgPixels.data[i + 1] = avg;
  			imgPixels.data[i + 2] = avg;
  		}
  	}
  	ronin.canvas.clear();
  	ronin.canvas.context().putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
  }
  
  //
  
  this.pixels = function()
  {
    return ronin.canvas.context().getImageData(0,0,ronin.canvas.element.width,ronin.canvas.element.height);
  }
}