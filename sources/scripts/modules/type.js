function Type(rune)
{
  Module.call(this,rune);

  this.add_method(new Method("write",["Position","Text"]));
  this.add_mode(new Mode("write"));
  this.add_setting(new Setting("color","#000000"));
  this.add_setting(new Setting("size","40"));
  this.add_setting(new Setting("font","DIN Medium"));

  this.write = function(cmd,preview = false)
  {
    if(!this.layer){ this.create_layer(true); this.layer.is_blinking = true; }
    
    this.layer.clear();

    var text = cmd.text() ? cmd.text() : "Text";
    var position = cmd.position() ? cmd.position() : new Position(40,80);
    var color = this.settings["color"].value;
    var size = parseFloat(this.settings["size"].value);
    var font = this.settings["font"].value;

    var target_layer = preview ? this.layer : ronin.frame.active_layer;
    target_layer.context().font = size+"px "+font;
    target_layer.context().fillStyle = color; 
    target_layer.context().fillText(text,position.x,position.y);

    if(!preview){ this.layer.remove(this); }

    return 1, "Wrote "+text+" at "+position.toString();
  }

  // Mouse

  this.mouse_mode = function()
  {
    return "Write";
  }

  this.mouse_down = function(position)
  {
    var str = ronin.terminal.cmd().text() ? ronin.terminal.cmd().text() : "Text";
    var line = "type.write "+position.toString()+" \""+str+"\"";
    ronin.terminal.update(line);
  }
  
  this.mouse_move = function(position,rect)
  {
  }
  
  this.mouse_up = function(position)
  {
    var str = ronin.terminal.cmd().text() ? ronin.terminal.cmd().text() : "Text";
    var line = "type.write "+position.toString()+" \""+str+"\"";
    ronin.terminal.update(line);
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}