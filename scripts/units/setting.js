function Setting(key,value)
{
  Unit.call(this);
  
  this.candidates = [];
  this.key = key;
  
  if(value == "true"){ this.value = true; }
  else if(value == "false"){ this.value = false; }
  else{ this.value = value; }
  
  this.render = function()
  {
    return this.key+"="+this.value;
  }
}