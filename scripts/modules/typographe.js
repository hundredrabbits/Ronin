function Typographe(rune)
{
  Module.call(this,rune);

  this.parameters = [Position,Color,Value];
  this.variables  = {"text" : null, "font" : "Georgia"};

  this.layer = null;

  this.install = function()
  {
    this.layer = new Layer("Typographe.Preview",this);
    this.layer.element.setAttribute("style","z-index:7000;opacity:0.25");
    ronin.surface.add_layer(this.layer);
  }

  this.active = function(cmd)
  {
    this.layer.clear();
    ronin.overlay.clear();
    if(cmd.variable("text")){
      this.add_text(ronin.surface.active_layer.context(),cmd);
    }
  }

  this.passive = function(cmd)
  {
    if(cmd.variable("text")){
      this.add_text(this.layer.context(),cmd);
    }
  }

  this.add_text = function(context,cmd)
  {
    var ctx = context;

    var text = cmd.variable("text").value;
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
    return "&";
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
}