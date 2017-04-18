function Type(rune)
{
  Module.call(this,rune);

  this.add_method(new Method("write",["Position","Text"],"Add position"));

  this.settings = {"color":"#ffffff","size":"10","font":"Din"};

  this.write = function(params,preview = false)
  {
    if(!this.layer){ this.create_layer(); this.layer.is_blinking = true; }

    this.layer.clear();

    var text = params.text() ? params.text() : "Placeholder";
    var position = params.position() ? params.position() : new Position(40,80);
    var color = this.settings["color"];
    var size = this.settings["size"];
    var font = this.settings["font"];

    var target_layer = preview ? this.layer : ronin.frame.active_layer;
    target_layer.context().font = size+"px "+font;
    target_layer.context().fillStyle = color; 
    target_layer.context().fillText(text,position.x,position.y);

    return 1, preview ? "preview" : "ok";
  }

  // Mouse

  this.mouse_mode = function()
  {
    return "Type";
  }

  this.mouse_down = function(position)
  {
    var line = "type.write "+position.render()+" \"Placeholder\"";
    ronin.terminal.update_active_line(line);
  }
  
  this.mouse_move = function(position,rect)
  {
    var line = "type.write "+position.render()+" \"Placeholder\"";
    ronin.terminal.update_active_line(line);
  }
  
  this.mouse_up = function(position)
  {
    var line = "type.write "+position.render()+" \"Placeholder\"";
    ronin.terminal.update_active_line(line);
    ronin.terminal.textarea.value += "\n";
    ronin.cursor.release();
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}