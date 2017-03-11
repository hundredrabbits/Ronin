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
  
  // TODO: If a rect is given, return the average color
  this.color_picker = function(position,rect = null)
  {
    var imgData = ronin.surface.context().getImageData(position.x*2, position.y*2, 1, 1).data;
    var c = new Color();
    ronin.terminal.input_element.value = "* "+(c.rgb_to_hex(imgData));
    ronin.terminal.update_hint();
  }
  
  // Cursor
  
  this.live_draw_from = null;

  this.mouse_down = function(position)
  {
    this.click = true;
    this.live_draw_from = position;
    ronin.overlay.draw(position);
    this.color_picker(position);
  }
  
  this.mouse_move = function(position)
  {
    if(!this.click){ return; }

    var rect = new Rect();
    rect.width = position.x - this.live_draw_from.x;
    rect.height = position.y - this.live_draw_from.y;
  
    ronin.overlay.draw(this.live_draw_from,rect);

    this.color_picker(position,rect);
  }
  
  this.mouse_up = function(position)
  {
    this.click = null;

    var rect = new Rect();
    rect.width = position.x - this.live_draw_from.x;
    rect.height = position.y - this.live_draw_from.y;

    this.color_picker(position,rect);
  }
}