function Eraser()
{
  Module.call(this,"eraser");

  this.thickness = function(line)
  {
    return ronin.brush.thickness(line);
  }

  this.stroke = function(line)
  {
    var ctx = ronin.render.context();

    ctx.beginPath();
    ctx.globalCompositeOperation="destination-out";
    ctx.moveTo(line.from.x * 2,line.from.y * 2);
    ctx.lineTo(line.to.x * 2,line.to.y * 2);
    ctx.lineCap="round";
    ctx.lineWidth = this.thickness(line);
    ctx.stroke();
    ctx.closePath();
  }
}