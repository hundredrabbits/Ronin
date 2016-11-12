function Position(x = 0,y = 0)
{
  this.x = x;
  this.y = y;
  
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