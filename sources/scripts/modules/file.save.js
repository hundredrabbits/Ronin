function FileSave(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.variables  = {"format" : "png"};
  
  this.active = function(cmd)
  {
    var d = null;

    if(cmd.variable("format").value == "jpg"){
      var d = ronin.surface.active_layer.element.toDataURL('image/jpeg');
    }
    else{
      var d = ronin.surface.active_layer.element.toDataURL('image/png');
    }
    
    var w = window.open('about:blank','image from canvas');
    w.document.write("<title>Untitled</title><body><img src='"+d+"' width='"+ronin.surface.size.width+"px' height='"+ronin.surface.size.height+"px'/></body>");
  }
}