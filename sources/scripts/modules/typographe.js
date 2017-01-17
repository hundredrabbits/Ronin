function Typographe(rune)
{
  Module.call(this,rune);

  this.parameters = [Position,Color,Value];
  this.variables  = {"text" : null, "font" : "Georgia"};

  this.layer = null;

  this.install = function()
  {
    this.layer = new Layer("TextPreview",this);
    this.layer.element.setAttribute("style","z-index:7000");
    ronin.surface.add_layer(this.layer);
  }

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
    var target = this.layer;
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
    var font = cmd.variable("font") ? cmd.variable("font").value : "Georgia";

    ctx.font = size+"px "+font;
    ctx.fillStyle = color.hex; 
    ctx.fillText(text,position.x,position.y);
  }
}