function Filepath(path_str)
{
  Unit.call(this);
  
  this.path = path_str;
  
  this.render = function()
  {
    return this.path;
  }
}