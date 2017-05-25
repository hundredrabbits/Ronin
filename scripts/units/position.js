function Position(position_str = "0,0",y = null)
{
  Unit.call(this);
  
  this.example = "100,150";
  this.position_str = position_str;
    
  this.x = y != null ? position_str : parseFloat(position_str.split(",")[0]);
  this.y = y != null ? y : parseFloat(position_str.split(",")[1]);
  
  this.add = function(position)
  {
    return new Position(this.x + position.x, this.y + position.y);
  }
  
  this.is_equal = function(target)
  {
    if(target.x == this.x && target.y == this.y){ return true; }
    return null;
  }

  this.distance_to = function(target)
  {
    if(!target){ return 0; }
    return Math.sqrt( (this.x-target.x)*(this.x-target.x) + (this.y-target.y)*(this.y-target.y) );
  }

  this.offset = function(position = new Position(0,0))
  {
    return new Position(this.x - position.x,this.y - position.y);
  }
  
  this.normalize = function(rect)
  {
    if(this.x == null){
      this.x = ronin.canvas.element.width - rect.width - Math.abs(this.x);
    }
    if(this.y == null){
      this.y = ronin.canvas.element.height - rect.height - Math.abs(this.y);
    }
  }
  
  this.toString = function()
  {
    return (isNaN(this.x) ? 0 : this.x)+","+(isNaN(this.y) ? 0 : this.y);
  }

  this.is_outside = function()
  {
    if(this.x < 0){ return true; }
    if(this.y < 0){ return true; }
    if(this.x > ronin.frame.element.width/2){ return true; }
    if(this.y > ronin.frame.element.height/2){ return true; }
    return false;
  }
}