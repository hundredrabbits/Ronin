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
    var color = params.color() ? params.color() :new Color("#ffffff");
    var size = this.settings["size"];
    var font = this.settings["font"];

    var target_layer = preview ? this.layer : ronin.frame.active_layer;
    target_layer.context().font = size+"px "+font;
    target_layer.context().fillStyle = color.hex; 
    target_layer.context().fillText(text,position.x,position.y);

    console.log(target_layer.context());
  }

  // Mouse

  this.mouse_mode = function()
  {
    return "Type";
  }

  this.mouse_down = function(position)
  {
    ronin.terminal.input_element.value = "type."+ronin.terminal.method_name+" "+position.render();
    ronin.terminal.passive();
  }
  
  this.mouse_move = function(position,rect)
  {
    ronin.terminal.input_element.value = "type."+ronin.terminal.method_name+" "+position.render();
    ronin.terminal.passive();
  }
  
  this.mouse_up = function(position)
  {
    ronin.terminal.input_element.value = "type."+ronin.terminal.method_name+" "+position.render();
    ronin.terminal.passive();
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
    ronin.terminal.input_element.value = "";
    ronin.terminal.passive();
  }
}