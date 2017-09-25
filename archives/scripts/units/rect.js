function Rect(rect_str)
{
  Unit.call(this);
  
  this.rect_str = rect_str;
  
  this.width = rect_str ? parseFloat(this.rect_str.split("x")[0]) : 0;
  this.height = rect_str ? parseFloat(this.rect_str.split("x")[1]) : 0;
  
  this.example = "200x300";
  
  this.toString = function()
  {
    return (isNaN(this.width) ? 0 : this.width)+"x"+(isNaN(this.height) ? 0 : this.height);
  }
}