function Guide()
{
  Layer.call(this);
  
  this.el.id = "guide";
  this.inspect = true;

  this.update = function()
  {
    this.clear();

    var units = this.find_units();

    if(this.inspect){
      this.draw_inspector();
    }

    if(ronin.commander.input_el.value == "~"){
      this.toggle_color_picker(true);
    }

    // Brush mirrors
    for(id in ronin.brush.pointers){
      var pointer = ronin.brush.pointers[id];
      if(!pointer.options.mirror){ continue; }
      units.push({x1:pointer.options.mirror.x,y1:0,x2:pointer.options.mirror.x,y2:ronin.frame.height})
    }
    
    if(units.length == 0){ return; }

    for(i in units){
      this.draw(units[i]);
    }
  }

  this.toggle = function()
  {
    this.el.style.opacity = this.el.style.opacity == 0 ? 1 : 0
  }

  this.toggle_color_picker = function(show)
  {
    if(!show){ return; }
    var originalData = ronin.cursor.target.context().getImageData(0, 0, ronin.frame.width*2, ronin.frame.height*2);
    var data = originalData.data;
    for(var i = 0; i < data.length; i += 4) {
      var x = i % (ronin.frame.width*8)
      var y = i / (ronin.frame.width*32)
      data[i]     = x/32;
      data[i + 1] = 255 - (x/32);
      data[i + 2] = y;
      data[i + 3] = 255;
    }
    ronin.layers.guide.context().putImageData(originalData, 0, 0);
  }

  this.draw = function(u = null)
  { 
    if(u && u.x1 != null && u.y1 != null && u.x2 != null && u.y2 != null){
      this.draw_line({x:u.x1,y:u.y1},{x:u.x2,y:u.y2})
    }

    if(u && u.x && u.y){
      this.draw_pos(u);
    }
    if(u && u.width && u.height){
      this.draw_rect(u);
      this.draw_pos({x:u.x + (u.width/2),y:u.y + (u.height/2)});
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
    ctx.lineWidth = 0.5;
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
    var color = "black"

    // Center
    this.draw_line({x:0,y:ronin.frame.height/2},{x:10,y:ronin.frame.height/2},color);
    this.draw_line({x:ronin.frame.width-10,y:ronin.frame.height/2},{x:ronin.frame.width,y:ronin.frame.height/2},color);
    this.draw_line({x:(ronin.frame.width/2)-10,y:ronin.frame.height/2},{x:(ronin.frame.width/2)+10,y:ronin.frame.height/2},color);
    this.draw_line({x:ronin.frame.width/2,y:0},{x:ronin.frame.width/2,y:10},color);
    this.draw_line({x:ronin.frame.width/2,y:ronin.frame.height-10},{x:ronin.frame.width/2,y:ronin.frame.height},color);
    this.draw_line({x:ronin.frame.width/2,y:(ronin.frame.height/2)-10},{x:ronin.frame.width/2,y:(ronin.frame.height/2)+10},color);

    var ctx = this.context();

    var w = ronin.frame.width * 2;
    var h = ronin.frame.height * 2;
    var angle = 45;
    
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