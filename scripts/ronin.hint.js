function Hint(element)
{
  Module.call(this);
  
  this.element = element;
  
  this.update = function()
  {
    this.element.innerHTML = !ronin.module ? "Missing" : ronin.module.hint(commander.cmd);
  }
}