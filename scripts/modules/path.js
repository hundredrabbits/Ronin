function Path(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.settings  = {"fill_color" : "#ff0000","line_width" : 3,"line_color" : "#999", "line_cap" : "square"};

  this.add_method(new Method("stroke",["Positions"],"Add point"));
  this.add_method(new Method("fill",["Positions"]),"Add point");

  this.coordinates = [];
  this.last_pos = null;
  this.paths = [];

  this.stroke = function(cmd,preview = false)
  {
    if(!ronin.path.layer){ ronin.path.create_layer(); ronin.path.layer.is_blinking = true; }

    this.layer.clear();

    var context = preview ? this.context() : ronin.frame.context();

    context.beginPath();
    context.lineCap = this.settings["line_cap"];
    context.lineWidth = this.settings["line_width"];
    context.strokeStyle = this.settings["line_color"];
    context.stroke(new Path2D(cmd.params()));
    context.closePath();

    if(!preview){ this.coordinates = []; this.last_pos = null; }

    return 1, preview ? "preview" : "ok";
  }

  this.fill = function(params,preview = false)
  {
    if(!ronin.path.layer){ ronin.path.create_layer(); ronin.path.layer.is_blinking = true; }

    this.layer.clear();

    var context = preview ? this.context() : ronin.frame.context();

    context.fillStyle = this.settings["fill_color"];
    context.fill(new Path2D(params.content));

    return 1, preview ? "preview" : "ok";
  }

  // Tools
  
  this.create_path = function()
  {
    var command = "";

    for (var i = 0; i < this.coordinates.length; i++) {
      command += this.coordinates[i]+" ";
    }
    return command;
  }

  this.create_svg = function()
  {
    var s = "";

    s += "<svg width='"+ronin.frame.settings["size"].width+"' height='"+ronin.frame.settings["size"].height+"' xmlns='http://www.w3.org/2000/svg' baseProfile='full' version='1.1' style='fill:none;stroke:red;stroke-width:2px;stroke-linecap:square;'>";

    for (var i = 0; i < this.paths.length; i++) {
      s += "<path d='"+this.paths[i]+"' />";
    }

    s += "</svg>";
    console.log(s);
    return s;
  }

  // Mouse

  this.mouse_mode = function()
  {
    if(keyboard.shift_held == true && keyboard.alt_held == true){
      return "Path(Origin)";
    }
    else if(keyboard.shift_held == true){
      return "Path(Counterclock Arc)";
    }
    else if(keyboard.alt_held == true){
      return "Path(Clockwise Arc)";
    }
    else{
      return "Path(Line)";
    }
  }

  this.mouse_down = function(position)
  {
    var line = "path.stroke "+this.create_path();
    line += "M"+position.render();
    ronin.terminal.update(line);
  }
  
  this.mouse_move = function(position)
  {
    var line = "path.stroke "+this.create_path();
    line += "L"+position.render();
    ronin.terminal.update(line);
  }
  
  this.mouse_up = function(position)
  {
    if(this.coordinates.length == 0){
      this.coordinates.push("M"+position.render());
    }
    else{
      var offset = this.last_pos ? position.offset(this.last_pos) : position;

      if(keyboard.shift_held == true && keyboard.alt_held == true){
        this.coordinates.push("M"+position.render());
      }
      else if(keyboard.shift_held == true){
        this.coordinates.push("a"+offset.render()+" 0 0,1 "+offset.render());
      }
      else if(keyboard.alt_held == true){
       this.coordinates.push("a"+offset.render()+" 0 0,0 "+offset.render()); 
      }
      else{
        this.coordinates.push("l"+offset.render());
      }
    }

    ronin.terminal.update("path.stroke "+this.create_path());
    this.last_pos = position;
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
    this.coordinates = [];
    this.last_pos = null;
  }
}