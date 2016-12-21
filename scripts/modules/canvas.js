function Canvas(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Rect,Position,Color,Bang];
  
  this.active = function(cmd)
  {
    if(cmd.bang()){ this.clear(); }
    
    if(cmd.rect()){
      this.resize(cmd.rect(),cmd.position());
      ronin.overlay.resize(cmd.rect());
    }
    
    if(cmd.color()){
      this.context().beginPath();
      this.context().rect(0, 0, this.element.width, this.element.height);
      this.context().fillStyle = cmd.color().hex;
      this.context().fill();
    }
  }
  
  this.passive = function(cmd)
  {
    if(cmd.rect()){
      ronin.overlay.draw(cmd.position(),cmd.rect());
    }
  }
  
  //
  
  this.resize = function(rect, position = null)
  {
    var canvas_pixels = ronin.canvas.element.toDataURL("image/png");
    var pixels_rect   = new Rect(this.element.width+"x"+this.element.height);
    
    this.element.setAttribute('width',rect.width+"px");
    this.element.setAttribute('height',rect.height+"px");
    this.element.style.left = (window.innerWidth/2)-(rect.width/2);
    this.element.style.top = (window.innerHeight/2)-(rect.height/2);
    
    ronin.widget.element.style.left = (window.innerWidth/2)-(rect.width/2);
    ronin.widget.element.style.top = (window.innerHeight/2)+(rect.height/2);
    ronin.widget.element.style.width = rect.width+"px";
    
    ronin.widget.update();
    
    base_image = new Image();
    base_image.src = canvas_pixels;
    
    if(!position){ position = new Position("0,0");}
    ronin.canvas.context().drawImage(base_image, -position.x, -position.y, pixels_rect.width, pixels_rect.height);
  }
  
  this.context = function()
  {
    return this.element.getContext('2d');
  }
  
  this.clear = function()
  {
    this.context().clearRect(0, 0, this.element.width, this.element.height);
  }
  
  this.widget = function()
  {
    return "@ "+this.element.width+"x"+this.element.height+" ";
  }
  
  this.widget_cursor = function()
  {
    return "Move";
  }
  
  // Cursor
  
  this.move_from = null;

  this.mouse_down = function(position)
  {
    this.move_from = ronin.position_in_window(position);
  }
  
  this.mouse_move = function(position)
  {
    if(this.move_from === null){ return; }
    
    position = ronin.position_in_window(position);
    
    var offset_x = this.move_from.x - position.x;
    var offset_y = this.move_from.y - position.y;
    
    this.context().globalCompositeOperation = "copy";
    this.context().drawImage(this.context().canvas, -offset_x, -offset_y);
    this.context().globalCompositeOperation = "source-over"
    
    this.move_from = new Position(position.x,position.y);
  }
  
  this.mouse_up = function(event)
  {
    this.move_from = null;
  }
}