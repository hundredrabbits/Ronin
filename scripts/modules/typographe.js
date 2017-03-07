function Typographe(rune)
{
  Module.call(this,rune);

  this.parameters = [Position,Color,Value];
  this.variables  = {"text" : null, "font" : "Georgia"};

  this.active = function(cmd)
  {
    if(this.layer){ this.layer.remove(this); }

    if(cmd.variable("text")){
      this.add_text(ronin.surface.active_layer.context(),cmd);
    }
  }

  this.passive = function(cmd)
  {
    if(!this.layer){ this.create_layer(); }

    if(cmd.variable("text")){
      this.layer.clear();
      this.add_text(this.layer.context(),cmd);
    }
  }

  this.add_text = function(context,cmd)
  {
    var ctx = context;

    var text = cmd.variable("text").value.replace(/_/g," ");
    var position = cmd.position() ? cmd.position() : new Position(20,40);
    var color = cmd.color() ? cmd.color() : new Color("#000000");
    var size = cmd.value() ? cmd.value().int : 40;
    var font = cmd.variable("font") ? cmd.variable("font").value : "Georgia";

    ctx.font = size+"px "+font;
    ctx.fillStyle = color.hex; 
    ctx.fillText(text,position.x,position.y);
  }

  // Mouse

  this.click = null;

  this.widget_cursor = function()
  {
    return "Typographe";
  }

  this.mouse_down = function(position)
  {
    this.click = true;
    ronin.overlay.draw(position);
    commander.element_input.value = "& "+position.render()+" ";
    commander.hint.update();
  }
  
  this.mouse_move = function(position)
  {
    if(!this.click){ return; }
    ronin.overlay.draw(position);
    commander.element_input.value = "& "+position.render();
  }
  
  this.mouse_up = function(position)
  {
    this.click = null;
    ronin.overlay.draw(position);
    commander.element_input.value = "& "+position.render();
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}