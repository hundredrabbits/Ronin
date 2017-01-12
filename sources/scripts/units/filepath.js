function Filepath(path_str)
{
  Unit.call(this);
  
  this.example = "assets/demo.png";
  this.path = path_str;
  
  this.render = function()
  {
    return this.path;
  }
}