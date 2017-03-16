function Default(rune)
{
  Module.call(this,rune);
  
  // Cursor
  
  this.widget_cursor = function()
  {
    return "Drag";
  }
  
  this.drag_from = null;
  this.drag_offset_x = 0;
  this.drag_offset_y = 0;

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
    this.drag_offset_x -= offset_x;
    this.drag_offset_y -= offset_y;
    
    ronin.surface.element.style.marginLeft = -(ronin.surface.size.width/2) + this.drag_offset_x;
    ronin.surface.element.style.marginTop = -(ronin.surface.size.height/2) + this.drag_offset_y;

    ronin.element.style.backgroundPosition = ((this.drag_offset_x/8))-(window.innerWidth % 20)+"px "+((this.drag_offset_y/8)-(window.innerWidth % 20))+"px";

    this.drag_from = new Position(position.x,position.y);
  }
  
  this.mouse_up = function(event)
  {
    this.drag_from = null;
  }
}