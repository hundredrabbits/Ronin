function Filter_Stencil()
{
  Filter.call(this);
  this.parameters = [Angle];

  this.render = function(cmd)
  {
    this.draw(this.context(),cmd.angle() ? cmd.angle().degrees : 20);
    ronin.overlay.clear();
  }

  this.preview = function(cmd)
  {
    ronin.overlay.clear();
    this.draw(ronin.overlay.context(),cmd.angle() ? cmd.angle().degrees : 20);
  }

  this.draw = function(context = this.context(), angle = 20)
  {
    var w = ronin.surface.size.width;
    var h = ronin.surface.size.height;
    
    context.translate(w/2,h/2);

    context.rotate(angle*Math.PI/180);

    this.line(context,-w,0,w,0);

    this.line(context,w*0.4,-h,w*0.4,h);
    this.line(context,-w*0.4,-h,-w*0.4,h);

    this.line(context,-w,h*0.25,w,h*0.25);
    this.line(context,-w,-h*0.25,w,-h*0.25);

    this.line(context,w*0.1,0,w*0.1,h);
    this.line(context,-w*0.1,0,-w*0.1,-h);

    this.circle(context,w*0.4,-h*0.25,w*0.05,1,1.5);
    this.circle(context,-w*0.4,h*0.25,w*0.05,0,0.5);

    context.font = "5px Arial";
    context.fillStyle = "#999"; 
    context.fillText("GRID",(w*0.4)+10,10);

    context.font = "5px Arial";
    context.fillStyle = "#999"; 
    context.fillText("GRID",(-w*0.4)-20,-10);

    context.rotate(-angle*Math.PI/180);
    context.translate(-w/2,-h/2);
  }

  this.line = function(context,x1,x2,y1,y2)
  {
    context.beginPath();
    context.moveTo(x1,x2);
    context.lineTo(y1,y2);
    context.lineCap="round";
    context.lineWidth = 0.5;
    context.strokeStyle = "#999";
    context.stroke();
    context.closePath();
  }

  this.circle = function(context,x,y,r,c1,c2)
  {
    context.beginPath();
    context.arc(x,y,r,c1*Math.PI,c2*Math.PI);
    context.lineCap="round";
    context.lineWidth = 0.5;
    context.strokeStyle = "#999";
    context.stroke();
    context.closePath();
  }
}