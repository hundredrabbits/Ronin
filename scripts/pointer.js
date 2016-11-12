function Pointer()
{
  this.position = new Position();
  this.can_draw = false;
  
  this.draw = function(e)
  {
    if(this.can_draw === false){return;}
    
    var id = context.createImageData(1,1);
    var d  = id.data;
    d[0]   = 0;
    d[1]   = 0;
    d[2]   = 0;
    d[3]   = 255;
    context.putImageData(id,e.clientX,e.clientY);
  }
  
  this.position = function()
  {
    var rect = canvas.getBoundingClientRect();
    return new Position(evt.clientX - rect.left,evt.clientY - rect.top);
  }
}