function FileSave(rune)
{
  Module.call(this,rune);
  
  this.parameters = [];
  this.variables  = {"format" : "[png/jpg/svg]"};

  this.docs = "Creates a new window with a image of the resulting canvas in the specified format.";

  this.active = function(cmd)
  {
    if(!this.layer){ this.create_layer(); }

    var d = null;

    var w = window.open('about:blank','image from canvas');

    if(cmd.variable("format") && cmd.variable("format").value == "svg"){
      w.document.write("<title>Untitled</title><body>"+ronin.vector.create_svg()+"</body>");
    }
    else if(cmd.variable("format") && cmd.variable("format").value == "jpg"){
      w.document.write("<title>Untitled</title><body><img src='"+this.merge().element.toDataURL('image/jpeg')+"' width='"+ronin.surface.size.width+"px' height='"+ronin.surface.size.height+"px'/></body>");
    }
    else{
      w.document.write("<title>Untitled</title><body><img src='"+this.merge().element.toDataURL('image/png')+"' width='"+ronin.surface.size.width+"px' height='"+ronin.surface.size.height+"px'/></body>");
    }
    
    this.layer.remove(this);
  }

  this.merge = function()
  {
    var a = [];
    Object.keys(ronin.surface.layers).forEach(function (key) {
      if(!ronin.surface.layers[key].manager){ 
        a.push(ronin.surface.layers[key]);
      } 
    });
    for (i = 0; i < a.length; i++) {
      this.layer.context().drawImage(a[i].context().canvas,0,0,ronin.surface.size.width,ronin.surface.size.height);
    }
    return this.layer;
  }
}