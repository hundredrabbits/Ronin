function Magnet(rune)
{
  Module.call(this,rune);

  this.add_setting(new Setting("grid","1x1"));
  this.add_setting(new Setting("marker","4,4"));

  this.add_method(new Method("grid",["rect","position"]));

  this.grid = function(cmd,preview = false)
  {
    if(!cmd.rect()){ return 0, "Rect?"; }

    if(!this.layer){ this.create_layer(); }

    this.layer.clear();
    this.draw_grid(cmd.rect(),cmd.position());

    if(preview == false){
      this.settings["grid"].update(cmd.rect().render());
      this.settings["marker"].update(cmd.position().render());
    }

    return 1, preview ? "preview" : "ok";
  }

  this.draw_grid = function(rect,grid)
  {
    if(!rect){ rect = new Rect("20x20"); }
    if(!grid){ grid = new Position("4,4"); }

    this.settings["grid"].update(rect.render());
    this.settings["marker"].update(grid.render());

    if(rect.width < 5 || rect.height < 5){ return; }

    var horizontal = ronin.frame.size.width/rect.width;
    var vertical = ronin.frame.size.height/rect.height;
    
    for (var x = 1; x < horizontal; x++) {
      for (var y = 1; y < vertical; y++) {
        var dot_position = new Position(x * rect.width, y * rect.height);
        var size = 0.5;
        if(grid && x % grid.x == 0 && y % grid.y == 0){ size = 1; }
        this.draw_marker(dot_position,size);
      }
    }
  }

  this.draw_helper = function(position)
  {    
    if(this.settings["grid"].to_rect().width < 5 || this.settings["grid"].to_rect().height < 5){ return; }

    var magnetized = this.magnetic_position(position);
    this.context().beginPath();
    this.context().arc(magnetized.x, magnetized.y, 4, 0, 2 * Math.PI, false);
    this.context().strokeStyle = 'white';
    this.context().stroke();
    this.context().closePath();
  }

  this.draw_marker = function(position,size = 0.5)
  {
    this.context().beginPath();
    this.context().arc(position.x, position.y, size, 0, 2 * Math.PI, false);
    this.context().fillStyle = 'white';
    this.context().fill();
    this.context().closePath();
  }

  this.magnetic_position = function(position)
  {
    var x = parseInt(position.x / this.settings["grid"].to_rect().width) * this.settings["grid"].to_rect().width;
    var y = parseInt(position.y / this.settings["grid"].to_rect().width) * this.settings["grid"].to_rect().width;

    return new Position(x,y);
  }

  this.update_mouse = function(position)
  {
    if(this.settings["grid"].to_rect().width > 4 || this.settings["grid"].to_rect().height > 4){ 
      if(!this.layer){ this.create_layer(); }
      this.layer.clear();
      this.draw_helper(position);
      this.draw_grid(this.settings["grid"].to_rect(),this.settings["marker"].to_pos());
    }
    
    return this.magnetic_position(position); 
  }

  this.widget = function()
  {
    if(this.settings["grid"].to_rect().width < 2 || this.settings["grid"].to_rect().height < 2){ return ""; }
    return this.settings["grid"].value;
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}