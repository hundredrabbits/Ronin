function Color(hex = '#000000')
{
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
}