function Typographe(rune)
{
  Module.call(this,rune);

  this.parameters = [Position,Color];
  this.variables  = {"text" : null};

  this.active = function(cmd)
  {
    var target = ronin.surface.active_layer;
    target.clear();
    if(cmd.variable("text")){
      this.add_text(target.context(),cmd);
    }
  }

  this.passive = function(cmd)
  {
    var target = ronin.overlay;
    target.clear();
    if(cmd.variable("text")){
      this.add_text(target.context(),cmd);
    }
  }

  this.add_text = function(context,cmd)
  {
    var ctx = context;

    var text = cmd.variable("text").value;
    var position = cmd.position() ? cmd.position() : new Position(20,40);
    var color = cmd.color() ? cmd.color() : new Color("#000000");
    var size = cmd.value() ? cmd.value().int : 20;

    ctx.font = size+"px Georgia";
    ctx.fillStyle = color.hex; 
    ctx.fillText(text,position.x,position.y);
  }
}