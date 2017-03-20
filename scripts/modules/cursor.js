function Cursor(rune)
{
  Module.call(this,rune);
  
  this.settings = {};

  this.mode = null;
  this.position = new Position();

  this.passive = function(cmd)
  {
    if(!this.layer){ this.create_layer(); }
  }

  this.active = function(cmd)
  {
  }

  this.draw_pointer_arrow = function(position,size = 1)
  {
    if(!this.layer){ this.create_layer(); }

    this.pointer_last = this.pointer_last ? this.pointer_last : position;

    this.layer.context().beginPath();
    
    this.layer.context().moveTo(position.x,position.y);
    this.layer.context().lineTo(position.x + 5,position.y);
    this.layer.context().moveTo(position.x,position.y);
    this.layer.context().lineTo(position.x,position.y + 5);
    
    this.layer.context().lineCap="round";
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = "white";
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.pointer_last = position;
  }

  this.draw_pointer_circle = function(position,size = 1)
  {
    if(!this.layer){ this.create_layer(); }

    this.pointer_last = this.pointer_last ? this.pointer_last : position;

    this.layer.context().beginPath();
    this.layer.context().moveTo(this.pointer_last.x,this.pointer_last.y);
    this.layer.context().lineTo(position.x,position.y);
    this.layer.context().lineCap="round";
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = "white";
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.layer.context().beginPath();
    this.layer.context().arc(position.x, position.y, size+1, 0, 2 * Math.PI, false);
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = "white";
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.pointer_last = position;
  }

  this.draw_pointer_drag = function(position)
  {
    if(!this.layer){ this.create_layer(); }

    this.pointer_last = this.pointer_last ? this.pointer_last : position;

    this.layer.context().beginPath();
    
    this.layer.context().moveTo(position.x,position.y - 3);
    this.layer.context().lineTo(position.x,position.y + 3);
    this.layer.context().moveTo(position.x - 2,position.y - 3);
    this.layer.context().lineTo(position.x - 2,position.y + 3);
    this.layer.context().moveTo(position.x + 2,position.y - 3);
    this.layer.context().lineTo(position.x + 2,position.y + 3);
    
    this.layer.context().lineCap="round";
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = "white";
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.pointer_last = position;
  }

  this.draw_pointer = function(position,size = 1)
  {
    if(!this.layer){ this.create_layer(); }

    this.pointer_last = this.pointer_last ? this.pointer_last : position;

    this.layer.context().beginPath();
    this.layer.context().moveTo(this.pointer_last.x,this.pointer_last.y);
    this.layer.context().lineTo(position.x,position.y);
    this.layer.context().lineCap="round";
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = "white";
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.layer.context().beginPath();
    this.layer.context().arc(position.x, position.y, 0.5, 0, 2 * Math.PI, false);
    this.layer.context().fillStyle = 'white';
    this.layer.context().fill();
    this.layer.context().closePath();

    this.layer.context().beginPath();
    
    this.layer.context().moveTo(position.x + 2,position.y);
    this.layer.context().lineTo(position.x + 5,position.y);
    this.layer.context().moveTo(position.x,position.y + 2);
    this.layer.context().lineTo(position.x,position.y + 5);
    this.layer.context().moveTo(position.x - 2,position.y);
    this.layer.context().lineTo(position.x - 5,position.y);
    this.layer.context().moveTo(position.x,position.y - 2);
    this.layer.context().lineTo(position.x,position.y - 5);
    
    this.layer.context().lineCap="round";
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = "white";
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.pointer_last = position;
  }

  this.update = function(event)
  {
    if(ronin.module){
      this.set_mode(ronin.module);
    }
    else if(event.altKey == true && event.shiftKey == true){
      this.set_mode(ronin.surface.active_layer);
    }
    else if(event.altKey == true){
      this.set_mode(ronin.default);
    }
    else{
      this.set_mode(ronin.brush);
    }
  }
  
  this.set_mode = function(mode)
  {
    if(this.mode == mode){ return; }
    this.mode = mode;
    document.body.setAttribute("class",this.mode.constructor.name);
  }
  
  this.mouse_down = function(position)
  {
    if(this.layer){ this.layer.clear(); }

    this.position = position;

    if(this.mode.constructor.name != Cursor.name){
      this.mode.mouse_from = position;
      this.mode.mouse_held = true;
      this.mode.mouse_down(position);  
    }
  }
  
  this.mouse_move = function(position)
  {
    if(!this.layer){ this.create_layer(); }
    
    this.layer.clear();

    if(this.mode){this.mode.mouse_pointer(position);}
    else{ this.mouse_pointer(position);}

    if(this.mode.mouse_from == null){ return; }

    this.position = position;

    var rect = new Rect();
    rect.width = this.position.x - this.mode.mouse_from.x;
    rect.height = this.position.y - this.mode.mouse_from.y;

    if(this.mode.constructor.name != Cursor.name){
      this.mode.mouse_move(position,rect);  
      this.mode.mouse_prev = position;
    }
  }
  
  this.mouse_up = function(position)
  {
    this.position = position;

    var rect = new Rect();
    rect.width = this.position.x - this.mode.mouse_from.x;
    rect.height = this.position.y - this.mode.mouse_from.y;

    if(this.mode.constructor.name != Cursor.name){
      this.mode.mouse_up(position,rect);  
      this.mode.mouse_held = false;
    }
    ronin.terminal.input_element.focus();

    this.mode.mouse_from = null;
  }
}