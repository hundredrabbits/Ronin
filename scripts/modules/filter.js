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
      case "chromatic":
        this.filter_chromatic(this.pixels(),p);
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
  
  this.filter_chromatic = function(pixels = this.pixels(),p = null)
  {
  	var s;
		if(p.length == 0)
			s = {r:2,g:2,b:2};
		else if(p.length < 3)
			s = {r:parseFloat(p[0]), g:parseFloat(p[0])*.5, b:0};
		else
			s = {r:parseFloat(p[0]), g:parseFloat(p[1]), b:parseFloat(p[2])};
		var hw = pixels.width*.5;
		var hh = pixels.height*.5;
		var maxLength = Math.sqrt(hw*hw+hh*hh);
		var output = new ImageData(pixels.width, pixels.height);
    for (var i=0; i<pixels.width; i++) {
				for(var j=0; j<pixels.height; j++){
					var x = i-hw;
					var y = j-hh;
					var a = Math.atan2(y,x);
					var d = Math.sqrt(x*x+y*y);
					var f = (d-s.r*d/maxLength);
					x = Math.cos(a)*f+hw;
					y = Math.sin(a)*f+hh;
					var r = this.get_color_bilinear(pixels, x, y);
					f = (d-s.g*d/maxLength);
					x = Math.cos(a)*f+hw;
					y = Math.sin(a)*f+hh;
					var g = this.get_color_bilinear(pixels, x, y);
					f = (d-s.b*d/maxLength);
					x = Math.cos(a)*f+hw;
					y = Math.sin(a)*f+hh;
					var b = this.get_color_bilinear(pixels, x, y);
					var c = {r:r.r, g:g.g, b:b.b,a:Math.max(r.a, Math.max(g.a,b.a))};
					this.set_color(output, c, i,j);
				}
    }
  	ronin.canvas.clear();
  	ronin.canvas.context().putImageData(output, 0, 0, 0, 0, pixels.width, pixels.height);
  }
	
	this.set_color = function(pixels, color, x, y){
		x = Math.max(0,Math.min(x,pixels.width-1));
		y = Math.max(0,Math.min(y,pixels.height-1));
		var index = (x+y*pixels.width)*4;
		pixels.data[index] = color.r;
		pixels.data[index+1] = color.g;
		pixels.data[index+2] = color.b;
		pixels.data[index+3] = color.a;
	}
	
	this.get_color = function(pixels,x,y){
		x = Math.max(0,Math.min(x,pixels.width-1));
		y = Math.max(0,Math.min(y,pixels.height-1));
		var index = (x+y*pixels.width)*4;
		return {r:pixels.data[index], g:pixels.data[index+1], b:pixels.data[index+2], a:pixels.data[index+3]};
	}
	
	this.get_color_bilinear = function(pixels, x, y){
		var c1 = this.get_color(pixels, Math.floor(x),Math.floor(y));
		var c2 = this.get_color(pixels, Math.ceil(x),Math.floor(y));
		var c3 = this.get_color(pixels, Math.floor(x),Math.ceil(y));
		var c4 = this.get_color(pixels, Math.ceil(x),Math.ceil(y));
		return this.lerp_color(this.lerp_color(c1,c2, x%1),this.lerp_color(c3,c4, x%1), y%1);
	}
	
	this.lerp_color = function(c1, c2, t){
		return {r:c1.r+t*(c2.r-c1.r), g:c1.g+t*(c2.g-c1.g), b:c1.b+t*(c2.b-c1.b), a:c1.a+t*(c2.a-c1.a)};
	}
  
  //
  
  this.pixels = function()
  {
    return ronin.canvas.context().getImageData(0,0,ronin.canvas.element.width,ronin.canvas.element.height);
  }
}
