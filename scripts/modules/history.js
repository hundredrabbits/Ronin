function History(rune)
{
  Module.call(this,rune);
  
  this.lines = [];
  
  this.active = function(cmd)
  {
    console.log(this.lines);
  }
  
  this.add = function(content)
  {
    this.lines.push(content);
  }
  
  this.widget = function()
  {
    if(this.lines.length === 0){ return "";}
    return "; "+this.lines.length+" ";
  }
}