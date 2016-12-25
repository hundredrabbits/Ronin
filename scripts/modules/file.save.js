function FileSave(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  
  this.active = function(cmd)
  {
    var n = "Ronin Export";
    var f = cmd.variable("format");
    var d = ronin.surface.merge();
    d = ronin.surface.layers["render"].element.toDataURL('image/png');
    ronin.surface.layers["render"].clear();
    var w = window.open('about:blank','image from canvas');
    w.document.write("<title>"+(n ? n : "Untitled")+"</title><img src='"+d+"'/>");
  }
  
  this.passive = function(cmd)
  {
  }
}