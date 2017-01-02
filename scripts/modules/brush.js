function Brush(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Position,Rect,Angle,Color,Value,Bang];
  this.variables  = {"natural" : false,"banking" : false};
  this.pointers = [];
  
  this.size = 1;
  this.opacity = 1;
  this.color = new Color();
  
  // Module
  
  this.active = function(cmd)
  {
    if(cmd.bang()){ this.pointers = []; }
    
    // Pointer
    if(cmd.rect() || cmd.position() || cmd.angle()){
      this.add_pointer(cmd);
    }
    
    // Global
    if(cmd.color()){
      this.color = cmd.color();
    }
    if(cmd.value()){
      this.size = cmd.value().float;
    }
    
    this.update_variables(cmd);
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
  
  this.add_pointer = function(cmd)
  {
    var pointer = new Pointer();
    
    if(cmd.position()){
      pointer.offset = cmd.position();
    }
    if(cmd.rect()){
      pointer.mirror = cmd.rect();
    }
    if(cmd.angle()){
      pointer.angle = cmd.angle();
    }
    
    this.pointers.push(pointer);
  }
  
  this.widget_cursor = function()
  {

    var s = "> "+this.size+"<br />";

    for (i = 0; i < ronin.brush.pointers.length; i++) {
      s += ronin.brush.pointers[i].widget();
    }
    return s;

    return this.pointers.length > 0 ? "Brush "+this.size+", "+this.pointers.length+" pointers" : "No Pointers";
  }

  // Commands

  // this.
  
  // Cursor

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
    
    ronin.stroke.save_stroke("brush");
  }
}