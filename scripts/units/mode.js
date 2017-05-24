function Mode(name,key = "")
{
  Unit.call(this);
  
  this.host = null;
  this.name = name;
  this.key = key;

  this.render = function()
  {
    return "?";
  }
}