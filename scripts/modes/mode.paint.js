function Mode_Paint()
{
  Mode.call(this);
  
  this.name = "Paint";
  
  this.is_drawing = false;
  
  this.mouse_down = function(event)
  {
    this.is_drawing = true;
    
    for (i = 0; i < ronin.brush.pointers.length; i++) {
      ronin.brush.pointers[i].start();
    }
  }
  
  this.mouse_move = function(event)
  {
    if(this.is_drawing === false){return;}
    
    // this.position = new Position(event.clientX - parseFloat(ronin.surface.style.left) - parseFloat(ronin.canvas.element.style.left),event.clientY- parseFloat(ronin.surface.style.top) - parseFloat(ronin.canvas.element.style.top));
    ronin.brush.position = ronin.position_in_canvas(event);
    
    for (i = 0; i < ronin.brush.pointers.length; i++) {
      ronin.brush.pointers[i].draw();
    }
  }
  
  this.mouse_up = function(event)
  {
    this.is_drawing = false;
    
    for (i = 0; i < ronin.brush.pointers.length; i++) {
      ronin.brush.pointers[i].stop();
    }
  }
}