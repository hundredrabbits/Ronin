function Line()
{
  Module.call(this,"line");

  this.settings = {steps:100};

  this.methods = {};

  this.ports = {};

  this.methods.tween = function(q)
  {
    var from = q.from;
    var to = q.to;

    var s = 0;
    while(s < ronin.line.settings.steps){
      var progress = s/parseFloat(ronin.line.settings.steps);
      var new_positions = tween_positions(from,to,progress);
      ronin.line.stroke_multi(new_positions);
      s += 1;
    }
  }

  this.methods.stroke = function(q)
  {
    console.log(q)
    ronin.line.stroke_multi(q)
  }

  this.stroke_multi = function(coordinates)
  {
    var from = coordinates[0];
    for(pos_id in coordinates){
      var pos = coordinates[pos_id];
      ronin.line.stroke(from,pos);
      from = pos;
    }
  }

  this.stroke = function(from,to)
  {
    var ctx = ronin.render.context();

    ctx.beginPath();
    ctx.globalCompositeOperation="source-over";
    ctx.moveTo((from.x * 2),(from.y * 2));
    ctx.lineTo((to.x * 2),(to.y * 2));
    ctx.lineCap="round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();
  }

  function tween_positions(froms,tos,progress)
  {
    var a = [];
    for(pos_id in froms){
      var from = froms[pos_id];
      var to = tos[pos_id];
      a.push(tween_position(from,to,progress));
    }

    return a;
  }

  function tween_position(from,to,progress)
  {
    var offset = {x:to.x - from.x,y:to.y - from.y};
    return {x:from.x + offset.x * progress,y:from.y + offset.y * progress};
  }
}