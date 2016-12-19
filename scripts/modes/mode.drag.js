function Mode_Drag()
{
  Mode.call(this);
  
  this.name = "Drag";
  
  this.drag_from = null;

  this.mouse_down = function(event)
  {
    this.drag_from = new Position(event.clientX,event.clientY);
  }
  
  this.mouse_move = function(event)
  {
    if(this.drag_from == null){ return; }
    
    var offset_x = this.drag_from.x - event.clientX;
    var offset_y = this.drag_from.y - event.clientY;
    
    ronin.surface.style.left = ronin.surface.style.left ? parseInt(ronin.surface.style.left) - offset_x : offset_x;
    ronin.surface.style.top = ronin.surface.style.top ? parseInt(ronin.surface.style.top) - offset_y : offset_y;
    
    this.drag_from = new Position(event.clientX,event.clientY);
  }
  
  this.mouse_up = function(event)
  {
    this.drag_from = null;
  }
}