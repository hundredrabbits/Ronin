function Grid()
{
  Layer.call(this);

  this.el.id = "grid";

  this.draw = function()
  {
    var size = 60;
    var x = 1;
    while(x < this.el.width/size){
      var y = 1;
      while(y < (this.el.height/size)-1){
        this.draw_vertex(x * size,y * size)
        y += 1;
      }
      x += 1;
    }
  }

  this.draw_vertex = function(x,y)
  {
    var ctx = this.context();
    var r = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ccc';
    ctx.fill();
  }

  this.resize_to = function(size)
  {
    this.el.width = size.width * 2;
    this.el.height = size.height * 2;
    this.el.style.width = size.width+"px";
    this.el.style.height = size.height+"px";

    this.draw();
  }
}