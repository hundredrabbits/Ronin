function Brush()
{
  this.position = new Position();
  this.is_drawing = false;
  
  // Commander
  
  this.command = function(p)
  {
    if(p.length > 1){
      var position = new Position(parseInt(p[0]),parseInt(p[1]));
      var pointer = new Pointer(position);
    }
    
    if(p.length > 2){
      var color = new Color(p[2]);
      pointer = new Pointer(position,color);
    }
    
    this.add_pointer(pointer);
  }
  
  // Pointers
  
  this.pointers = [new Pointer(new Position(0,0))];
  
  this.add_pointer = function(pointer)
  {
    this.pointers.push(pointer);
  }
  
  // Draw
  
  this.draw = function(e)
  {
    if(this.is_drawing === false){return;}
    
    this.position = new Position(e.clientX,e.clientY);
    
    for (i = 0; i < this.pointers.length; i++) {
      this.pointers[i].draw();
    }
  }
  
  this.draw_start = function(e)
  {
    this.is_drawing = true;
    
    for (i = 0; i < this.pointers.length; i++) {
      this.pointers[i].start();
    }
  }
  
  this.draw_stop = function(e)
  {
    this.is_drawing = false;
    
    for (i = 0; i < this.pointers.length; i++) {
      this.pointers[i].stop();
    }
  }
  
}