function Mode_Drag()
{
  Mode.call(this);
  
  this.name = "Drag";
  
  this.drag_from = null;

  this.mouse_down = function(position)
  {
    this.drag_from = position;
  }
  
  this.mouse_move = function(position)
  {
    console.log(position);
    return;
    if(this.drag_from === null){ return; }
    
    var offset_x = this.drag_from.x - position.x;
    var offset_y = this.drag_from.y - position.y;
    
    ronin.surface.style.left = ronin.surface.style.left ? parseInt(ronin.surface.style.left) - offset_x : offset_x;
    ronin.surface.style.top = ronin.surface.style.top ? parseInt(ronin.surface.style.top) - offset_y : offset_y;
    
    this.drag_from = new Position(position.x,position.y);
  }
  
  this.mouse_up = function(event)
  {
    this.drag_from = null;
  }
}