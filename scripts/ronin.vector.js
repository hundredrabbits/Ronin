function Vector()
{
  Module.call(this);
  
  // Module
  
  this.passive = function(cmd)
  {
  }
  
  this.active = function(cmd)
  {
    ronin.canvas.context().lineCap="round";
    ronin.canvas.context().lineWidth = ronin.brush.size;
    ronin.canvas.context().strokeStyle = ronin.brush.color.rgba();
    ronin.canvas.context().stroke(Path2D(cmd.content.join(" ")));
  }
  
  this.hint = function(cmd)
  {
    return "Vector: "
  }
  
  // M100,100 h200 a20,20 0 0 1 20,20 v200 a20,20 0 0 1 -20,20 h-200 a20,20 0 0 1 -20,-20 v-200 a20,20 0 0 1 20,-20 z
}