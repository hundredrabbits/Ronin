function Path(rune)
{
  Module.call(this,rune);

  this.add_mode(new Mode("stroke"));
  this.add_mode(new Mode("arc","shift"));
  this.add_mode(new Mode("arc_cc","alt"));
  this.add_mode(new Mode("stem","shift_alt"));

  this.add_setting(new Setting("fill_color","#ff0000"));
  this.add_setting(new Setting("line_width","3"));
  this.add_setting(new Setting("line_color","#ffffff"));
  this.add_setting(new Setting("line_cap","square"));

  this.add_method(new Method("stroke",["Positions"]));
  this.add_method(new Method("fill",["Positions"]));

  this.coordinates = [];
  this.last_pos = null;
  this.paths = [];

  this.stroke = function(cmd,preview = false)
  {
    if(!ronin.path.layer){ ronin.path.create_layer(); ronin.path.layer.is_blinking = true; }

    this.layer.clear();

    var context = preview ? this.context() : ronin.frame.context();

    context.beginPath();
    context.lineCap = this.settings["line_cap"].value;
    context.lineWidth = this.settings["line_width"].value;
    context.strokeStyle = this.settings["line_color"].value;
    context.stroke(new Path2D(cmd.values()));
    context.closePath();

    if(!preview){ this.coordinates = []; this.last_pos = null; if(!preview){ this.layer.remove(this); } }

    return 1, preview ? "preview" : "ok";
  }

  this.fill = function(cmd,preview = false)
  {
    if(!ronin.path.layer){ ronin.path.create_layer(); ronin.path.layer.is_blinking = true; }

    this.layer.clear();

    var context = preview ? this.context() : ronin.frame.context();

    context.beginPath();
    context.fillStyle = this.settings["fill_color"].value;
    context.fill(new Path2D(cmd.values()));
    context.closePath();

    if(!preview){ this.coordinates = []; this.last_pos = null; }

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
    for (var i = 0; i < this.paths.length; i++) {
      s += "<path d='"+this.paths[i]+"' />";
    }
    return "<svg width='"+ronin.frame.size.width+"' height='"+ronin.frame.size.height+"' xmlns='http://www.w3.org/2000/svg' baseProfile='full' version='1.1' style='fill:none;stroke:red;stroke-width:2px;stroke-linecap:square;'>"+s+"</svg>";
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
    var method = ronin.terminal.cmd().method() ? ronin.terminal.cmd().method().name : "stroke";
    var line = "path."+method+" "+this.create_path();
    line += "M"+position.toString();
    ronin.terminal.update(line);
  }
  
  this.mouse_move = function(position)
  {
    var method = ronin.terminal.cmd().method().name;
    var line = "path."+method+" "+this.create_path();
    line += "L"+position.toString();
    ronin.terminal.update(line);
  }
  
  this.mouse_up = function(position)
  {
    var method = ronin.terminal.cmd().method().name;

    if(this.coordinates.length == 0){
      this.coordinates.push("M"+position.toString());
    }
    else{
      var offset = this.last_pos ? position.offset(this.last_pos) : position;

      if(keyboard.shift_held == true && keyboard.alt_held == true){
        this.coordinates.push("M"+position.toString());
      }
      else if(keyboard.shift_held == true){
        this.coordinates.push("a"+offset.toString()+" 0 0,1 "+offset.toString());
      }
      else if(keyboard.alt_held == true){
       this.coordinates.push("a"+offset.toString()+" 0 0,0 "+offset.toString()); 
      }
      else{
        this.coordinates.push("l"+offset.toString());
      }
    }

    ronin.terminal.update("path."+method+" "+this.create_path());
    this.last_pos = position;
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
    this.coordinates = [];
    this.last_pos = null;
  }
}