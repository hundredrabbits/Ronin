function Canvas(element)
{
  Module.call(this);
  
  this.element = element;
  
  this.active = function(cmd)
  {
    if(cmd.rect()){
      this.resize(cmd.rect());
      ronin.overlay.resize(cmd.rect());
    }
    
    if(cmd.color()){
      this.element.getContext('2d').beginPath();
      this.element.getContext('2d').rect(0, 0, canvas.width, canvas.height);
      this.element.getContext('2d').fillStyle = cmd.color().hex;
      this.element.getContext('2d').fill();
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
}