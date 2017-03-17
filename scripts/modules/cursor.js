function Cursor(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Rect,Position,Bang];
  this.variables  = {};

  this.mode = null;
  this.position = new Position();
  this.magnetism = null;
  this.grid = new Position(4,4);

  this.passive = function(cmd)
  {
    if(!cmd.rect()){ return; }

    if(!this.layer){ this.create_layer(); }

    this.layer.clear();
    this.draw(cmd.rect(),cmd.position());
  }

  this.active = function(cmd)
  {
    if(cmd.bang()){
      this.magnetism = null;
      if(this.layer){ this.layer.remove(this); }
      return;
    }

    if(!this.layer){ this.create_layer(); }

    this.layer.clear();

    if(cmd.position()){
      this.grid = cmd.position();
    }

    if(cmd.rect()){
      this.magnetism = cmd.rect();
      this.draw(cmd.rect(),this.grid);
    }
  }

  this.draw = function(rect,grid)
  {
    if(rect.width < 5 || rect.height < 5){ return; }

    var horizontal = ronin.surface.size.width/rect.width;
    var vertical = ronin.surface.size.height/rect.height;
    
    for (var x = 1; x < horizontal; x++) {
      for (var y = 1; y < vertical; y++) {
        var dot_position = new Position(x * rect.width, y * rect.height);
        var size = 0.5;
        if(grid && x % grid.x == 0 && y % grid.y == 0){ size = 1; }
        this.draw_marker(dot_position,size);
      }
    }
  }

  this.draw_marker = function(position,size = 0.5)
  {
    var context = this.layer.context();
    context.beginPath();
    context.arc(position.x, position.y, size, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
  }

  this.draw_pointer = function(position,size = 1)
  {
    if(!this.layer){ this.create_layer(); }

    this.pointer_last = this.pointer_last ? this.pointer_last : position;

    this.layer.clear();

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

  // 

  this.magnetic_position = function(position)
  {
    var x = parseInt(position.x / this.magnetism.width) * this.magnetism.width;
    var y = parseInt(position.y / this.magnetism.width) * this.magnetism.width;

    return new Position(x,y);
  }

  //
  
  this.mouse_down = function(position)
  {
    this.layer.clear();

    if(this.magnetism){
      position = this.magnetic_position(position);
    }

    this.position = position;

    if(this.mode.constructor.name != Cursor.name){
      this.mode.mouse_from = position;
      this.mode.mouse_down(position);  
    }
  }
  
  this.mouse_move = function(position)
  {
    this.draw_pointer(position);

    if(this.mode.mouse_from == null){ return; }

    if(this.magnetism){
      position = this.magnetic_position(position);
    }

    this.position = position;

    var rect = new Rect();
    rect.width = this.position.x - this.mode.mouse_from.x;
    rect.height = this.position.y - this.mode.mouse_from.y;

    if(this.mode.constructor.name != Cursor.name){
      this.mode.mouse_move(position,rect);  
    }

  }
  
  this.mouse_up = function(position)
  {
    if(this.magnetism){
      position = this.magnetic_position(position);
    }

    this.position = position;

    var rect = new Rect();
    rect.width = this.position.x - this.mode.mouse_from.x;
    rect.height = this.position.y - this.mode.mouse_from.y;

    if(this.mode.constructor.name != Cursor.name){
      this.mode.mouse_up(position,rect);  
    }
    ronin.terminal.input_element.focus();

    this.mode.mouse_from = null;
  }
}