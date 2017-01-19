function Vector(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.variables  = {"fill_color" : "none","stroke_width" : 2,"stroke_color" : "#ffffff", "line_cap" : "square"};

  this.layer = null;

  this.install = function()
  {
    this.layer = new Layer("Vector.Preview",this);
    this.layer.element.setAttribute("style","z-index:8000");
    ronin.surface.add_layer(this.layer);
  }
  
  // Module
  
  this.passive = function(cmd)
  {
    this.layer.clear();
    this.layer.context().lineCap = cmd.variable("line_cap") ? cmd.variable("line_cap").value : "round";
    this.layer.context().lineWidth = cmd.variable("stroke_width") ? cmd.variable("stroke_width").value : ronin.brush.size;
    this.layer.context().strokeStyle = cmd.variable("stroke_color") ? cmd.variable("stroke_color").value : "#ffffff";
    this.layer.context().stroke(new Path2D(cmd.content.join(" ")));
  }
  
  this.active = function(cmd)
  {
    this.layer.clear();
    ronin.surface.active_layer.context().lineCap = cmd.variable("line_cap") ? cmd.variable("line_cap").value : "round";
    ronin.surface.active_layer.context().lineWidth = cmd.variable("stroke_width") ? cmd.variable("stroke_width").value : ronin.brush.size;
    ronin.surface.active_layer.context().strokeStyle = cmd.variable("stroke_color") ? cmd.variable("stroke_color").value : "#ffffff";
    ronin.surface.active_layer.context().stroke(new Path2D(cmd.content.join(" ")));
  }
}