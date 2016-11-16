function Brush()
{
  Module.call(this);
  
  this.pointers = [new Pointer(new Position())];
  
  this.position = new Position();
  this.is_drawing = false;
  this.size = 1;
  this.opacity = 1;
  this.color = new Color();
  
  // Module
  
  this.active = function(cmd)
  {
    if(cmd.bang()){ this.pointers = []; }
    
    var pointer = new Pointer();
    
    if(cmd.position()){
      pointer.offset = cmd.position();
    }
    if(cmd.rect()){
      pointer.mirror = cmd.rect();
    }
    if(cmd.noise()){
      pointer.noise = cmd.noise();
    }
    if(cmd.angle()){
      pointer.angle = cmd.angle();
    }
    if(cmd.rect() || cmd.position() || cmd.noise() || cmd.angle()){
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
    if(cmd.rect()){
      var x = isNaN(cmd.rect().width) ? 0 : cmd.rect().width;
      var y = isNaN(cmd.rect().height) ? 0 : cmd.rect().height;
      var pos = new Position(x+","+y);
      ronin.overlay.draw(pos);
    }
    if(cmd.angle() && cmd.position()){
      ronin.overlay.draw(cmd.position());
    }
  }
  
  this.hint = function(cmd)
  {
    if(cmd.bang()){ return "Brush: Erase all pointers"; }
    
    var hint_value = (cmd.value() ? "Size "+cmd.value()+" " : "");
    var hint_position = (cmd.position() ? "Position "+cmd.position().x+","+cmd.position().y+" " : "");
    var hint_color = (cmd.color() ? "Color "+cmd.color().hex+" " : "");
    var hint_rect = (cmd.rect() ? "Mirror "+cmd.rect().width+"/"+cmd.rect().height+" " : "");
    var hint_noise = (cmd.noise() ? "Noise 0.."+cmd.noise()+" " : "");
    
    return "Brush: "+hint_value+hint_position+hint_color+hint_rect+hint_noise;
  }
  
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