function Position(x = 0,y = 0)
{
  this.x = x;
  this.y = y;
  
  this.distance_to = function(target)
  {
    return Math.sqrt( (this.x-target.x)*(this.x-target.x) + (this.y-target.y)*(this.y-target.y) );
  }
}