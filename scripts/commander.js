function Commander(element,element_input)
{
  this.element = element;
  this.element_input = element_input;
  
  this.show = function()
  {
    this.element.setAttribute('class','visible');
    this.element_input.focus();
  }
  
  this.hide = function()
  {
    this.element.setAttribute('class','hidden');
    this.element_input.value = "";
  }
  
  this.validate = function()
  {
    var parts = this.element_input.value.split(" ");
    
    if(parts[0] == ":@"){
      canvas.style.width = parts[1]+"px";
      canvas.style.height = parts[2]+"px";
    }
    
    this.hide();
  }
  
  this.passive = function()
  {
  }
}