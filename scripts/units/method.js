function Method(name,params,mouse_event)
{
  Unit.call(this);
  
  this.host = null;
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

  this.hint = function()
  {
    var s = "";
    for(id in this.params){
      s += "<span class='params'>"+this.params[id]+"</span> ";
    }
    s = s.substr(0,s.length-1);

    return s;
  }

  this.preview = function(cmd)
  {
    return this.host[this.name] ? this.host[this.name](cmd,true) : "";
  }

  this.run = function(cmd)
  {
    return this.host[this.name] ? ronin.terminal.log(new Log(this.host,this.host[this.name](cmd,false))) : null;
  }
}