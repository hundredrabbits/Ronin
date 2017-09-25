function Pointer(offset = new Position(), color = null, scale = 1, angle = 1)
{
  this.offset = offset;
  this.color = color;
  this.scale = scale;
  this.angle = null;

  this.mirror_x = null;
  this.mirror_y = null;

  this.position_prev = null;
  this.distance = 0;
  
  // Parameters

  this.actual_thickness = 0;

  this.thickness = function()
  {
    var radius = ronin.brush.settings["size"].to_f() * this.scale;
    var ratio = 1 - this.position().distance_to((this.position_prev ? this.position_prev[0] : 1)) / 10;
    var target = radius * ratio;
    var rate = ronin.brush.settings["size"].to_f()/8;

    if(this.actual_thickness < target){ this.actual_thickness += rate; }
    if(this.actual_thickness > target){ this.actual_thickness -= rate; }

    return this.actual_thickness;
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
    if(this.position_prev.length > 1 && position.distance_to(position_prev) > 5){

      var d = position.distance_to(position_prev)/position_prev.distance_to(this.position_prev[1]);

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
    ronin.frame.context().strokeStyle = this.color ? this.color : ronin.brush.settings["color"].value;
    ronin.frame.context().stroke();
    ronin.frame.context().closePath();

    this.position_prev.unshift(position);
  }
  
  this.position = function()
  {
    if(this.mirror_x && this.mirror_x > 0){
      return this.position_mirror_x();
    }
    if(this.mirror_y && this.mirror_y > 0){
      return this.position_mirror_y();
    }

    if(this.angle && this.offset){
      return this.position_rotation();
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
    return new Position((2 * this.mirror_x) - (ronin.cursor.position.x + this.offset.x), 0 + (ronin.cursor.position.y + this.offset.y));
  }
  
  this.position_mirror_y = function()
  {
    return new Position((ronin.cursor.position.x + this.offset.x), (2 * this.mirror_y) - (ronin.cursor.position.y + this.offset.y));
  }
  
  this.position_rotation = function()
  {
    var angle_radian = this.angle * Math.PI / 180;
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
    var radius = ronin.brush.settings["size"].to_f() * this.scale;
    this.actual_thickness = radius/4;
    ronin.frame.context().beginPath();
    ronin.frame.context().arc(this.position().x, this.position().y, this.thickness(), 0, 2 * Math.PI, false);
    ronin.frame.context().lineWidth = 0;
    ronin.frame.context().fillStyle = this.color ? this.color : ronin.brush.settings["color"].value;
    ronin.frame.context().fill();
    ronin.frame.context().closePath();
  }
  
  this.stop = function()
  {
    this.position_prev = null;
  }

  this.widget = function()
  {
    return this.offset.toString();
  }
}