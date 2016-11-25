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
    
    ronin.widget.element.style.left = (window.innerWidth/2)-(rect.width/2);
    ronin.widget.element.style.top = (window.innerHeight/2)+(rect.height/2);
    
    ronin.widget.update();
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