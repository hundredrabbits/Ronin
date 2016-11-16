function Hint(element)
{
  Module.call(this);
  
  this.element = element;
  
  this.update = function()
  {
    if(ronin.module){
      this.element.innerHTML = ronin.module.hint(commander.cmd);
      this.element.style.display = "block";
    }
    else{
      this.element.style.display = "none";
    }
  }
}