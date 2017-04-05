function Magnet(rune)
{
  Module.call(this,rune);
  
  this.settings = {"grid" : new Rect("1x1"), "marker": new Position("4,4"), "reset" : new Bang()};

  this.add_method(new Method("grid",["rect","position"]));

  this.grid = function(params,preview = false)
  {
    if(!params.rect()){ return; }

    if(!this.layer){ this.create_layer(); }

    this.layer.clear();
    this.draw_grid(params.rect(),params.position());

    if(preview == false){
      this.settings["grid"] = params.rect();
      this.settings["market"] = params.position();
    }
  }

  this.draw_grid = function(rect,grid)
  {
    if(!rect){ rect = new Rect("20x20"); }
    if(!grid){ grid = new Position("4,4"); }

    if(rect.width < 5 || rect.height < 5){ return; }

    var horizontal = ronin.frame.settings["size"].width/rect.width;
    var vertical = ronin.frame.settings["size"].height/rect.height;
    
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
    if(this.settings["grid"].width < 5 || this.settings["grid"].height < 5){ return; }

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
    var x = parseInt(position.x / this.settings["grid"].width) * this.settings["grid"].width;
    var y = parseInt(position.y / this.settings["grid"].width) * this.settings["grid"].width;

    return new Position(x,y);
  }

  this.update_mouse = function(position)
  {
    if(!this.layer){ this.create_layer(); }

    this.layer.clear();

    this.draw_helper(position);
    this.draw_grid(this.settings["grid"],this.settings["marker"]);

    return this.magnetic_position(position); 
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}