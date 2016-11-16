function Angle(angle_str)
{
  Unit.call(this);
  
  this.degrees = parseFloat(angle_str.replace('\'',''));
  
  this.render = function()
  {
    return this.degrees+"'";
  }
}