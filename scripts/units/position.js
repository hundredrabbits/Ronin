function Position(position_str = "0,0",y = null)
{
  Unit.call(this);
  
  this.example = "100,150";
  this.position_str = position_str;
  
  this.x = y ? position_str : parseFloat(this.position_str.split(",")[0]);
  this.y = y ? y : parseFloat(this.position_str.split(",")[1]);
  
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
  
  this.normalize = function(rect)
  {
    if(this.x < 0){
      this.x = ronin.canvas.element.width - rect.width - Math.abs(this.x);
    }
    if(this.y < 0){
      this.y = ronin.canvas.element.height - rect.height - Math.abs(this.y);
    }
  }
  
  this.render = function()
  {
    return (isNaN(this.x) ? 0 : this.x)+","+(isNaN(this.y) ? 0 : this.y);
  }
}