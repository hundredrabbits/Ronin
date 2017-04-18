function Source(rune)
{
  Module.call(this,rune);

  this.settings  = {"format":"jpg","quality":"1"};

  this.add_method(new Method("save",["name","rect","format"]));
  this.add_method(new Method("load",["path","position","rect"]),"Add point");
  
  this.load = function(params,preview = false) // source.load ../assets/todo.jpg 200x200 40,40
  {
    if(!params.filepath()){ return 0, "Path?"; }
    if(!params.rect()){ return 0,"Rect?"; }

    this.get_layer(true).clear();

    var target_layer = preview ? this.get_layer(true) : ronin.frame.active_layer;

    ronin.overlay.get_layer(true).clear();

    var position = params.position() ? params.position() : new Position("0,0");
    ronin.overlay.draw_rect(position,params.rect());
    
    base_image = new Image();
    base_image.src = "../assets/"+params.filepath().path;
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
      
      target_layer.context().drawImage(base_image, position.x, position.y, width, height);
    }

    if(!preview){ ronin.overlay.get_layer(true).clear(); }

    return 1,"ok";
  }

  this.save = function(params,preview = false)
  {
    if(preview){ return; }
    if(!this.layer){ this.create_layer(); }

    var d = null;

    ronin.terminal.query("terminal.display mini");

    if(this.settings["format"] == "jpg"){
      ronin.terminal.log(new Log(this,"<img src='"+this.merge().element.toDataURL('image/jpeg',parseFloat(this.settings["quality"]))+"' width='"+ronin.frame.settings["size"].width+"px' height='"+ronin.frame.settings["size"].height+"px'/>","image"));
    }
    else{
      ronin.terminal.log(new Log(this,"<img src='"+this.merge().element.toDataURL('image/png',parseFloat(this.settings["quality"]))+"' width='"+ronin.frame.settings["size"].width+"px' height='"+ronin.frame.settings["size"].height+"px'/>","image"));
    }
    /*
    if(params.setting("format") && params.setting("format").value == "svg"){
      ronin.terminal.log(new Log(this,ronin.path.create_svg(),"image"));
    }
    else if(params.setting("format") && params.setting("format").value == "rin"){
      var w = window.open('about:blank','source');
      var html = "";
      for (i = 0; i < ronin.terminal.history.length; i++) { html += ronin.terminal.history[i]+";<br />"; }
      w.document.write("<title>Source</title><pre>"+html+"</pre>");
    }
    else 
      */
    
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

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
    this.coordinates = [];
    this.last_pos = null;
    ronin.terminal.input_element.value = "";
    ronin.terminal.passive();
    ronin.overlay.get_layer(true).clear();
  }
}