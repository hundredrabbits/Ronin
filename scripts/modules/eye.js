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
  
  // TODO: If a rect is given, return the average color
  this.color_picker = function(position,rect = null)
  {
    var imgData = ronin.frame.context().getImageData(position.x*2, position.y*2, 1, 1).data;
    var c = new Color();
    ronin.terminal.input_element.value = "* "+(c.rgb_to_hex(imgData));
    ronin.terminal.update_hint();
  }
  
  // Mouse

  this.mouse_mode = function()
  {
    return "Eye";
  }

  this.mouse_down = function(position)
  {
    ronin.overlay.draw(position);
    this.color_picker(position);
  }
  
  this.mouse_move = function(position,rect)
  {
    ronin.overlay.draw(this.mouse_from,rect);
    this.color_picker(position,rect);
  }
  
  this.mouse_up = function(position,rect)
  {
    this.color_picker(position,rect);
  }
}