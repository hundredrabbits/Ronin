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

  this.size_up = function()
  {
    this.size -= this.size > 1 ? 1 : 0;
    ronin.widget.update();
  }

  this.size_down = function()
  {
     this.size += 1;
     ronin.widget.update();
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
    if(keyboard.shift_held == true){
      return "Eraser "+this.size;
    }
    else{
      return "Brush "+ronin.brush.pointers.length+"x "+this.size+" <span style='color:"+this.color.hex+"'>&#9679;</span><br />";  
    }
  }

  // Eraser

  this.erase = function()
  {
    if(!this.position_prev){this.position_prev = ronin.cursor.position; }
    
    var position = ronin.cursor.position;
    
    ronin.surface.context().beginPath();
    ronin.surface.context().globalCompositeOperation="destination-out";
    ronin.surface.context().moveTo(this.position_prev.x,this.position_prev.y);
    ronin.surface.context().lineTo(position.x,position.y);
    ronin.surface.context().lineCap="round";
    ronin.surface.context().lineWidth = this.size * 5;
    ronin.surface.context().strokeStyle = new Color("#ff0000").rgba();
    ronin.surface.context().stroke();
    ronin.surface.context().closePath();
    
    this.position_prev = position;
  }
  
  // Cursor

  this.is_drawing = false;
  
  this.mouse_down = function(position)
  {
    this.is_drawing = true;
    this.position_prev = null;
    
    if(keyboard.shift_held == true){
      this.erase();
    }
    else{
      for (i = 0; i < ronin.brush.pointers.length; i++) {
        ronin.brush.pointers[i].start();
      }
    }
    
  }
  
  this.mouse_move = function(position)
  {
    if(this.is_drawing === false){ return; }
    
    if(keyboard.shift_held == true){
      this.erase();
    }
    else{
      for (i = 0; i < ronin.brush.pointers.length; i++) {
        ronin.brush.pointers[i].draw();
      }
    }
  }
  
  this.mouse_up = function(position)
  {
    this.is_drawing = false;
    this.position_prev = null;
    
    for (i = 0; i < ronin.brush.pointers.length; i++) {
      ronin.brush.pointers[i].stop();
    }
  }
}