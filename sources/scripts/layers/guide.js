function Guide()
{
  Layer.call(this);
  
  this.el.id = "guide";

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

  this.draw = function(u)
  { 
    if(u.x && u.y){
      this.draw_pos(u);
    }
    if(u.width && u.height){
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

    // for(setting in q.settings){
    //   var params = q.settings[method_id];
    //   if(!params){ return null; }
    //   if(params[0]){ return params[0]; }
    //   return params;
    // }

    return a;
  }
}