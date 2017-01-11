function Filter()
{
  this.name = "Unknown";
  this.parameters = [];

  this.render = function(cmd)
  {
    console.log("render: Nothing here.");
  }

  this.preview = function(cmd)
  {
    console.log("render: Nothing here.");
  }

  this.set_color = function(pixels, color, x, y)
  {
    x = Math.max(0,Math.min(x,pixels.width-1));
    y = Math.max(0,Math.min(y,pixels.height-1));
    var index = (x+y*pixels.width)*4;
    pixels.data[index] = color.r;
    pixels.data[index+1] = color.g;
    pixels.data[index+2] = color.b;
    pixels.data[index+3] = color.a;
  }
  
  this.get_color = function(pixels,x,y)
  {
    x = Math.max(0,Math.min(x,pixels.width-1));
    y = Math.max(0,Math.min(y,pixels.height-1));
    var index = (x+y*pixels.width)*4;
    return {r:pixels.data[index], g:pixels.data[index+1], b:pixels.data[index+2], a:pixels.data[index+3]};
  }
  
  this.get_color_bilinear = function(pixels, x, y)
  {
    var c1 = this.get_color(pixels, Math.floor(x),Math.floor(y));
    var c2 = this.get_color(pixels, Math.ceil(x),Math.floor(y));
    var c3 = this.get_color(pixels, Math.floor(x),Math.ceil(y));
    var c4 = this.get_color(pixels, Math.ceil(x),Math.ceil(y));
    return this.lerp_color(this.lerp_color(c1,c2, x%1),this.lerp_color(c3,c4, x%1), y%1);
  }
  
  this.lerp_color = function(c1, c2, t)
  {
    return {r:c1.r+t*(c2.r-c1.r), g:c1.g+t*(c2.g-c1.g), b:c1.b+t*(c2.b-c1.b), a:c1.a+t*(c2.a-c1.a)};
  }
  
  //

  this.context = function()
  {
    return ronin.surface.active_layer.context();
  }
  
  this.pixels = function()
  {
    return ronin.surface.active_layer.context().getImageData(0,0,ronin.surface.size.width * 2,ronin.surface.size.height * 2);
  }
}