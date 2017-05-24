function Cursor(rune)
{
  Module.call(this,rune);
  
  this.settings = {color: "#000000",color_alt: "#fffffff"};

  this.mode = null;
  this.position = new Position();
  this.position_in_window = new Position();

  document.addEventListener('mousedown', function(e){ ronin.cursor.mouse_down(ronin.position_in_canvas(e),e);}, false);
  document.addEventListener('mousemove', function(e){ ronin.cursor.mouse_move(ronin.position_in_canvas(e),e);}, false);
  document.addEventListener('mouseup', function(e){ ronin.cursor.mouse_up(ronin.position_in_canvas(e),e);}, false);

  this.update = function(event = null)
  {
    if(this.is_inside){
      this.set_mode(ronin.default)
    }
    else if(ronin.terminal.cmd().module()){
      this.set_mode(ronin.terminal.cmd().module());
    }
    else if(event && event.altKey == true && event.shiftKey == true){
      this.set_mode(ronin.frame.active_layer);
    }
    else if(event && event.altKey == true){
      this.set_mode(ronin.default);
    }
    else{
      this.set_mode(ronin.brush);
    }
  }
  
  this.set_mode = function(mode = ronin.brush)
  {
    if(!mode){ return; }

    if(this.mode == mode){ return; }
    this.mode = mode;
    document.body.setAttribute("class",this.mode.name);
    ronin.widget.update();
  }

  this.mouse_down = function(position,e)
  {
    if(this.layer){ this.layer.clear(); }

    this.position = ronin.magnet.update_mouse(position);
    this.position_in_window = new Position(e.clientX,e.clientY);

    if(this.mode.constructor.name != Cursor.name){
      this.mode.mouse_from = this.position;
      this.mode.mouse_held = true;
      if(!position.is_outside()){
        this.mode.mouse_down(this.position);  
      }
      else{
        ronin.cursor.set_mode(ronin.default);
        ronin.default.mouse_down(this.position);
      }
    }
  }
  
  this.mouse_move = function(position,e)
  {
    if(!this.layer){ this.create_layer(); }

    // On/Out
    if(position.is_outside()){ this.mouse_outside(); }
    else{ this.mouse_inside(); }
      
    this.layer.clear();

    // Magnet
    this.position = ronin.magnet.update_mouse(position);
    this.position_in_window = new Position(e.clientX,e.clientY);

    if(this.mode){this.mode.mouse_pointer(this.position);}
    else{ this.mouse_pointer(this.position);}

    if(this.mode.mouse_from == null){ return; }

    var rect = new Rect();
    rect.width = this.position.x - this.mode.mouse_from.x;
    rect.height = this.position.y - this.mode.mouse_from.y;

    if(this.mode.constructor.name != Cursor.name){
      this.mode.mouse_move(this.position,rect);  
      this.mode.mouse_prev = this.position;
    }
  }
  
  this.mouse_up = function(position,e)
  {
    this.position = ronin.magnet.update_mouse(position);
    this.position_in_window = new Position(e.clientX,e.clientY);

    var rect = new Rect();
    rect.width = this.position.x - this.mode.mouse_from.x;
    rect.height = this.position.y - this.mode.mouse_from.y;

    if(!this.mode){ return; }

    if(this.mode.constructor.name != Cursor.name){
      if(!position.is_outside()){
        this.mode.mouse_up(this.position,rect);  
      }
      this.mode.mouse_held = false;
    }
    this.mode.mouse_from = null;
  }

  // over/out

  this.is_inside = false;

  this.mouse_outside = function()
  {
    if(this.is_inside){ return; }

    this.is_inside = true;
    this.update();

    console.log("over")
  }

  this.mouse_inside = function()
  {
    if(!this.is_inside){ return; }

    this.is_inside = false;
    this.update();
    console.log("off") 
  }

  this.draw_pointer_arrow = function(position,size = 1)
  {
    if(!this.layer){ this.create_layer(); }

    this.pointer_last = this.pointer_last ? this.pointer_last : position;

    this.layer.context().beginPath();
    
    this.layer.context().moveTo(position.x + 10,position.y);
    this.layer.context().lineTo(position.x,position.y);
    this.layer.context().lineTo(position.x,position.y + 10);
    
    this.layer.context().lineCap="round";
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = this.settings.color;
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.pointer_last = position;
  }

  this.draw_pointer_circle = function(position,size = 1)
  {
    if(!this.layer){ this.create_layer(); }

    this.pointer_last = this.pointer_last ? this.pointer_last : position;

    this.layer.context().beginPath();
    this.layer.context().arc(position.x, position.y, 0.5, 0, 2 * Math.PI, false);
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = this.settings.color;
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.layer.context().beginPath();
    this.layer.context().arc(position.x, position.y, size/2, 0, 2 * Math.PI, false);
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = ronin.brush.color;
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.layer.context().beginPath();
    this.layer.context().arc(position.x, position.y, (size/2)+2, 0, 2 * Math.PI, false);
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = this.settings.color;
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.pointer_last = position;
  }

  this.draw_pointer_circle_eraser = function(position,size = 1)
  {
    if(!this.layer){ this.create_layer(); }

    this.pointer_last = this.pointer_last ? this.pointer_last : position;

    this.layer.context().beginPath();
    this.layer.context().arc(position.x, position.y, (size/2), 0, 2 * Math.PI, false);
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = this.settings.color;
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.pointer_last = position;
  }

  this.draw_pointer_drag = function(position)
  {
    if(!this.layer){ this.create_layer(); }

    this.pointer_last = this.pointer_last ? this.pointer_last : position;

    this.layer.context().beginPath();

    var radius = 5;
    
    this.layer.context().moveTo(position.x,position.y - radius);
    this.layer.context().lineTo(position.x,position.y + radius);
    this.layer.context().moveTo(position.x - radius/2,position.y - radius);
    this.layer.context().lineTo(position.x - radius/2,position.y + radius);
    this.layer.context().moveTo(position.x + radius/2,position.y - radius);
    this.layer.context().lineTo(position.x + radius/2,position.y + radius);
    this.layer.context().moveTo(position.x + radius,position.y - radius);
    this.layer.context().lineTo(position.x + radius,position.y + radius);
    this.layer.context().moveTo(position.x - radius,position.y - radius);
    this.layer.context().lineTo(position.x - radius,position.y + radius);
    
    this.layer.context().lineCap="round";
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = this.settings.color;
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.pointer_last = position;
  }

  this.draw_pointer = function(position,size = 1)
  {
    if(!this.is_inside){ return; }
    if(!this.layer){ this.create_layer(); }

    this.pointer_last = this.pointer_last ? this.pointer_last : position;

    this.layer.context().beginPath();
    this.layer.context().moveTo(this.pointer_last.x,this.pointer_last.y);
    this.layer.context().lineTo(position.x,position.y);
    this.layer.context().lineCap="round";
    this.layer.context().lineWidth = 1;
    this.layer.context().strokeStyle = this.settings.color;
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.layer.context().beginPath();
    this.layer.context().arc(position.x, position.y, 0.5, 0, 2 * Math.PI, false);
    this.layer.context().fillStyle = this.settings.color;
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
    this.layer.context().strokeStyle = this.settings.color;
    this.layer.context().stroke();
    this.layer.context().closePath();

    this.pointer_last = position;
  }

  this.release = function()
  {
    this.mode.mouse_held = false;
    this.mode.mouse_from = null;
    this.mode = ronin.brush;
    ronin.terminal.input.focus();
  }

  this.widget = function()
  {
    return "<span class='mouse'>"+this.mode.name+"."+this.mode.mouse_mode()+"</span>";
  }
  
  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}