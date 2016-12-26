function Module(rune)
{
  this.rune = rune;
  this.element = null;
  this.parameters = [];
  this.variables  = {};

  this.docs = "Missing documentation.";
  
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
    return "unknown";
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