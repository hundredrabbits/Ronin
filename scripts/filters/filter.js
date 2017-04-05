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

  this.get_neighbors = function(pixels,x,y)
  {
    return [
      this.get_color(pixels,x-1,y-1),this.get_color(pixels,x,y-1),this.get_color(pixels,x+1,y-1),
      this.get_color(pixels,x-1,y),this.get_color(pixels,x,y),this.get_color(pixels,x+1,y),
      this.get_color(pixels,x-1,y+1),this.get_color(pixels,x,y+1),this.get_color(pixels,x+1,y+1),
    ];
  }

  this.get_neighbors_average = function(pixels,x,y,weight_map = [1,1,1,1,1,1,1,1,1])
  {
    var n = this.get_neighbors(pixels,x,y);
    var r = 0;
    var g = 0;
    var b = 0;
    for (var i = 0; i < n.length; i++){
      r += n[i].r * weight_map[i];
      g += n[i].g * weight_map[i];
      b += n[i].b * weight_map[i];
    }
    return {r:r/n.length,g:g/n.length,b:b/n.length}
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
    return ronin.frame.context();
  }
  
  this.pixels = function()
  {
    return ronin.frame.context().getImageData(0,0,ronin.frame.settings["size"].width * 2,ronin.frame.settings["size"].height * 2);
  }
}