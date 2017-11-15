function Guide()
{
  Layer.call(this);
  
  this.el.id = "guide";
  this.inspect = true;

  this.update = function()
  {
    this.clear();

    this.el.width = window.innerWidth * 2;
    this.el.height = window.innerHeight * 2;
    this.el.style.width = (window.innerWidth)+"px";
    this.el.style.height = (window.innerHeight)+"px";

    var units = this.find_units();

    if(units.length == 0){ return; }

    for(i in units){
      this.draw(units[i]);
    }
  }

  this.draw = function(u = null)
  { 
    if(u && u.x && u.y){
      this.draw_pos(u);
    }
    if(u && u.width && u.height){
      this.draw_rect(u);
      this.draw_pos({x:u.x + (u.width/2),y:u.y + (u.height/2)});
    }
    if(this.inspect){
      this.draw_inspector();
    }
  }

  this.draw_rect = function(u)
  {
    var ctx = this.context();

    u.x = !u.x ? 0 : u.x;
    u.y = !u.y ? 0 : u.y;

    var offset = {x:u.x * 2, y:u.y * 2};
    var rect = {width:u.width * 2,height:u.height * 2};

    // Outline

    ctx.beginPath();
    ctx.globalCompositeOperation="source-over";
    ctx.moveTo(offset.x,offset.y);
    ctx.lineTo(offset.x + rect.width,offset.y);
    ctx.lineTo(offset.x + rect.width,offset.y + rect.height);
    ctx.lineTo(offset.x,offset.y + rect.height);
    ctx.lineTo(offset.x,offset.y);
    ctx.lineCap="round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();
  }


  this.draw_line = function(u1,u2, color = "#000")
  {
    var ctx = this.context();

    ctx.beginPath();
    ctx.globalCompositeOperation="source-over";
    ctx.moveTo(u1.x * 2,u1.y * 2);
    ctx.lineTo(u2.x * 2,u2.y * 2);
    ctx.lineCap="round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  this.draw_pos = function(u)
  {
    var ctx = this.context();

    var offset = 2;
    var radius = 5;

    var pos = {x:u.x * 2, y:u.y * 2};

    ctx.beginPath();
    ctx.globalCompositeOperation="source-over";
    ctx.moveTo(pos.x+offset,pos.y);
    ctx.lineTo(pos.x+radius,pos.y);
    ctx.moveTo(pos.x,pos.y+offset);
    ctx.lineTo(pos.x,pos.y+radius);
    ctx.moveTo(pos.x-offset,pos.y);
    ctx.lineTo(pos.x-radius,pos.y);
    ctx.moveTo(pos.x,pos.y-offset);
    ctx.lineTo(pos.x,pos.y-radius);
    ctx.lineCap="round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.closePath();
  }

  this.find_units = function(q = ronin.commander.query())
  {
    var a = [];
    if(q.settings.anchor){ return q.settings.anchor; }

    for(method_id in q.methods){
      var params = q.methods[method_id];
      if(params.from && params.to){
        a = a.concat(params.from);
        a = a.concat(params.to);
      }
      else{
        a = a.concat(params);  
      }
    }
    return a;
  }

  this.draw_inspector = function()
  {
    // 
    this.draw_line({x:ronin.frame.width/2,y:0},{x:ronin.frame.width/2,y:ronin.frame.height},"red");
    this.draw_line({x:0,y:ronin.frame.height/2},{x:ronin.frame.width,y:ronin.frame.height/2},"red");

    var ctx = this.context();

    var w = ronin.frame.width * 2;
    var h = ronin.frame.height * 2;
    var angle = parseInt(ronin.commander.query().methods.inspect) > 0 ? parseInt(ronin.commander.query().methods.inspect) : 0;
    var color = "red"
    
    ctx.translate(w/2,h/2);

    ctx.rotate(angle*Math.PI/180);

    this.line(ctx,-w,0,w,0,color);

    this.line(ctx,w*0.4,-h,w*0.4,h,color);
    this.line(ctx,-w*0.4,-h,-w*0.4,h,color);

    this.line(ctx,-w,h*0.25,w,h*0.25,color);
    this.line(ctx,-w,-h*0.25,w,-h*0.25,color);

    this.line(ctx,w*0.1,0,w*0.1,h,color);
    this.line(ctx,-w*0.1,0,-w*0.1,-h,color);

    this.circle(ctx,w*0.4,-h*0.25,w*0.05,1,1.5,color);
    this.circle(ctx,-w*0.4,h*0.25,w*0.05,0,0.5,color);

    ctx.font = "5px Arial";
    ctx.fillStyle = color; 
    ctx.fillText(angle+"'",(w*0.4)+10,10);

    ctx.font = "5px Arial";
    ctx.fillStyle = color; 
    ctx.fillText(angle+"'",(-w*0.4)-20,-10);

    ctx.rotate(-angle*Math.PI/180);
    ctx.translate(-w/2,-h/2);
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