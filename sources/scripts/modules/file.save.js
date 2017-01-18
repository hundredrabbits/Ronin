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
      var d = this.merge().element.toDataURL('image/jpeg');
    }
    else{
      var d = this.merge().element.toDataURL('image/png');
    }
    
    var w = window.open('about:blank','image from canvas');
    w.document.write("<title>Untitled</title><body><img src='"+d+"' width='"+ronin.surface.size.width+"px' height='"+ronin.surface.size.height+"px'/></body>");
    this.layer.clear();
  }

  this.merge = function()
  {    
    var a = [];
    Object.keys(ronin.surface.layers).forEach(function (key) {
      a.push(ronin.surface.layers[key]);
    });
    for (i = 0; i < a.length; i++) {
      this.layer.context().drawImage(a[i].context().canvas,0,0,ronin.surface.size.width,ronin.surface.size.height);
    }
    return this.layer;
  }
}