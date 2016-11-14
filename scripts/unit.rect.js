function Rect(rect_str)
{
  this.rect_str = rect_str;
  
  this.width = parseFloat(this.rect_str.split("x")[0]);
  this.height = parseFloat(this.rect_str.split("x")[1]);
}