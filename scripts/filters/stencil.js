function Filter_Stencil()
{
  Filter.call(this);

  this.render = function()
  {
    this.draw();
  }

  this.preview = function()
  {
    
  }

  this.draw = function()
  {
    var context = this.context();
    var w = ronin.surface.size.width;
    var h = ronin.surface.size.height;
    
    context.translate(w/2,h/2);

    context.rotate(20*Math.PI/180);

    this.line(-w,0,w,0);

    this.line(w*0.4,-h,w*0.4,h);
    this.line(-w*0.4,-h,-w*0.4,h);

    this.line(-w,h*0.25,w,h*0.25);
    this.line(-w,-h*0.25,w,-h*0.25);

    this.line(w*0.1,0,w*0.1,h);
    this.line(-w*0.1,0,-w*0.1,-h);

    this.circle(w*0.4,-h*0.25,w*0.05,1,1.5);
    this.circle(-w*0.4,h*0.25,w*0.05,0,0.5);

    context.font = "5px Arial";
    context.fillStyle = "#000000"; 
    context.fillText("GRID",(w*0.4)+10,10);

    context.font = "5px Arial";
    context.fillStyle = "#000000"; 
    context.fillText("GRID",(-w*0.4)-20,-10);

    context.rotate(-20*Math.PI/180);
    context.translate(-w/2,-h/2);
  }

  this.line = function(x1,x2,y1,y2)
  {
    this.context().beginPath();

    this.context().moveTo(x1,x2);
    this.context().lineTo(y1,y2);

    this.context().lineCap="round";
    this.context().lineWidth = 0.5;
    this.context().strokeStyle = "#000";
    this.context().stroke();
    this.context().closePath();
  }

  this.circle = function(x,y,r,c1,c2)
  {
    this.context().beginPath();
    this.context().arc(x,y,r,c1*Math.PI,c2*Math.PI);
    this.context().lineCap="round";
    this.context().lineWidth = 0.5;
    this.context().strokeStyle = "#000";
    this.context().stroke();
    this.context().closePath();
  }
}