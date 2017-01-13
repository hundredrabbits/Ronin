function FileSave(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  
  this.active = function(cmd)
  {
    var n = "Ronin Export";
    var f = cmd.variable("format");
    var d = ronin.surface.active_layer.element.toDataURL('image/png');
    // // ronin.surface.layers["render"].clear();
    var w = window.open('about:blank','image from canvas');
    // w.document.write("hello")
    w.document.write("<title>"+(n ? n : "Untitled")+"</title><body><img src='"+d+"' width='"+ronin.surface.size.width+"px' height='"+ronin.surface.size.height+"px'/></body>");
  }
  
  this.passive = function(cmd)
  {
  }
}