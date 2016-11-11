function Pointer()
{
  this.position = new Position();
  this.can_draw = false;
  
  this.draw = function()
  {
    if(this.can_draw === false){return;}
    
    var id = context.createImageData(1,1);
    var d  = id.data;
    d[0]   = 0;
    d[1]   = 0;
    d[2]   = 0;
    d[3]   = 255;
    context.putImageData(id,this.position.x,this.position.y);
  }
}