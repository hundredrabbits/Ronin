function Canvas(element)
{
  Module.call(this);
  
  this.element = element;
  
  this.active = function(cmd)
  {
    if(cmd.bang()){ clear(); }
    
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
  
  this.hint = function(cmd)
  {
    if(cmd.bang()){ return "Canvas: Clear"; }
    
    var hint_rect = (cmd.rect() ? "Resize to "+cmd.rect().width+"px by "+cmd.rect().height+"px " : "");
    var hint_color = (cmd.color() ? "Fill with color "+cmd.color().hex+" " : "");
    
    return "Canvas: "+hint_rect+hint_color;
  }
  
  //
  
  this.resize = function(rect)
  {
    this.element.setAttribute('width',rect.width+"px");
    this.element.setAttribute('height',rect.height+"px");
  }
  
  this.context = function()
  {
    return this.element.getContext('2d');
  }
  
  this.clear = function()
  {
    this.context().clearRect(0, 0, this.element.width, this.element.height);
  }
}