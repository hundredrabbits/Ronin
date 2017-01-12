function Eye(rune)
{
  Module.call(this,rune);
  
  // Module
  
  this.active = function(cmd)
  {
  }
  
  this.passive = function(cmd)
  {
  }
  
  this.widget_cursor = function()
  {
    return "Eye";
  }
  
  this.color_picker = function(position)
  {
    var imgData = ronin.surface.context().getImageData(position.x, position.y, 1, 1).data;
    var c = new Color();
    commander.show();
    commander.element_input.focus();
    commander.element_input.value = "> "+(c.rgb_to_hex(imgData));
  }
  
  // Cursor
  
  this.mouse_down = function(position)
  {
    this.color_picker(position);
  }
  
  this.mouse_move = function(position)
  {
    this.color_picker(position);
  }
  
  this.mouse_up = function(position)
  {
    this.color_picker(position);
  }
}