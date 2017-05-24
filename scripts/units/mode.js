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

  this.toString = function()
  {
    return "<span class='mode'>~"+this.name+(this.key ? '['+this.key+']' : '')+"</span>"
  }
}