function Type(rune)
{
  Module.call(this,rune);

  this.add_method(new Method("write",["Position","Text"],"Add position"));

  this.settings = {"color":"#ffffff","size":"20","font":"Din"};

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

    if(!preview){ this.layer.remove(this); }

    return 1, "Wrote "+text+" at "+position.render();
  }

  // Mouse

  this.mouse_mode = function()
  {
    return "Write";
  }

  this.mouse_down = function(position)
  {
    var str = ronin.terminal.cmd().text() ? ronin.terminal.cmd().text() : "Placeholder";
    var line = "type.write "+position.render()+" \""+str+"\"";
    ronin.terminal.update(line);
  }
  
  this.mouse_move = function(position,rect)
  {
  }
  
  this.mouse_up = function(position)
  {
    var str = ronin.terminal.cmd().text() ? ronin.terminal.cmd().text() : "Placeholder";
    var line = "type.write "+position.render()+" \""+str+"\"";
    ronin.terminal.update(line);
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}