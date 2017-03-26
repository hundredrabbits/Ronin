function Method(name,params)
{
  Unit.call(this);
  
  this.name = name;
  this.params = params;
  this.example = "";
  
  this.render = function()
  {
    var s = name+":";
    for(param in this.params){
      s += this.params[param]+":"
    }
    s = s.substr(0,s.length-1);

    return s;
  }
}