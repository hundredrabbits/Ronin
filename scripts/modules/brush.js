function Brush(rune)
{
  Module.call(this,rune);
  
  this.pointers = [new Pointer(new Position("0,0"))];

  this.add_mode(new Mode("paint"));
  this.add_mode(new Mode("erase","alt"));
  this.add_setting(new Setting("color","#00ff00"));
  this.add_setting(new Setting("size","2"));
  this.add_method(new Method("add_pointer",["Position","Color","Scale"]));

  this.add_pointer = function(cmd, preview = false)
  {
    if(preview){ return; }

    var pointer = new Pointer();
    pointer.offset = cmd.position() ? cmd.position() : new Position("0,0");
    pointer.color = cmd.color().hex ? cmd.color().hex : this.settings["color"].value;
    pointer.scale = cmd.value().float ? cmd.value().float : 1;
    this.pointers.push(pointer);

    ronin.terminal.log(new Log(this,"Added pointer at: "+pointer.offset.render()));
    
    return 1, "ok";
  }

  this.size_up = function()
  {
    var new_size = this.settings["size"].to_f() + 1;
    this.settings["size"].update(new_size); 
  }

  this.size_down = function()
  {
    var new_size = this.settings["size"].to_f() - 1;
    this.settings["size"].update(new_size < 1 ? 1 : new_size);
  }

  // Eraser

  this.erase = function()
  {
    if(!this.position_prev){this.position_prev = ronin.cursor.position; }
    
    var position = ronin.cursor.position;
    
    ronin.frame.context().beginPath();
    ronin.frame.context().globalCompositeOperation="destination-out";
    ronin.frame.context().moveTo(this.position_prev.x,this.position_prev.y);
    ronin.frame.context().lineTo(position.x,position.y);
    ronin.frame.context().lineCap="round";
    ronin.frame.context().lineWidth = this.settings.size.to_f() * 3;
    ronin.frame.context().strokeStyle = new Color("#ff0000").rgba();
    ronin.frame.context().stroke();
    ronin.frame.context().closePath();
    
    this.position_prev = position;
  }
  
  // Mouse

  this.mouse_pointer = function(position)
  {
    return keyboard.shift_held == true ? ronin.cursor.draw_pointer_circle_eraser(position,this.settings["size"].to_f() * 3) : ronin.cursor.draw_pointer_circle(position,this.settings["size"].to_f());
  }
  
  this.mouse_mode = function()
  {
    if(keyboard.shift_held == true){
      return "Erase "+this.settings["size"].to_f();
    }
    else{
      return "Paint <i style='color:"+this.settings["color"].value+"'>&#9679;</i> "+this.settings["size"].to_f();  
    }
  }
  
  this.mouse_down = function(position)
  {
    if(position.is_outside()){ return; }

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
    this.position_prev = null;
  }
}