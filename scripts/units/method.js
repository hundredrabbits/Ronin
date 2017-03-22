function Method(method_str)
{
  Unit.call(this);
  
  var content = method_str.split(":");
  this.name = content.shift();
  this.params = content;
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