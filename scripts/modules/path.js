function Path(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.settings  = {"fill_color" : "#ff0000","line_width" : 1,"line_color" : "#ffffff", "line_cap" : "square"};

  this.add_method(new Method("stroke",["Positions"],"Add point"));
  this.add_method(new Method("fill",["Positions"]),"Add point");

  this.coordinates = [];
  this.last_pos = null;
  this.paths = [];

  this.stroke = function(params,preview = false)
  {
    if(!ronin.path.layer){ ronin.path.create_layer(); ronin.path.layer.is_blinking = true; }

    this.layer.clear();
    this.layer.context().lineCap = this.settings["line_cap"];
    this.layer.context().lineWidth = this.settings["line_width"];
    this.layer.context().strokeStyle = this.settings["line_color"];
    ronin.path.layer.context().stroke(new Path2D(params.content));
  }

  this.fill = function(params,preview = false)
  {
    if(!ronin.path.layer){ ronin.path.create_layer(); ronin.path.layer.is_blinking = true; }

    this.layer.clear();
    this.layer.context().fillStyle = this.settings["fill_color"];

    ronin.path.layer.context().fill(new Path2D(params.content));
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

    s += "<svg width='"+ronin.surface.settings["size"].width+"' height='"+ronin.surface.settings["size"].height+"' xmlns='http://www.w3.org/2000/svg' baseProfile='full' version='1.1' style='fill:none;stroke:red;stroke-width:2px;stroke-linecap:square;'>";

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
    ronin.terminal.input_element.value = "path."+ronin.terminal.method_name+" "+this.create_path();
    ronin.terminal.input_element.value += "M"+position.render();
    ronin.terminal.passive();
  }
  
  this.mouse_move = function(position)
  {
    ronin.terminal.input_element.value = "path."+ronin.terminal.method_name+" "+this.create_path();
    ronin.terminal.input_element.value += "L"+position.render();
    ronin.terminal.passive();
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

    ronin.terminal.input_element.value = "path."+ronin.terminal.method_name+" "+this.create_path();
    this.last_pos = position;
    ronin.terminal.passive();
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
    this.coordinates = [];
    this.last_pos = null;
    ronin.terminal.input_element.value = "";
    ronin.terminal.passive();
  }
}