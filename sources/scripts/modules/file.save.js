function FileSave(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.variables  = {"format" : "[png/jpg]"};

  this.docs = "Creates a new window with a image of the resulting canvas in the specified format.";
  
  this.layer = null;

  this.install = function()
  {
    this.layer = new Layer("Save.Export",this);
    ronin.surface.add_layer(this.layer);
  }

  this.active = function(cmd)
  {
    var d = null;

    if(cmd.variable("format") && cmd.variable("format").value == "jpg"){
      var d = ronin.surface.active_layer.element.toDataURL('image/jpeg');
    }
    else{
      var d = ronin.surface.active_layer.element.toDataURL('image/png');
    }
    
    var w = window.open('about:blank','image from canvas');
    w.document.write("<title>Untitled</title><body><img src='"+d+"' width='"+ronin.surface.size.width+"px' height='"+ronin.surface.size.height+"px'/></body>");
  }
}