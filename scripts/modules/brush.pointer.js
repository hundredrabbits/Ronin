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
    var ratio = 10/this.position().distance_to(this.position_prev[0]);
    ratio = ratio > 1 ? 1 : ratio;
    return ronin.brush.settings["size"].float * ratio;
  }
  
  //

  this.draw = function()
  {
    if(!this.position_prev){this.position_prev = [this.position()]; return; }

    var position = this.position();
    var position_prev = this.position_prev[0];

    //remove stale previous positions
    if (this.position_prev.length > 3) this.position_prev.pop();

    this.distance += position.distance_to(position_prev);

    ronin.frame.context().beginPath();

    ronin.frame.context().globalCompositeOperation="source-over";
    ronin.frame.context().moveTo(position_prev.x,position_prev.y);

    //Choose direct line or curve line based on how many samples available
    if(this.position_prev.length > 1 && position.distance_to(position_prev) > 13){

      var d =
      position.distance_to(position_prev)/
      position_prev.distance_to(this.position_prev[1]);

      //caluclate a control point for the quad curve
      var ppx = position_prev.x - (this.position_prev[1].x - position_prev.x);
      var ppy = position_prev.y - (this.position_prev[1].y - position_prev.y);
      var px = (position.x + position_prev.x)/2;
      var py = (position.y + position_prev.y)/2;
      var tx = px + (ppx - px) * 0.2 * d;
      var ty = py + (ppy - py) * 0.2 * d;

      ronin.frame.context().quadraticCurveTo(tx,ty,position.x,position.y);
    }
    else {
      ronin.frame.context().lineTo(position.x,position.y);
    }

    ronin.frame.context().lineCap="round";
    ronin.frame.context().lineWidth = this.thickness();
    ronin.frame.context().strokeStyle = new Color(ronin.brush.settings["color"]).rgba();
    ronin.frame.context().stroke();
    ronin.frame.context().closePath();

    this.position_prev.unshift(position);
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