function Mode_Paint()
{
  Mode.call(this);
  
  this.name = "Paint";
  
  this.mouse_down = function(event)
  {
    ronin.brush.draw_start(event); ronin.brush.draw(event);
  }
  
  this.mouse_move = function(event)
  {
    ronin.brush.draw(event);
  }
  
  this.mouse_up = function(event)
  {
    ronin.brush.draw_stop(event);
  }
}