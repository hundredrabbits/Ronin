function Setting(name,value)
{
  Unit.call(this);
  
  this.host = null;
  this.name = name;
  this.value = value;
  
  this.render = function()
  {
    return "?";
  }

  this.toString = function()
  {
    return "<span class='setting'>:"+this.name+(this.key ? '['+this.value+']' : '')+"</span>"
  }

  this.update = function(value)
  {
    this.value = value;
  }

  this.to_f = function()
  {
    return parseFloat(this.value);
  }

  this.to_rect = function()
  {
    return new Rect(this.value);
  }

  this.to_pos = function()
  {
    return new Position(this.value);
  }

}