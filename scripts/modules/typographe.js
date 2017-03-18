function Typographe(rune)
{
  Module.call(this,rune);

  this.settings = {"color":new Color("#ffffff"),"size":new Value(10)};
  this.methods = {"draw":new Method("draw",["text","position","font"])}

  this.active = function(cmd)
  {
    if(this.layer){ this.layer.remove(this); }

    if(cmd.setting("text")){
      this.add_text(ronin.surface.active_layer.context(),cmd);
    }
  }

  this.passive = function(cmd)
  {
    if(!this.layer){ this.create_layer(); this.layer.is_blinking = true; }

    if(cmd.setting("text")){
      this.layer.clear();
      this.add_text(this.layer.context(),cmd);
    }
  }

  this.add_text = function(context,cmd)
  {
    var ctx = context;

    var text = cmd.setting("text").value.replace("_"," ");
    var position = cmd.position() ? cmd.position() : new Position(20,40);
    var color = cmd.color() ? cmd.color() : new Color("#000000");
    var size = cmd.value() ? cmd.value().int : 40;
    var font = cmd.setting("font") ? cmd.setting("font").value : "Georgia";

    ctx.font = size+"px "+font;
    ctx.fillStyle = color.hex; 
    ctx.fillText(text,position.x,position.y);
  }

  // Mouse

  this.mouse_mode = function()
  {
    return "Typographe";
  }

  this.mouse_down = function(position)
  {
    ronin.overlay.draw(position);
    ronin.terminal.input_element.value = "& "+position.render()+" ";
    ronin.terminal.update_hint();
  }
  
  this.mouse_move = function(position,rect)
  {
    if(!this.mouse_held){ return; }

    ronin.overlay.draw(position);
    ronin.terminal.input_element.value = "& "+position.render()+" ";
    ronin.terminal.update_hint();
  }
  
  this.mouse_up = function(position)
  {
    ronin.overlay.draw(position);
    ronin.terminal.input_element.value = "& "+position.render()+" ";
    ronin.terminal.update_hint();
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}