function FileSave(rune)
{
  Module.call(this,rune);
  
  this.parameters = [];
  this.variables  = {"format" : "[png/jpg/svg/rin]"};

  this.docs = "Creates a new window with a image of the resulting canvas in the specified format.";

  this.active = function(cmd)
  {
    if(!this.layer){ this.create_layer(); }

    var d = null;

    var w = window.open('about:blank','image from canvas');

    if(cmd.setting("format") && cmd.setting("format").value == "svg"){
      w.document.write("<title>Untitled</title><body>"+ronin.vector.create_svg()+"</body>");
    }
    else if(cmd.setting("format") && cmd.setting("format").value == "jpg"){
      w.document.write("<title>Untitled</title><body><img src='"+this.merge().element.toDataURL('image/jpeg')+"' width='"+ronin.surface.settings["size"].width+"px' height='"+ronin.surface.settings["size"].height+"px'/></body>");
    }
    else if(cmd.setting("format") && cmd.setting("format").value == "rin"){
      var w = window.open('about:blank','source');
      var html = "";
      for (i = 0; i < ronin.terminal.history.length; i++) { html += ronin.terminal.history[i]+";<br />"; }
      w.document.write("<title>Source</title><pre>"+html+"</pre>");
    }
    else{
      w.document.write("<title>Untitled</title><body><img src='"+this.merge().element.toDataURL('image/png')+"' width='"+ronin.surface.settings["size"].width+"px' height='"+ronin.surface.settings["size"].height+"px'/></body>");
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
      this.layer.context().drawImage(a[i].context().canvas,0,0,ronin.surface.settings["size"].width,ronin.surface.settings["size"].height);
    }
    return this.layer;
  }
}