function Method(name,params,options = null)
{
  Unit.call(this);
  
  this.host = null;
  this.name = name;
  this.params = params;
  this.options = options;
  this.example = "";

  this.toString = function()
  {
    var params_str = "";
    for(param in this.params){
      params_str += this.params[param]+","
    }
    params_str = params_str.substr(0,params_str.length-1);

    var options_str = "";
    for(option in this.options){
      options_str += this.options[option]+","
    }
    options_str = options_str.substr(0,options_str.length-1);

    return "<span class='method'>.<span class='name'>"+this.name+"</span> "+params_str+(this.options ? ' <span class=\'options\'>['+options_str+']</span>' : '')+"</span>";
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