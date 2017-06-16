function Magnet(rune)
{
  Module.call(this,rune);

  this.size = new Rect("1x1");
  this.rate = new Position("4,4");

  this.add_setting(new Setting("color","#000000"));

  this.add_method(new Method("grid",["rect","position"]));
  this.add_method(new Method("clear",[]));

  this.grid = function(cmd,preview = false)
  {
    if(!cmd.rect()){ return 0, "Rect?"; }

    if(!this.layer){ this.create_layer(); }

    this.layer.clear();
    this.draw_grid(cmd.rect(),cmd.position());

    if(preview == false){
      if(cmd.rect()){ this.size = cmd.rect(); }
      if(cmd.position()){ this.rate = cmd.position();  }
    }

    return 1, preview ? "preview" : "ok";
  }

  this.clear = function(cmd,preview = false)
  {
    this.layer.clear();

    this.size = new Rect("1x1");
    this.rate = this.rate;    
  }

  this.draw_grid = function(rect,position)
  {
    if(!rect){ rect = new Rect("20x20"); }
    if(!position){ position = new Position("4,4"); }

    this.size = rect;
    this.rate = position;

    if(rect.width < 5 || rect.height < 5){ return; }

    var horizontal = ronin.frame.size.width/rect.width;
    var vertical = ronin.frame.size.height/rect.height;

    for (var x = 1; x < horizontal; x++) {
      for (var y = 1; y < vertical; y++) {
        var dot_position = new Position(x * rect.width, y * rect.height);
        var size = 0.5;
        if(this.rate && x % this.rate.x == 0 && y % this.rate.y == 0){ size = 1; }
        this.draw_marker(dot_position,size);
      }
    }
  }

  this.draw_marker = function(position,size = 0.5)
  {
    this.context().beginPath();
    this.context().arc(position.x, position.y, size, 0, 2 * Math.PI, false);
    this.context().fillStyle = this.settings["color"].value;
    this.context().fill();
    this.context().closePath();
  }

  this.magnetic_position = function(position)
  {
    var x = parseInt(position.x / this.size.width) * this.size.width;
    var y = parseInt(position.y / this.size.width) * this.size.width;

    return new Position(x,y);
  }

  this.update_mouse = function(position)
  {
    if(this.size.width > 4 || this.size.height > 4){ 
      if(!this.layer){ this.create_layer(); }
      this.layer.clear();
      this.draw_grid(this.size,this.rate);
    }
    
    return this.magnetic_position(position); 
  }

  this.widget = function()
  {
    if(this.size.width < 2 || this.size.height < 2){ return ""; }
    return this.size.value;
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}