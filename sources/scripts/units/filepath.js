function Filepath(path_str)
{
  Unit.call(this);
  
  this.example = "assets/demo.png";
  this.path = path_str;
  
  this.toString = function()
  {
    return this.path;
  }
}