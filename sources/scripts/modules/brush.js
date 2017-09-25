function Brush()
{
  Module.call(this,"brush");

  this.settings = {size:10,color:"#f00"};

  this.thickness = function(line)
  {
    var ratio = 1 - (distance_between(line.from,line.to)/15.0);
    return this.settings.size * ratio;
  }

  this.stroke = function(line)
  {
    ronin.commander.blur();
    var ctx = ronin.render.context();

    ctx.beginPath();
    ctx.globalCompositeOperation="source-over";
    ctx.moveTo(line.from.x * 2,line.from.y * 2);
    ctx.lineTo(line.to.x * 2,line.to.y * 2);
    ctx.lineCap="round";
    ctx.lineWidth = this.thickness(line);
    ctx.strokeStyle = this.settings.color;
    ctx.stroke();
    ctx.closePath();
  }

  this.mod_size = function(mod)
  {
    this.settings.size = clamp(this.settings.size+mod,1,100);
  }

  function clamp(v, min, max)
  { 
    return v < min ? min : v > max ? max : v; 
  }

  function distance_between(a,b)
  {
    return Math.sqrt( (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y) );
  }
}