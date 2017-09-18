function Any(str)
{
  Unit.call(this);
  
  this.example = "";
  this.string = str;
  
  this.toString = function()
  {
    return this.string;
  }
}