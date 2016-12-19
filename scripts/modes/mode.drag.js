function Mode_Drag()
{
  Mode.call(this);
  
  this.name = "Drag";
  
  this.mouse_down = function(event)
  {
    ronin.drag_start(event); ronin.drag(event);
  }
  
  this.mouse_move = function(event)
  {
    ronin.drag(event);
  }
  
  this.mouse_up = function(event)
  {
    ronin.drag_stop(event);
  }
}