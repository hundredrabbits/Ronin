function Vector(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.variables  = {"fill_color" : null,"stroke_width" : 5,"stroke_color" : "#ffffff", "line_cap" : "square"};

  this.coordinates = [];
  this.last_pos = null;
  this.paths = [];
  
  // Module
  
  this.passive = function(cmd)
  {
    if(!ronin.vector.layer){ ronin.vector.create_layer(); ronin.vector.layer.is_blinking = true; }

    this.layer.clear();
    this.layer.context().lineCap = cmd.setting("line_cap") ? cmd.setting("line_cap").value : "square";
    this.layer.context().lineWidth = cmd.setting("stroke_width") ? cmd.setting("stroke_width").value : 10;
    this.layer.context().strokeStyle = cmd.setting("stroke_color") ? cmd.setting("stroke_color").value : "#ffffff";
    this.layer.context().fillStyle = cmd.setting("fill_color") ? cmd.setting("fill_color").value : "#ffffff";

    if(cmd.setting("fill_color")){ronin.vector.layer.context().fill(new Path2D(cmd.content.join(" ")));}
    ronin.vector.layer.context().stroke(new Path2D(cmd.content.join(" ")));
  }
  
  this.active = function(cmd)
  {
    this.paths.push(this.create_path());
    this.coordinates = [];

    if(this.layer){ this.layer.remove(this); }

    ronin.surface.active_layer.context().lineCap = cmd.setting("line_cap") ? cmd.setting("line_cap").value : "square";
    ronin.surface.active_layer.context().lineWidth = cmd.setting("stroke_width") ? cmd.setting("stroke_width").value : 10;
    ronin.surface.active_layer.context().strokeStyle = cmd.setting("stroke_color") ? cmd.setting("stroke_color").value : "#ffffff";
    ronin.surface.active_layer.context().fillStyle = cmd.setting("fill_color") ? cmd.setting("fill_color").value : "#ffffff";

    if(cmd.setting("fill_color")){ronin.surface.active_layer.context().fill(new Path2D(cmd.content.join(" ")));}
    ronin.surface.active_layer.context().stroke(new Path2D(cmd.content.join(" ")));
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

  this.click = null;

  this.mouse_mode = function()
  {
    if(keyboard.shift_held == true && keyboard.alt_held == true){
      return "Vector(Origin)";
    }
    else if(keyboard.shift_held == true){
      return "Vector(Counterclock Arc)";
    }
    else if(keyboard.alt_held == true){
      return "Vector(Clockwise Arc)";
    }
    else{
      return "Vector(Line)";
    }
  }

  this.mouse_down = function(position)
  {
    this.click = true;

    ronin.terminal.input_element.value = "+ "+this.create_path();
    this.passive(ronin.terminal.cmd());
    ronin.terminal.update_hint();
  }
  
  this.mouse_move = function(position)
  {
    if(!this.click){ return; }
    ronin.terminal.input_element.value = "+ "+this.create_path();
    ronin.terminal.input_element.value += "L"+position.render();
    this.passive(ronin.terminal.cmd());
    ronin.terminal.update_hint();
  }
  
  this.mouse_up = function(position)
  {
    this.click = null;

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

    ronin.terminal.input_element.value = "+ "+this.create_path();
    this.passive(ronin.terminal.cmd());
    this.last_pos = position;
    ronin.terminal.update_hint();
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
    this.coordinates = [];
    this.last_pos = null;
  }
}