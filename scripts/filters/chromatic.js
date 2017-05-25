function Filter_Chromatic()
{
  Filter.call(this);
  
  this.parameters = [Value, Position];
  //value is maximum distance pixels are shifted
  //position is where the pixels are shifted from, defaults to half the image

  this.render = function(cmd)
  {
    var position = cmd.position() ? cmd.position() : new Position(ronin.frame.size.width,ronin.frame.size.height);
    var value = cmd.value() ? cmd.value().float : 5;

    this.draw(this.context(),value,position);
  }

  this.preview = function(cmd)
  {
    if(cmd.position()){
      ronin.overlay.draw(cmd.position());
    }
  }

  this.draw = function(context = this.context(), value, position)
  {
    var w = ronin.frame.size.width;
    var h = ronin.frame.size.height;
    
    //no longer letting you set how far each chanel is shifted, not sure how to receive extra data any more
		var s = {r:value,g:value*.5,b:0};
			
    var context = ronin.frame.context();
    
    //now need two imagedatas to sample off of, for some reason I cant just dump the new pixels into an empty array :/
    var originalData = context.getImageData(0, 0, w*2, h*2);
    var imageData = context.getImageData(0, 0, w*2, h*2);
    
		var maxLength = Math.sqrt(w*w+h*h);    
    for (var i=0; i<w*2; i++) {
	 		for(var j=0; j<h*2; j++){
	 			var x = i-position.x;
				var y = j-position.y;
	 			var a = Math.atan2(y,x);
	 			var d = Math.sqrt(x*x+y*y);
	 			var f = (d-s.r*d/maxLength);
	 			x = Math.cos(a)*f+position.x;
	 			y = Math.sin(a)*f+position.y;
	 			var r = this.get_color_bilinear(originalData, x, y);
	 			f = (d-s.g*d/maxLength);
	 			x = Math.cos(a)*f+position.x;
	 			y = Math.sin(a)*f+position.y;
	 			var g = this.get_color_bilinear(originalData, x, y);
	 			f = (d-s.b*d/maxLength);
	 			x = Math.cos(a)*f+position.x;
	 			y = Math.sin(a)*f+position.y;
	 			var b = this.get_color_bilinear(originalData, x, y);
	 			var c = {r:r.r, g:g.g, b:b.b,a:Math.max(r.a, Math.max(g.a,b.a))};
	 			this.set_color(imageData, c, i,j);
	 		}
    }
    ronin.frame.active_layer.clear();
    context.putImageData(imageData, 0, 0);
  }
}
