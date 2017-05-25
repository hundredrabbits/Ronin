function Angle(angle_str = "0'")
{
  Unit.call(this);
  
  this.example = "45'";
  
  this.degrees = parseFloat(angle_str.replace('\'',''));
  
  this.toString = function()
  {
    return this.degrees+"'";
  }
}