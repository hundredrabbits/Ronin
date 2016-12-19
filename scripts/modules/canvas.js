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
  
  // Cursor
  
  this.drag_from = null;

  this.mouse_down = function(position)
  {
    this.drag_from = ronin.position_in_window(position);
  }
  
  this.mouse_move = function(position)
  {
    if(this.drag_from === null){ return; }
    
    position = ronin.position_in_window(position);
    
    var offset_x = this.drag_from.x - position.x;
    var offset_y = this.drag_from.y - position.y;
    
    ronin.surface.style.left = ronin.surface.style.left ? parseInt(ronin.surface.style.left) - offset_x : offset_x;
    ronin.surface.style.top = ronin.surface.style.top ? parseInt(ronin.surface.style.top) - offset_y : offset_y;
    
    this.drag_from = new Position(position.x,position.y);
  }
  
  this.mouse_up = function(event)
  {
    this.drag_from = null;
  }
}