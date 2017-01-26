function Vector(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.variables  = {"fill_color" : "none","stroke_width" : 5,"stroke_color" : "#ffffff", "line_cap" : "square"};

  this.coordinates = [];
  this.last_pos = null;
  this.paths = [];
  
  // Module
  
  this.passive = function(cmd)
  {
    if(!this.layer){ this.create_layer(); }

    this.layer.clear();
    this.layer.context().lineCap = cmd.variable("line_cap") ? cmd.variable("line_cap").value : "square";
    this.layer.context().lineWidth = cmd.variable("stroke_width") ? cmd.variable("stroke_width").value : 10;
    this.layer.context().strokeStyle = cmd.variable("stroke_color") ? cmd.variable("stroke_color").value : "#ffffff";
    this.layer.context().stroke(new Path2D(cmd.content.join(" ")));
  }
  
  this.active = function(cmd)
  {
    this.paths.push(this.create_path());
    this.coordinates = [];

    if(this.layer){ this.layer.remove(this); }

    ronin.surface.active_layer.context().lineCap = cmd.variable("line_cap") ? cmd.variable("line_cap").value : "square";
    ronin.surface.active_layer.context().lineWidth = cmd.variable("stroke_width") ? cmd.variable("stroke_width").value : 10;
    ronin.surface.active_layer.context().strokeStyle = cmd.variable("stroke_color") ? cmd.variable("stroke_color").value : "#ffffff";
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

    s += "<svg width='"+ronin.surface.size.width+"' height='"+ronin.surface.size.height+"' xmlns='http://www.w3.org/2000/svg' baseProfile='full' version='1.1' style='fill:none;stroke:red;stroke-width:2px'>";

    for (var i = 0; i < this.paths.length; i++) {
      s += "<path d='"+this.paths[i]+"' />";
    }

    s += "</svg>";
    console.log(s);
    return s;
  }

  // Mouse

  this.click = null;

  this.widget_cursor = function()
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

    commander.element_input.value = "+ "+this.create_path();
    commander.hint.update();
    this.passive(commander.cmd());
  }
  
  this.mouse_move = function(position)
  {
    if(!this.click){ return; }
    commander.element_input.value = "+ "+this.create_path();
    commander.element_input.value += "L"+position.render();
    commander.hint.update();
    this.passive(commander.cmd());
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
        this.coordinates.push("A1,1 0 0,1 "+position.render());
      }
      else if(keyboard.alt_held == true){
       this.coordinates.push("A1,1 0 0,0 "+position.render()); 
      }
      else{
        this.coordinates.push("l"+offset.render());
      }
    }

    commander.element_input.value = "+ "+this.create_path();
    commander.hint.update();
    this.passive(commander.cmd());
    this.last_pos = position;
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
    this.coordinates = [];
    this.last_pos = null;
  }
}