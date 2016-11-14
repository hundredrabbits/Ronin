function Overlay(element)
{
  Module.call(this);
  
  this.element = element;
  
  this.resize = function(rect)
  {
    this.element.setAttribute('width',rect.width+"px");
    this.element.setAttribute('height',rect.height+"px");
  }
}