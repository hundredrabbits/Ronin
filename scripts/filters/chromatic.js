function Filter_Chromatic()
{
  Filter.call(this);
  
  this.parameters = [];

	// var pixels = this.pixels();
	// var s;
	// if(p.length === 0)
	// 	s = {r:2,g:2,b:2};
	// else if(p.length < 3)
	// 	s = {r:parseFloat(p[0]), g:parseFloat(p[0])*.5, b:0};
	// else
	// 	s = {r:parseFloat(p[0]), g:parseFloat(p[1]), b:parseFloat(p[2])};
	// var hw = pixels.width*.5;
	// var hh = pixels.height*.5;
	// var maxLength = Math.sqrt(hw*hw+hh*hh);
	// var output = new ImageData(pixels.width, pixels.height);
 //  for (var i=0; i<pixels.width; i++) {
	// 		for(var j=0; j<pixels.height; j++){
	// 			var x = i-hw;
	// 			var y = j-hh;
	// 			var a = Math.atan2(y,x);
	// 			var d = Math.sqrt(x*x+y*y);
	// 			var f = (d-s.r*d/maxLength);
	// 			x = Math.cos(a)*f+hw;
	// 			y = Math.sin(a)*f+hh;
	// 			var r = this.get_color_bilinear(pixels, x, y);
	// 			f = (d-s.g*d/maxLength);
	// 			x = Math.cos(a)*f+hw;
	// 			y = Math.sin(a)*f+hh;
	// 			var g = this.get_color_bilinear(pixels, x, y);
	// 			f = (d-s.b*d/maxLength);
	// 			x = Math.cos(a)*f+hw;
	// 			y = Math.sin(a)*f+hh;
	// 			var b = this.get_color_bilinear(pixels, x, y);
	// 			var c = {r:r.r, g:g.g, b:b.b,a:Math.max(r.a, Math.max(g.a,b.a))};
	// 			this.set_color(output, c, i,j);
	// 		}
 //  }
	// ronin.canvas.clear();
	// ronin.surface.context().putImageData(output, 0, 0, 0, 0, pixels.width, pixels.height);
}
