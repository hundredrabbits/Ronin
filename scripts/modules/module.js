function Module(rune)
{
  this.rune = rune;
  this.element = null;
  this.parameters = [];
  this.variables  = [];
  
  this.active = function(cmd)
  {
    console.log("Nothing to do.");
  }
  
  this.passive = function(cmd)
  {
    console.log("Nothing to do.");
  }
  
  this.hint = function(cmd)
  {
    return "unknown";
  }
  
  this.widget = function()
  {
    return "";
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