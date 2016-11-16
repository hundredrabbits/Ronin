function Vector()
{
  Module.call(this);
  
  // Module
  
  this.passive = function(cmd)
  {
  }
  
  this.active = function(cmd)
  {
    var path = new Path2D('M 100,100 h 50 v 50 h 50');
    ronin.canvas.context().stroke(path);
  }
  
  this.hint = function(cmd)
  {
    return "Vector: "
  }
}