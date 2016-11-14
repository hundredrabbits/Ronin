function Pointer(offset = new Position(), color = new Color('000000'))
{
  this.offset = offset;
  this.mirror = null;
  this.position_prev = null;
  
  this.draw = function()
  {
    if(!this.position_prev){this.position_prev = this.position(); }
    if(ronin.brush.size < 0){ this.erase(); return; }
    
    context.beginPath();
    context.moveTo(this.position_prev.x,this.position_prev.y);
    context.lineTo(this.position().x,this.position().y);
    context.lineCap="round";
    context.lineWidth = this.thickness();
    context.strokeStyle = ronin.brush.color.rgba();
    context.stroke();
    context.closePath();
    
    this.position_prev = this.position();
  }
  
  this.erase = function()
  {
    context.clearRect(this.position().x - (ronin.brush.size/2), this.position().y - (ronin.brush.size/2), ronin.brush.size, ronin.brush.size);
  }
  
  this.thickness = function()
  {
    var ratio = 10/this.position().distance_to(this.position_prev);
    ratio = ratio > 1 ? 1 : ratio;
    return ronin.brush.size * ratio;
  }
  
  this.position = function()
  {
    if(this.mirror && this.mirror.x > 0){
      return new Position(this.mirror.x - (brush.position.x + this.offset.x), 0 + (brush.position.y + this.offset.y));
    }
    else if(this.mirror && this.mirror.y > 0){
      return new Position((brush.position.x + this.offset.x), this.mirror.y - (brush.position.y + this.offset.y));
    }
    return new Position(ronin.brush.position.x + this.offset.x, ronin.brush.position.y + this.offset.y);
  }
  
  this.start = function()
  {
  }
  
  this.stop = function()
  {
    this.position_prev = null;
  }
}