function Mode(name,key = null)
{
  Unit.call(this);
  
  this.host = null;
  this.name = name;
  this.key = key;

  this.toString = function()
  {
    return "<span class='mode'><span class='name'>~"+this.name+"</span>"+(this.key ? ' <span class="key">'+this.key+'</span>' : '')+"</span>"
  }
}