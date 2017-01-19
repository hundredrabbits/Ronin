function Hint(element)
{
  Module.call(this);
  
  this.element = element;
  
  this.update = function()
  {
    var module = ronin.module;
    var cmd = commander.cmd();

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
    return module.hint(cmd);
  }
  
  this.default = function()
  {
    var s = "<span class='module'>Modules</span>";
    
    for (var key in ronin.modules){
      s += "<span> <span class='value'>"+key+"</span> <span class='param'>"+ronin.modules[key].constructor.name+" ";
    }
    
    return s;
  }
}