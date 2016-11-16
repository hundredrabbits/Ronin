function Stroke(element)
{
  Module.call(this);
  
  this.parameters = [Any];
  
  // Module
  
  this.passive = function(cmd)
  {
  }
  
  this.active = function(cmd)
  {
    // TODO
    
    var origin = new Position(cmd.content[0]);
    var destination = new Position(cmd.content[1]);
    
    var e = {};
    e.clientX = origin.x;
    e.clientY = origin.y;
    
    ronin.brush.is_drawing = true;
    ronin.brush.draw(e);
    
    e.clientX = destination.x;
    e.clientY = destination.y;
    
    ronin.brush.draw(e);
    ronin.brush.is_drawing = false;
  }
  
}