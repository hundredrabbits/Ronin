function FileSave(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  
  this.active = function(cmd)
  {
    var n = "Ronin Export";
    var f = cmd.variable("format");
    var d = ronin.surface.merged();
    var w = window.open('about:blank','image from canvas');
    w.document.write("<title>"+(n ? n : "Untitled")+"</title><img src='"+d+"'/>");
  }
  
  this.passive = function(cmd)
  {
  }
}