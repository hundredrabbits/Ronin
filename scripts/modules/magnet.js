function Magnet(rune)
{
  Module.call(this,rune);
  
  this.settings = {"grid" : new Rect("0x0"), "marker": new Position("4,4"), "reset" : new Bang()};

  this.passive = function(cmd)
  {
    if(!this.layer){ this.create_layer(); }

    this.layer.clear();
    this.draw(cmd.setting("grid"),cmd.setting("marker"));
  }

  this.active = function(cmd)
  {
    if(cmd.bang()){
      if(this.layer){ this.layer.remove(this); }
      return;
    }

    if(!this.layer){ this.create_layer(); }

    this.layer.clear();
    this.draw(this.setting("grid"),this.setting("marker"));
  }

  this.draw = function(rect,grid)
  {
    if(!rect){ rect = new Rect("20x20"); }
    if(!grid){ grid = new Position("4,4"); }

    if(rect.width < 5 || rect.height < 5){ return; }

    var horizontal = ronin.surface.settings["size"].width/rect.width;
    var vertical = ronin.surface.settings["size"].height/rect.height;
    
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

  this.magnetic_position = function(position)
  {
    var x = parseInt(position.x / this.settings["grid"].width) * this.settings["grid"].width;
    var y = parseInt(position.y / this.settings["grid"].width) * this.settings["grid"].width;

    return new Position(x,y);
  }
  
  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}