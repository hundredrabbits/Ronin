function Eraser(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Value];
  this.size = 5;
  
  // Module
  
  this.position_prev = null;
  
  this.draw = function()
  {
    if(!this.position_prev){this.position_prev = ronin.cursor.position; }
    if(ronin.brush.size < 0){ this.erase(); return; }
    
    var position = ronin.cursor.position;
    
    this.distance += position.distance_to(this.position_prev);
    
    ronin.canvas.context().beginPath();
    ronin.canvas.context().globalCompositeOperation="destination-out";
    ronin.canvas.context().moveTo(this.position_prev.x,this.position_prev.y);
    ronin.canvas.context().lineTo(position.x,position.y);
    ronin.canvas.context().lineCap="round";
    ronin.canvas.context().lineWidth = 10;
    ronin.canvas.context().strokeStyle = new Color("#ff0000").rgba();
    ronin.canvas.context().stroke();
    ronin.canvas.context().closePath();
    
    this.position_prev = position;
  }
  
  this.active = function(cmd)
  {
    if(cmd.value()){
      this.size = cmd.value().float;
    }
  }
  
  this.passive = function(cmd)
  {
    
  }

  this.widget_cursor = function()
  {
    return "Eraser "+this.size;
  }
  
  // Cursor

  this.is_drawing = false;
  
  this.mouse_down = function(position)
  {
    this.is_drawing = true;
    this.position_prev = null;
    
    ronin.stroke.new_stroke();
  }
  
  this.mouse_move = function(position)
  {
    if(this.is_drawing === false){ return; }
  
    this.draw();
    
    ronin.stroke.append_stroke(position);
  }
  
  this.mouse_up = function(position)
  {
    this.is_drawing = false;
    this.position_prev = null;
    
    ronin.stroke.save_stroke();
  }
}