function Vector()
{
  Module.call(this);
  
  // Module
  
  this.passive = function(cmd)
  {
  }
  
  this.active = function(cmd)
  {
    var path = new Path2D(cmd.content.join(" "));
    
    console.log(ronin.size);
    
    ronin.canvas.context().lineCap="round";
    ronin.canvas.context().lineWidth = ronin.brush.size;
    ronin.canvas.context().strokeStyle = ronin.brush.color.rgba();
    ronin.canvas.context().stroke(path);
  }
  
  this.hint = function(cmd)
  {
    return "Vector: "
  }
}