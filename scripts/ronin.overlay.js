function Overlay(element)
{
  Module.call(this);
  
  this.element = element;
  
  // Module
  
  this.passive = function(p)
  {
  }
  
  this.resize = function(rect)
  {
    this.element.setAttribute('width',rect.width+"px");
    this.element.setAttribute('height',rect.height+"px");
  }
  
  this.show_guide = function(position,rect)
  {
    this.clear();
    context.beginPath();
    
    this.context().moveTo(0,0);
    this.context().lineTo(rect.width,0);
    this.context().lineTo(rect.width,rect.height);
    this.context().lineTo(0,rect.height);
    this.context().lineTo(0,0);
    
    context.lineCap="round";
    context.lineWidth = 1;
    context.strokeStyle = "#ff0000";
    context.stroke();
    context.closePath();
  }
  
  this.context = function()
  {
    return this.element.getContext('2d');
  }
  
  this.clear = function()
  {
    this.context().clearRect(0, 0, canvas.width, canvas.height);
  }
}