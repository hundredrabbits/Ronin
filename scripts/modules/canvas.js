function Canvas(element)
{
  Module.call(this);

  this.parameters = [Rect,Color,Bang];
  this.element = element;
  
  this.active = function(cmd)
  {
    if(cmd.bang()){ this.clear(); }
    
    if(cmd.rect()){
      this.resize(cmd.rect());
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
      ronin.overlay.show_guide(null,cmd.rect());
    }
  }
  
  //
  
  this.resize = function(rect)
  {
    this.element.setAttribute('width',rect.width+"px");
    this.element.setAttribute('height',rect.height+"px");
    this.element.style.left = (window.innerWidth/2)-(rect.width/2);
    this.element.style.top = (window.innerHeight/2)-(rect.height/2);
  }
  
  this.context = function()
  {
    return this.element.getContext('2d');
  }
  
  this.clear = function()
  {
    this.context().clearRect(0, 0, this.element.width, this.element.height);
  }
  
  // Drag
  
  this.drag_from = null;
  
  this.drag_start = function(e)
  {
    this.drag_from = new Position(e.clientX,e.clientY);
  }
  
  this.drag = function(e)
  {
    if(e.which != 2){ return; }
    
    var offset_x = this.drag_from.x - e.clientX;
    this.element.style.left = parseInt(this.element.style.left) - offset_x;
    var offset_y = this.drag_from.y - e.clientY;
    this.element.style.top = parseInt(this.element.style.top) - offset_y;
    this.drag_from = new Position(e.clientX,e.clientY);
  }
  
  this.drag_stop = function(e)
  {
    this.drag_from = null;
  }
}