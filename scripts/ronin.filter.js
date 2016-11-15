function Filter(element)
{
  Module.call(this);
  
  this.active = function(cmd)
  {
    console.log("Nothing to do.");
  }
  
  this.passive = function(cmd)
  {
    console.log("Nothing to do.");
  }
  
  this.hint = function(cmd)
  {
    return "Filter: ";
  }
}