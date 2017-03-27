function Method(name,params,mouse_event)
{
  Unit.call(this);
  
  this.name = name;
  this.params = params;
  this.mouse_event = mouse_event;
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