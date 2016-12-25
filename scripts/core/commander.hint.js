function Hint(element)
{
  Module.call(this);
  
  this.element = element;
  
  this.update = function(module,cmd)
  {
    if(module){
      this.element.innerHTML = this.message(module,cmd);
      this.element.style.display = "block";
    }
    else if(commander && commander.element_input.value != ""){
      this.element.innerHTML = commander.element_input.value;
      this.element.style.display = "block";
    }
    else{
      this.element.innerHTML = this.default();
      this.element.style.display = "block";
    }
  }
  
  this.message = function(module,cmd)
  {
    var s = "<span class='rune'>"+module.rune+"</span><span class='module'>"+module.constructor.name+"</span>";
    
    s += cmd.content.join("") != "" ? "<span class='command'>"+cmd.content.join(" ")+"</span>" : "";

    // Params

    var e = 0;
    while(e < 10){
      if(!module.parameters[e]){ break; }
      var param_name = module.parameters[e].name;
      s += cmd[param_name.toLowerCase()]() ? "" : "<span class='param'>"+param_name+"</span>";
      e += 1;
    }

    // Variables
    if(module.variables){
      for (var key in module.variables){
        if(cmd.variable(key)){continue;}
        s += "<span class='variable_key'>"+key+"</span>=<span class='variable_value'>"+module.variables[key]+"</span> ";
      }
    }
    
    return s;
  }
  
  this.default = function()
  {
    var s = "<span class='module'>Modules</span>";
    
    for (var key in ronin.modules){
      s += "<span class='param'>"+ronin.modules[key].constructor.name+"<span> <span class='value'>"+key+"</span> ";
    }
    
    return s;
  }
}