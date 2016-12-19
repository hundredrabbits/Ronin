function Mode_Guide()
{
  Mode.call(this);
  
  this.name = "Guide";
  
  this.live_draw_from = null;

  this.mouse_down = function(position)
  {
    ronin.overlay.clear();
    ronin.overlay.draw_pointer(position);
    this.live_draw_from = position;
    commander.show();
    commander.element_input.focus();
    commander.element_input.value = "| "+this.live_draw_from.render();
  }
  
  this.mouse_move = function(position)
  {
    if(this.live_draw_from === null){ return; }
    
    ronin.overlay.clear();
    
    var rect = new Rect();
    rect.width = position.x - this.live_draw_from.x;
    rect.height = position.y - this.live_draw_from.y;
  
    ronin.overlay.draw_rect(this.live_draw_from,rect);
    commander.element_input.value = "| "+this.live_draw_from.render()+" "+rect.render();
  }
  
  this.mouse_up = function(position)
  {
    this.live_draw_from = null;
    commander.element_input.focus();
  }
}