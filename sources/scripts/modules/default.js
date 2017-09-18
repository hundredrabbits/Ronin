function Default(rune)
{
  Module.call(this,rune);

  // Cursor
  
  this.mouse_mode = function()
  {
    return "Drag";
  }
  
  this.mouse_pointer = function(position)
  {
    return ronin.cursor.draw_pointer_drag(position);
  }
  
  this.drag_from = null;

  this.mouse_down = function(position)
  {
    this.drag_from = ronin.cursor.position_in_window;
  }
  
  this.mouse_move = function(position)
  {
    if(this.drag_from === null){ return; }

    var offset = ronin.cursor.position_in_window.offset(this.drag_from);
    
    ronin.frame.element.style.left = parseInt(ronin.frame.element.style.left) + offset.x;
    ronin.frame.element.style.top = parseInt(ronin.frame.element.style.top) + offset.y;

    ronin.on_drag();

    this.drag_from = ronin.cursor.position_in_window;
  }
  
  this.mouse_up = function(event)
  {
    this.drag_from = null;
  }
}