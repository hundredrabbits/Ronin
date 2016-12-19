function Mode_Paint()
{
  Mode.call(this);
  
  this.name = "Paint";
  this.is_drawing = false;
  
  this.mouse_down = function(position)
  {
    this.is_drawing = true;
    
    for (i = 0; i < ronin.brush.pointers.length; i++) {
      ronin.brush.pointers[i].start();
    }
    
    ronin.stroke.new_stroke();
  }
  
  this.mouse_move = function(position)
  {
    if(this.is_drawing === false){ return; }
  
    for (i = 0; i < ronin.brush.pointers.length; i++) {
      ronin.brush.pointers[i].draw();
    }
    
    ronin.stroke.append_stroke(position);
  }
  
  this.mouse_up = function(position)
  {
    this.is_drawing = false;
    
    for (i = 0; i < ronin.brush.pointers.length; i++) {
      ronin.brush.pointers[i].stop();
    }
    
    ronin.stroke.save_stroke();
  }
}