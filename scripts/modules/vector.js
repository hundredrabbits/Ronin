function Vector(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.variables  = {"fill_color" : "none","stroke_width" : 5,"stroke_color" : "#ffffff", "line_cap" : "square"};

  this.layer = null;
  this.coordinates = [];

  this.install = function()
  {
    this.layer = new Layer("Vector.Preview",this);
    this.layer.element.setAttribute("style","z-index:8000;opacity:0.75");
    ronin.surface.add_layer(this.layer);
  }
  
  // Module
  
  this.passive = function(cmd)
  {
    this.layer.clear();
    this.layer.context().lineCap = cmd.variable("line_cap") ? cmd.variable("line_cap").value : "round";
    this.layer.context().lineWidth = cmd.variable("stroke_width") ? cmd.variable("stroke_width").value : 5;
    this.layer.context().strokeStyle = cmd.variable("stroke_color") ? cmd.variable("stroke_color").value : "#ffffff";
    this.layer.context().stroke(new Path2D(cmd.content.join(" ")));
  }
  
  this.active = function(cmd)
  {
    this.coordinates = [];
    this.layer.clear();
    ronin.surface.active_layer.context().lineCap = cmd.variable("line_cap") ? cmd.variable("line_cap").value : "round";
    ronin.surface.active_layer.context().lineWidth = cmd.variable("stroke_width") ? cmd.variable("stroke_width").value : 5;
    ronin.surface.active_layer.context().strokeStyle = cmd.variable("stroke_color") ? cmd.variable("stroke_color").value : "#ffffff";
    ronin.surface.active_layer.context().stroke(new Path2D(cmd.content.join(" ")));
  }

  // Mouse

  this.click = null;

  this.widget_cursor = function()
  {
    if(keyboard.shift_held == true){
      return "Vector(Counterclock Arc)";
    }
    else if(keyboard.alt_held == true){
      return "Vector(Clockwise Arc)";
    }
    else{
      return "Vector(Line)";
    }
  }

  this.create_command = function()
  {
    var command = "+ ";

    for (var i = 0; i < this.coordinates.length; i++) {
      command += i == 0 ? "M"+this.coordinates[i]+" " : this.coordinates[i]+" ";
    }
    return command;
  }

  this.mouse_down = function(position)
  {
    this.click = true;

    commander.element_input.value = this.create_command();
    commander.hint.update();
    this.passive(commander.cmd());
  }
  
  this.mouse_move = function(position)
  {
    if(!this.click){ return; }
    commander.element_input.value = this.create_command();
    commander.element_input.value += "L"+position.render();
    commander.hint.update();
    this.passive(commander.cmd());
  }
  
  this.mouse_up = function(position)
  {
    this.click = null;

    // Add the right thing
    if(keyboard.shift_held == true){
      this.coordinates.push("A1,1 0 0,1 "+position.render());
    }
    else if(keyboard.alt_held == true){
     this.coordinates.push("A1,1 0 0,0 "+position.render()); 
    }
    else{
      this.coordinates.push(position.render());
    }
  
    commander.element_input.value = this.create_command();
    commander.hint.update();
    this.passive(commander.cmd());
  }
}