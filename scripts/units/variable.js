function Variable(key,value)
{
  Unit.call(this);
  
  this.candidates = [];
  this.key = key;
  this.value = value;
  
  this.render = function()
  {
    return this.key+"="+this.value;
  }
}