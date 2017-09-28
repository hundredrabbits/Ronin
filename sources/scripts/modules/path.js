function Path()
{
  Module.call(this,"path");

  this.methods.stroke = function(q)
  {
    ronin.preview.clear();

    var path = ronin.path.create_path(q);

    var ctx = ronin.render.context();

    ctx.beginPath();
    ctx.lineCap = "butt";
    ctx.lineWidth = 30;
    ctx.strokeStyle = "black";
    ctx.stroke(new Path2D(path));
    ctx.closePath();
  }

  this.methods.fill = function()
  {
    
  }

  this.preview = function(q)
  {
    if(!q.methods.stroke){ return; }

    ronin.preview.clear();
    var path = ronin.path.create_path(q.methods.stroke);

    var ctx = ronin.preview.context();
    ctx.beginPath();
    ctx.lineCap = "butt";
    ctx.lineWidth = 30;
    ctx.strokeStyle = "black";
    ctx.stroke(new Path2D(path));
    ctx.closePath();
  }

  this.create_path = function(q_array)
  {
    var svg_path = "";
    var prev = {x:0,y:0};
    for(q_id in q_array){
      var coord = q_array[q_id];
      if(!coord.x || !coord.y){ continue; }
      coord.x *= 2; coord.y *= 2;
      if(svg_path == ""){
        var origin = {x:coord.x,y:coord.y};
        svg_path += "M"+(coord.x)+","+(coord.y)+" ";
      }
      else if(coord.clockwise == true){
        var offset = make_offset(coord,prev);
        svg_path += "a"+(offset.x)+","+(offset.y)+" 0 0,1 "+(offset.x)+","+(offset.y);
      }
      else if(coord.clockwise == false){
        var offset = make_offset(coord,prev);
        svg_path += "a"+(offset.x)+","+(offset.y)+" 0 0,0 "+(offset.x)+","+(offset.y);        
      }
      else{
        var offset = make_offset(coord,prev);
        svg_path += "l"+(offset.x)+","+(offset.y)+" ";  
      }
      prev = coord;
    }
    return svg_path;
  }

  function make_offset(a,b)
  {
    return {x:a.x-b.x,y:a.y-b.y};
  }
}