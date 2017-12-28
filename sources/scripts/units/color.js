function Color(hex = '#000000', rgb)
{  
  if(rgb){
    this.rgb = rgb;
    this.hex = "#"+("0" + parseInt(rgb.r,10).toString(16)).slice(-2)+("0" + parseInt(rgb.g,10).toString(16)).slice(-2)+("0" + parseInt(rgb.b,10).toString(16)).slice(-2);
  }
  else{
    this.hex = hex;
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.hex);
    this.rgb = {r: parseInt(result[1], 16),g: parseInt(result[2], 16),b: parseInt(result[3], 16)}
  }

  this.r = this.rgb.r;
  this.g = this.rgb.g;
  this.b = this.rgb.b;

  this.average = parseInt((this.r + this.g + this.b)/3)
  this.invert = {r:255-this.rgb.r, g:255-this.rgb.g, b:255-this.rgb.b};
  
  this.rgba = function()
  {
    return "rgba("+this.rgb().r+","+this.rgb().g+","+this.rgb().b+",1)";
  }

  this.floats = function()
  {
    var rgb = this.rgb;
    return { r:rgb.r/255, g:rgb.g/255, b:rgb.b/255 }
  }
  
  this.render = function()
  {
    return this.hex;
  }
  
  this.rgb_to_hex = function(rgb)
  {
    return "#"+("0" + parseInt(rgb[0],10).toString(16)).slice(-2)+("0" + parseInt(rgb[1],10).toString(16)).slice(-2)+("0" + parseInt(rgb[2],10).toString(16)).slice(-2);
  }

  this.brightness = function()
  {
    return this.rgb() ? (this.rgb().r + this.rgb().g + this.rgb().b)/3 : 0;
  }

  this.style = function()
  {
    return this.brightness() > 150 ? "bright" : "dark";
  }

  this.tween = function(target,value)
  {
    var c1 = this.floats();
    var c2 = target.floats();

    var r = ((255 * c1.r) * value) + ((255 * c2.r) * (1-value));
    var g = ((255 * c1.g) * value) + ((255 * c2.g) * (1-value));
    var b = ((255 * c1.b) * value) + ((255 * c2.b) * (1-value));
    var rgb = [parseInt(r),parseInt(g),parseInt(b)];
    var hex = new Color().rgb_to_hex(rgb);
    return hex;
  }
}