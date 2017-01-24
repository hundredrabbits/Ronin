function Cursor(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Rect,Position,Bang];
  this.variables  = {};

  this.mode = null;
  this.position = new Position();
  this.magnetism = null;
  this.grid = new Position(4,4);

  this.element = null;

  this.layer = null;

  this.install = function()
  {
    this.layer = new Layer("Cursor.Magnet",this);
    this.layer.element.setAttribute("style","z-index:9000");
    ronin.surface.add_layer(this.layer);
  }

  this.passive = function(cmd)
  {
    if(!cmd.rect()){ return; }

    this.layer.clear();
    this.draw(cmd.rect(),cmd.position());
  }

  this.active = function(cmd)
  {
    this.layer.clear();

    if(cmd.bang()){
      this.magnetism = null;
    }

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

  this.update = function(event)
  {
    if(ronin.module){
      this.set_mode(ronin.module);
    }
    else if(event.altKey == true && event.shiftKey == true){
      this.set_mode(ronin.surface.active_layer);
    }
    else if(event.altKey == true){
      this.set_mode(ronin.surface);
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

  this.update_element = function(position)
  {
    position = ronin.position_in_window(position);

    this.element.style.left = (position.x + window.innerWidth/2);
    this.element.style.top = (position.y + window.innerHeight/2);

    var radius = this.mode && this.mode.size ? this.mode.size : 5;
    this.element.style.width = radius;
    this.element.style.height = radius;
    this.element.style.borderRadius = radius;
    this.element.style.marginLeft = -radius/2;
    this.element.style.marginTop = -radius/2;
    this.element.style.borderColor = this.mode && this.mode.color ? this.mode.color.hex : "#ff0000";
  }

  //
  
  this.mouse_down = function(position)
  {
    if(this.magnetism){
      position = this.magnetic_position(position);
    }

    this.position = position;
    if(this.mode.constructor.name != Cursor.name){
      this.mode.mouse_down(position);  
    }
    ronin.widget.update();
  }
  
  this.mouse_move = function(position)
  {
    this.update_element(position);

    if(this.magnetism){
      position = this.magnetic_position(position);
    }

    this.position = position;

    if(this.mode.constructor.name != Cursor.name){
      this.mode.mouse_move(position);  
    }

  }
  
  this.mouse_up = function(position)
  {
    if(this.magnetism){
      position = this.magnetic_position(position);
    }

    this.position = position;
    if(this.mode.constructor.name != Cursor.name){
      this.mode.mouse_up(position);  
    }
    ronin.widget.update();
    commander.element_input.focus();
  }
}