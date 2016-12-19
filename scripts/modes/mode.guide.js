function Mode_Guide()
{
  Mode.call(this);
  
  this.name = "Guide";
  
  this.mouse_down = function(event)
  {
    ronin.overlay.live_draw_start(event);
  }
  
  this.mouse_move = function(event)
  {
    ronin.overlay.live_draw(event);
  }
  
  this.mouse_up = function(event)
  {
    
  }
}