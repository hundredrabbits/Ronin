function Mode_Guide()
{
  Mode.call(this);
  
  this.name = "Guide";
  
  this.live_draw_from = null;

  this.mouse_down = function(event)
  {
    ronin.overlay.clear();
    ronin.overlay.draw_pointer(ronin.position_in_canvas(event));
    this.live_draw_from = ronin.position_in_canvas(event);
    commander.show();
    commander.element_input.focus();
    commander.element_input.value = "| "+this.live_draw_from.render();
  }
  
  this.mouse_move = function(event)
  {
    if(this.live_draw_from == null){ return; }
    
    ronin.overlay.clear();
    
    var rect = new Rect();
    rect.width = ronin.position_in_canvas(event).x - this.live_draw_from.x;
    rect.height = ronin.position_in_canvas(event).y - this.live_draw_from.y;
  
    ronin.overlay.draw_rect(this.live_draw_from,rect);
    commander.element_input.value = "| "+this.live_draw_from.render()+" "+rect.render();
  }
  
  this.mouse_up = function(event)
  {
    commander.element_input.focus();
  }
}