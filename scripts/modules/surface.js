function Surface(rune)
{
  Module.call(this,rune);
  
  this.element = null;
  this.parameters = [Any];
  
  this.active = function(cmd)
  {
  }
  
  this.passive = function(cmd)
  {
  }
  
  this.widget_cursor = function()
  {
    return "Drag";
  }
  
  // Cursor
  
  this.drag_from = null;

  this.mouse_down = function(position)
  {
    this.drag_from = ronin.position_in_window(position);
  }
  
  this.mouse_move = function(position)
  {
    if(this.drag_from === null){ return; }
    
    position = ronin.position_in_window(position);
    
    var offset_x = this.drag_from.x - position.x;
    var offset_y = this.drag_from.y - position.y;
    
    ronin.surface.element.style.left = ronin.surface.element.style.left ? parseInt(ronin.surface.element.style.left) - offset_x : offset_x;
    ronin.surface.element.style.top = ronin.surface.element.style.top ? parseInt(ronin.surface.element.style.top) - offset_y : offset_y;
    
    this.drag_from = new Position(position.x,position.y);
  }
  
  this.mouse_up = function(event)
  {
    this.drag_from = null;
  }
}