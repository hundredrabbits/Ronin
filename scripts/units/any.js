function Any(str)
{
  Unit.call(this);
  
  this.example = "";
  this.string = str;
  
  this.render = function()
  {
    return this.string;
  }
}