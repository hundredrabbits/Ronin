function Pointer(offset = new Position(), color = new Color('000000'))
{
  this.offset = offset;
  this.mirror = null;
  this.position_prev = null;
  this.angle = null;
  this.distance = 0;
  
  // Parameters

  this.thickness = function()
  {
    var ratio = 10/this.position().distance_to(this.position_prev);
    ratio = ratio > 1 ? 1 : ratio;
    return ronin.brush.size * ratio;
  }
  
  //

  this.draw = function()
  {
    if(!this.position_prev){this.position_prev = this.position(); }

    var position = this.position();
    
    this.distance += position.distance_to(this.position_prev);
    
    ronin.surface.context().beginPath();
    
    ronin.surface.context().globalCompositeOperation="source-over";
    ronin.surface.context().moveTo(this.position_prev.x,this.position_prev.y);
    ronin.surface.context().lineTo(position.x,position.y);
    ronin.surface.context().lineCap="round";
    ronin.surface.context().lineWidth = this.thickness();
    ronin.surface.context().strokeStyle = ronin.brush.color.rgba();
    ronin.surface.context().stroke();
    ronin.surface.context().closePath();
    
    this.position_prev = position;
  }
  
  this.position = function()
  {
    if(this.angle && this.offset){
      return this.position_rotation();
    }
    else if(this.mirror && this.mirror.width > 0){
      return this.position_mirror_x();
    }
    else if(this.mirror && this.mirror.height > 0){
      return this.position_mirror_y();
    }
    return this.position_default();
  }
  
  // Effects
  
  this.position_default = function()
  {
    return ronin.cursor.position.add(this.offset);
  }
  
  this.position_mirror_x = function()
  {
    return new Position((2 * this.mirror.width) - (ronin.cursor.position.x + this.offset.x), 0 + (ronin.cursor.position.y + this.offset.y));
  }
  
  this.position_mirror_y = function()
  {
    return new Position((ronin.cursor.position.x + this.offset.x), (2 * this.mirror.height) - (ronin.cursor.position.y + this.offset.y));
  }
  
  this.position_rotation = function()
  {
    var angle_radian = this.angle.degrees * Math.PI / 180;
    var deltaX = ronin.cursor.position.x - this.offset.x;
    var deltaY = ronin.cursor.position.y - this.offset.y;
    var t = Math.atan2(deltaY, deltaX) + angle_radian;
    var radius = ronin.cursor.position.distance_to(this.offset);
    var x = Math.cos(t) * radius;
    var y = Math.sin(t) * radius;
    return new Position(x + this.offset.x,y + this.offset.y);
  }
  
  this.start = function()
  {
  }
  
  this.stop = function()
  {
    this.position_prev = null;
  }

  this.widget = function()
  {
    return this.offset.render()+"<br />";
  }
}