function Filter_Stencil()
{
  Filter.call(this);
  this.parameters = [Angle,Color];

  this.render = function(cmd)
  {
    var angle = cmd.angle() ? cmd.angle().degrees : 20;
    var color = cmd.color() ? cmd.color().hex : "#000000";

    this.draw(ronin.frame.context(),angle,color);
    if(ronin.render.layer){ ronin.render.layer.remove(this); }

    return 1, "ok";
  }

  this.preview = function(cmd)
  {
    var angle = cmd.angle() ? cmd.angle().degrees : 20;
    var color = cmd.color() ? cmd.color().hex : "#000000";

    ronin.render.get_layer().clear();
    this.draw(ronin.render.layer.context(),angle,color);
  }

  this.draw = function(context = this.context(), angle, color)
  {
    var w = ronin.frame.size.width;
    var h = ronin.frame.size.height;
    
    context.translate(w/2,h/2);

    context.rotate(angle*Math.PI/180);

    this.line(context,-w,0,w,0,color);

    this.line(context,w*0.4,-h,w*0.4,h,color);
    this.line(context,-w*0.4,-h,-w*0.4,h,color);

    this.line(context,-w,h*0.25,w,h*0.25,color);
    this.line(context,-w,-h*0.25,w,-h*0.25,color);

    this.line(context,w*0.1,0,w*0.1,h,color);
    this.line(context,-w*0.1,0,-w*0.1,-h,color);

    this.circle(context,w*0.4,-h*0.25,w*0.05,1,1.5,color);
    this.circle(context,-w*0.4,h*0.25,w*0.05,0,0.5,color);

    context.font = "5px Arial";
    context.fillStyle = color; 
    context.fillText(angle+"'",(w*0.4)+10,10);

    context.font = "5px Arial";
    context.fillStyle = color; 
    context.fillText(angle+"'",(-w*0.4)-20,-10);

    context.rotate(-angle*Math.PI/180);
    context.translate(-w/2,-h/2);
  }

  this.line = function(context,x1,x2,y1,y2,color)
  {
    context.beginPath();
    context.moveTo(x1,x2);
    context.lineTo(y1,y2);
    context.lineCap="round";
    context.lineWidth = 0.5;
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
  }

  this.circle = function(context,x,y,r,c1,c2,color)
  {
    context.beginPath();
    context.arc(x,y,r,c1*Math.PI,c2*Math.PI);
    context.lineCap="round";
    context.lineWidth = 0.5;
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
  }
}