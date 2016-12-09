function FileSave(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  
  this.active = function(cmd)
  {
    var n = cmd.any().string[1];
    var f = cmd.variable("format");
    var d = ronin.canvas.element.toDataURL("image/png");
    var w = window.open('about:blank','image from canvas');
    w.document.write("<title>"+(n ? n : "Untitled")+"</title><img src='"+d+"'/>");
  }
  
  this.passive = function(cmd)
  {
  }
}