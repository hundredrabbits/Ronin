function Source(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Filepath,Position,Rect];

  this.add_method(new Method("save",["name"],"Add point"));
  this.add_method(new Method("load",["path","position","rect"]),"Add point");
  
  this.load = function(params,preview = false) // source.load ../assets/todo.jpg 200x200 40,40
  {
    if(!params.filepath() || !params.rect() || !params.position()){ ronin.terminal.log(new Log(this,"Missing image path.","error")); return; }

    console.log("OK");

    ronin.overlay.get_layer(true).clear();
    ronin.overlay.draw_rect(params.position(),params.rect());

    var position = params.position() ? params.position() : new Position();
    
    base_image = new Image();
    base_image.src = params.filepath().path;
    base_image.src += '?'+new Date().getTime();
    base_image.crossOrigin = "Anonymous";
    
    base_image.onload = function(){
      var width = base_image.naturalWidth;
      var height = base_image.naturalHeight;
      if(params.rect()){
        width = params.rect().width;
        height = params.rect().height;
        position.normalize(params.rect());
      }
      // Scale with only 1 unit
      width  = isNaN(width) && height > 0 ? (height*base_image.naturalWidth)/base_image.naturalHeight : width;
      height = isNaN(height) && width > 0 ? (width*base_image.naturalHeight)/base_image.naturalWidth : height;
      
      ronin.frame.context().drawImage(base_image, position.x, position.y, width, height);
    }
  }

  this.save = function(params,preview = false)
  {
    if(preview){ return; }
    if(!this.layer){ this.create_layer(); }

    var d = null;

    var w = window.open('about:blank','image from canvas');

    if(params.setting("format") && params.setting("format").value == "svg"){
      w.document.write("<title>Untitled</title><body>"+ronin.path.create_svg()+"</body>");
    }
    else if(params.setting("format") && params.setting("format").value == "jpg"){
      w.document.write("<title>Untitled</title><body><img src='"+this.merge().element.toDataURL('image/jpeg')+"' width='"+ronin.frame.settings["size"].width+"px' height='"+ronin.frame.settings["size"].height+"px'/></body>");
    }
    else if(params.setting("format") && params.setting("format").value == "rin"){
      var w = window.open('about:blank','source');
      var html = "";
      for (i = 0; i < ronin.terminal.history.length; i++) { html += ronin.terminal.history[i]+";<br />"; }
      w.document.write("<title>Source</title><pre>"+html+"</pre>");
    }
    else{
      console.log("!!")
      w.document.write("<title>Untitled</title><body><img src='"+this.merge().element.toDataURL('image/png')+"' width='"+ronin.frame.settings["size"].width+"px' height='"+ronin.frame.settings["size"].height+"px'/></body>");
    }
    
    this.layer.remove(this);
  }

  this.merge = function()
  {
    var a = [];
    for(layer_name in ronin.frame.layers){
      if(ronin.frame.layers[layer_name].manager){ continue; }
      a.push(ronin.frame.layers[layer_name]);
    }
    for (i = 0; i < a.length; i++) {
      this.layer.context().drawImage(a[i].context().canvas,0,0,ronin.frame.settings["size"].width,ronin.frame.settings["size"].height);
    }
    return this.layer;
  }
}