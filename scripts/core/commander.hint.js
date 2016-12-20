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
    else{
      this.element.innerHTML = this.default();
      this.element.style.display = "block";
    }
  }
  
  this.message = function(module,cmd)
  {
    var s = "<span class='module'>"+module.constructor.name+"</span>";
    
    var e = 0;
    while(e < 10){
      if(!module.parameters[e]){ break; }
      var param_name = module.parameters[e].name;
      s += cmd[param_name.toLowerCase()]() ? "<span class='value'>"+cmd[param_name.toLowerCase()]().render()+"</span>" : "<span class='param'>"+param_name+"</span>";
      e += 1;
    }
    
    s += " ";
    
    s += this.print_variables(module);
    
    return s;
  }
  
  this.print_variables = function(module)
  {
    if(module.variables.length < 1){ return "";}
    
    var s = "";
    
    for (var key in module.variables){
      s += "<span class='variable_key'>"+key+"</span>=<span class='variable_value'>"+module.variables[key]+"</span> ";
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