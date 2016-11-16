function Rect(rect_str)
{
  Unit.call(this);
  
  this.rect_str = rect_str;
  
  this.width = parseFloat(this.rect_str.split("x")[0]);
  this.height = parseFloat(this.rect_str.split("x")[1]);
  
  this.render = function()
  {
    return (isNaN(this.width) ? 0 : this.width)+"x"+(isNaN(this.height) ? 0 : this.height);
  }
}