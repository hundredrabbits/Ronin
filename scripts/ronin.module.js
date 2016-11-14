function Module()
{
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
    return "unknown";
  }
}