function Position(position_str = "0,0",y = null)
{
  this.position_str = position_str;
  
  this.x = y ? position_str : parseFloat(this.position_str.split(",")[0]);
  this.y = y ? y : parseFloat(this.position_str.split(",")[1]);
  
  this.update = function(x,y)
  {
    this.x = x;
    this.y = y;
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
}