function Pointer(offset = new Position(), color = new Color('000000'))
{
  this.offset = offset;
  this.color = color;
  this.mirror = null;
  this.position_prev = null;
  
  this.draw = function()
  {
    if(!this.position_prev){this.position_prev = this.position(); }
    
    context.beginPath();
    context.moveTo(this.position_prev.x,this.position_prev.y);
    context.lineTo(this.position().x,this.position().y);
    context.lineCap="round";
    context.lineWidth = this.thickness();
    context.strokeStyle = "rgba("+this.color.rgb().r+","+this.color.rgb().g+","+this.color.rgb().b+","+1+")";
    context.stroke();
    context.closePath();
    
    this.position_prev = this.position();
  }
  
  this.thickness = function()
  {
    var v = 100 - ((this.position().distance_to(this.position_prev)));
    var t = v/40;
    return t < 1 ? 1 : t;
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