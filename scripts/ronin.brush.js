function Brush()
{
  Module.call(this);
  
  this.position = new Position();
  this.is_drawing = false;
  this.size = 1;
  this.opacity = 1;
  this.color = new Color();
  
  // Module
  
  this.active = function(cmd)
  {
    var pointer = new Pointer();
    
    if(cmd.position()){
      pointer.position = cmd.position();
    }
    if(cmd.rect()){
      pointer.mirror = cmd.rect();
    }
    if(cmd.rect() || cmd.position()){
      this.add_pointer(pointer);
    }
    if(cmd.color()){
      this.color = cmd.color();
    }
    if(cmd.value()){
      this.size = cmd.value();
    }
  }
  
  this.passive = function(cmd)
  {
  }
  
  this.hint = function(cmd)
  {
    var hint_value = (cmd.value() ? "Size "+cmd.value()+" " : "");
    var hint_position = (cmd.position() ? "Position "+cmd.position().x+","+cmd.position().y+" " : "");
    var hint_color = (cmd.color() ? "Color "+cmd.color().hex+" " : "");
    var hint_rect = (cmd.rect() ? "Mirror "+cmd.rect().width+"/"+cmd.rect().height+" " : "");
    
    return "Brush: "+hint_value+hint_position+hint_color+hint_rect;
  }
  
  this.pointers = [new Pointer(new Position())];
  
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