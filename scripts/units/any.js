function Any(str)
{
  Unit.call(this);
  
  this.string = str;
  
  this.render = function()
  {
    return this.string;
  }
}