function Color(hex = '#000000')
{
  Unit.call(this);
  
  this.example = "#ff0000";
  this.hex = hex;

  this.rgb = function()
  {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }
  
  this.rgba = function()
  {
    return "rgba("+this.rgb().r+","+this.rgb().g+","+this.rgb().b+",1)";
  }

  this.floats = function()
  {
    var rgb = this.rgb();
    return { r:rgb.r/255, g:rgb.g/255, b:rgb.b/255 }
  }
  
  this.toString = function()
  {
    return this.hex;
  }
  
  this.rgb_to_hex = function(rgb)
  {
    return "#"+parseInt(rgb.r,10).toString(16)+parseInt(rgb.g,10).toString(16)+parseInt(rgb.b,10).toString(16);
  }

  this.brightness = function()
  {
    return this.rgb() ? (this.rgb().r + this.rgb().g + this.rgb().b)/3 : 0;
  }

  this.style = function()
  {
    return this.brightness() > 150 ? "bright" : "dark";
  }
}