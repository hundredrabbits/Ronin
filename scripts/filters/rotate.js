function Filter_Rotate()
{
  Filter.call(this);
  this.parameters = [Angle,Position];

  this.render = function(cmd)
  {
    var position = cmd.position() ? cmd.position() : new Position(ronin.frame.settings["size"].width/2,ronin.frame.settings["size"].height/2);
    var angle = cmd.angle() ? cmd.angle().degrees : 90;

    ronin.overlay.clear();
    this.draw(this.context(),angle,position);
    ronin.overlay.clear();
  }

  this.preview = function(cmd)
  {
    if(cmd.position()){
      ronin.overlay.clear();
      ronin.overlay.draw_pointer(cmd.position());
    }
  }

  this.draw = function(context = this.context(), angle, position)
  {
    var w = ronin.frame.settings["size"].width;
    var h = ronin.frame.settings["size"].height;

    ronin.overlay.context().drawImage(context.canvas,0,0,w,h);

    ronin.frame.active_layer.clear();

    context.save();
    context.translate(position.x,position.y);
    context.rotate(angle*Math.PI/180);

    context.drawImage(ronin.overlay.context().canvas, -position.x, -position.y,w,h)

    context.rotate(-angle*Math.PI/180);
    context.restore();
  }
}