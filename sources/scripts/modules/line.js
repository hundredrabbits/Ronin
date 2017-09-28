function Line()
{
  Module.call(this,"line","Drawing lines. Tween expects something in the `$&$>>$&$` format.");

  this.methods = {};

  this.ports = {};
  this.ports.step = new Port(this,"step",false,true,0,100,"The tween line index.");
  this.ports.thickness = new Port(this,"thickness",true,true,1,100,"The tween line thickness.");

  this.methods.tween = function(q) // line tween:$&$>>$&$ step->thickness
  {
    var from = q.from;
    var to = q.to;

    ronin.line.ports.step.write(0);
    while(ronin.line.ports.step.value < ronin.line.ports.step.max){
      var progress = ronin.line.ports.step.value/parseFloat(ronin.line.ports.step.max);
      var new_positions = tween_positions(from,to,progress);
      ronin.line.stroke_multi(new_positions);
      ronin.line.ports.step.write(ronin.line.ports.step.value+1);
    }
  }

  this.methods.stroke = function(q)
  {
    ronin.line.stroke_multi(q)
  }

  this.preview = function(q)
  {
    // TODO
    // console.log(q);
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

  this.stroke = function(from,to,ctx = ronin.render.context())
  {
    ctx.beginPath();
    ctx.globalCompositeOperation="source-over";
    ctx.moveTo((from.x * 2),(from.y * 2));
    ctx.lineTo((to.x * 2),(to.y * 2));
    ctx.lineCap="round";
    ctx.lineWidth = clamp(ronin.line.ports.thickness.value,1,200) * 0.1;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();
  }
  
  function clamp(v, min, max)
  { 
    return v < min ? min : v > max ? max : v; 
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