function Canvas(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Rect,Position,Color,Bang];
  
  // Cursor
  
  this.move_from = null;

  this.mouse_down = function(position)
  {
    this.move_from = ronin.position_in_window(position);
  }
  
  this.mouse_move = function(position)
  {
    if(this.move_from === null){ return; }
    
    position = ronin.position_in_window(position);
    
    var offset_x = this.move_from.x - position.x;
    var offset_y = this.move_from.y - position.y;
    
    this.context().globalCompositeOperation = "copy";
    this.context().drawImage(this.context().canvas, -offset_x, -offset_y);
    this.context().globalCompositeOperation = "source-over"
    
    this.move_from = new Position(position.x,position.y);
  }
  
  this.mouse_up = function(event)
  {
    this.move_from = null;
  }
}