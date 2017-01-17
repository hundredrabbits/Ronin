function Module(rune)
{
  this.rune = rune;
  this.element = null;
  this.parameters = [];
  this.variables  = {};

  this.docs = "Missing documentation.";
  
  this.install = function()
  {
    console.log(this.rune);
  }

  this.active = function(cmd)
  {
    console.log("Nothing to do.");
  }
  
  this.passive = function(cmd)
  {
    console.log("Nothing to do.");
  }
  
  this.update_variables = function(cmd)
  {
    for (var key in this.variables){
      if(!cmd.variable(key)){ continue; }
      this.variables[key] = cmd.variable(key).value;
    }
  }
  
  this.hint = function(cmd)
  {
    var s = this.pad(cmd.content.join(" "));

    s += cmd.content.join(" ").length == 0 ? "<span class='module'>"+this.constructor.name+"</span>" : "";

    // Params

    var e = 0;
    while(e < 10){
      if(!this.parameters[e]){ break; }
      var param_name = this.parameters[e].name;
      s += cmd[param_name.toLowerCase()]() ? "" : "<span class='param'>"+param_name+"</span>";
      e += 1;
    }

    // Variables
    if(this.variables){
      for (var key in this.variables){
        if(cmd.variable(key)){continue;}
        s += "<span class='variable_key'>"+key+"</span>=<span class='variable_value'>"+this.variables[key]+"</span> ";
      }
    }
    
    return s;
  }

  this.pad = function(input)
  {
    var s = "";
    for (i = 0; i < input.length+2; i++){
      s += "_";
    }

    return "<span style='color:#000'>"+s+"</span>";
  }
  
  this.widget = function()
  {
    return "";
  }
  
  this.widget_cursor = function()
  {
    return "Missing";
  }
  
  this.mouse_down = function(position)
  {
  }
  
  this.mouse_move = function(position)
  {
  }
  
  this.mouse_up = function(position)
  {
  }
}