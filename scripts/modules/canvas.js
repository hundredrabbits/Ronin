function Canvas(element)
{
  Module.call(this);

  this.parameters = [Rect,Position,Color,Bang];
  this.element = element;
  
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
}