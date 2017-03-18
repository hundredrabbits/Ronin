function Brush(rune)
{
  Module.call(this,rune);
  
  // this.parameters = {"offset":Position,"mirror":Rect,"angle":Angle,"reset":Bang};
  this.parameters = [];
  this.settings  = {"color":new Color("#ff0000"),"size":new Value(1)};
  this.pointers = [];
  
  // Module

  this.install = function()
  {
    this.add_pointer(new Position("0,0"));
  }
  
  this.active = function(cmd)
  {
    if(cmd.bang()){ this.pointers = []; }
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
    this.settings["size"].float -= this.settings["size"].float > 1 ? 1 : 0;
    ronin.surface.update_widget();
    ronin.terminal.log(new Log(this,"Increased pointer size to: "+this.size));
  }

  this.size_down = function()
  {
    this.settings["size"].float += 1;
    ronin.surface.update_widget();
    ronin.terminal.log(new Log(this,"Decreased pointer size to: "+this.size));
  }
  
  this.add_pointer = function(position)
  {
    ronin.terminal.log(new Log(this,"Added pointer at: "+position.render()));
    var pointer = new Pointer();
    pointer.offset = position;
    this.pointers.push(pointer);
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
    ronin.surface.context().lineWidth = this.settings["size"].float * 5;
    ronin.surface.context().strokeStyle = new Color("#ff0000").rgba();
    ronin.surface.context().stroke();
    ronin.surface.context().closePath();
    
    this.position_prev = position;
  }
  
  // Mouse

  this.mouse_pointer = function(position)
  {
    return ronin.cursor.draw_pointer_circle(position,this.settings["size"].float);
  }
  
  this.mouse_mode = function()
  {
    if(keyboard.shift_held == true){
      return "Eraser "+this.settings["size"].float;
    }
    else{
      return "<i style='color:"+this.settings["color"].hex+"'>&#9679;</i> Brush "+ronin.brush.pointers.length+"x "+this.settings["size"].render();  
    }
  }
  
  this.mouse_down = function(position)
  {    
    if(keyboard.shift_held == true){
      this.erase();
    }
    else{
      for (i = 0; i < ronin.brush.pointers.length; i++) {
        ronin.brush.pointers[i].start();
      }
    }
  }
  
  this.mouse_move = function(position,rect)
  {
    if(!this.mouse_held){ return; }
    
    if(keyboard.shift_held == true){
      this.erase();
    }
    else{
      for (i = 0; i < ronin.brush.pointers.length; i++) {
        ronin.brush.pointers[i].draw();
      }
    }
  }
  
  this.mouse_up = function(position,rect)
  {    
    for (i = 0; i < ronin.brush.pointers.length; i++) {
      ronin.brush.pointers[i].stop();
    }
  }
}