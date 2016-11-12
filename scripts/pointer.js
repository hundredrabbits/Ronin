function Pointer(offset = new Position())
{
  this.offset = offset;
  this.mirror = null;
  this.position_prev = null;
  
  this.draw = function()
  {
    if(!this.position_prev){this.position_prev = this.position(); }
    
    var id = context.createImageData(1,1);
    var d  = id.data;
    d[0]   = 0;
    d[1]   = 0;
    d[2]   = 0;
    d[3]   = 255;
    context.putImageData(id,this.position().x,this.position().y);
    
    context.beginPath();
    context.moveTo(this.position_prev.x,this.position_prev.y);
    context.lineTo(this.position().x,this.position().y);
    context.stroke();
    
    this.position_prev = this.position();
  }
  
  this.position = function()
  {
    if(this.mirror){
      return new Position(500 - (brush.position.x + this.offset.x), brush.position.y + this.offset.y);
    }
    return new Position(brush.position.x + this.offset.x, brush.position.y + this.offset.y);
  }
  
  this.start = function()
  {
  }
  
  this.stop = function()
  {
    this.position_prev = null;
  }
}