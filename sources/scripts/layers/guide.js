function Guide()
{
  Layer.call(this);
  
  this.el.id = "guide";

  this.update = function()
  {
    this.el.width = window.innerWidth * 2;
    this.el.height = window.innerHeight * 2;
    this.el.style.width = (window.innerWidth)+"px";
    this.el.style.height = (window.innerHeight)+"px";

    var u = this.find_unit();
    console.log("found:",u)
    if(!u){ return; }

    this.clear();
    this.draw(u)
  }

  this.draw = function(u)
  {    
    if(u.x && u.y){
      this.draw_pos(u);
    }
    if(u.width && u.height){
      this.draw_rect(u);
    }
  }

  this.draw_rect = function(u)
  {
    var ctx = this.context();

    u.x = !u.x ? 0 : u.x;
    u.y = !u.y ? 0 : u.y;

    var offset = {x:u.x * 2, y:u.y * 2};
    var rect = {width:u.width * 2,height:u.height * 2};

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
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();
  }

  this.find_unit = function(q = ronin.commander.query())
  {
    if(q.settings.anchor){ return q.settings.anchor; }

    console.log("-----",q.settings)
    for(method_id in q.methods){
      var params = q.methods[method_id];
      if(!params){ return null; }
      if(params.from){ return params.from[0]; }
      if(params[0]){ return params[0]; }
      return params;
    }

    for(method_id in q.settings){
      var params = q.settings[method_id];
      if(!params){ return null; }
      if(params[0]){ return params[0]; }
      return params;
    }

    return null;
  }
}