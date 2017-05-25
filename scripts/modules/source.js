function Source(rune)
{
  Module.call(this,rune);

  this.modal_element = null;

  this.add_setting(new Setting("format","png"));
  this.add_setting(new Setting("quality","1"));

  this.add_method(new Method("save",["name","rect","format"]));
  this.add_method(new Method("load",["path","position","rect"]));
  this.add_method(new Method("help"));
    
  this.install = function()
  {
    this.modal_element = document.createElement("modal");
    this.modal_element.id = "modal";
    this.modal_element.setAttribute("class","hidden");
    ronin.element.appendChild(this.modal_element);
  }

  this.load = function(params,preview = false) // source.load /01.jpg 0,0 100x100
  {
    if(!params.filepath()){ return 0, "Path?"; }
    if(!params.rect()){ return 0,"Rect?"; }

    var position = params.position() ? params.position() : new Position("0,0");
    var rect = params.rect() ? params.rect() : new Rect("50,50");

    ronin.overlay.draw(position,rect);

    if(preview){ return; }
    if(this.is_locked){ console.log("Locked!"); return 0,"The source module is locked."; }

    this.lock();

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
      
      ronin.frame.active_layer.context().drawImage(base_image, position.x, position.y, width, height);
      ronin.overlay.clear();
      ronin.source.unlock();
    }

    return 1,"Loaded "+params.filepath().path+" at "+position.toString();
  }

  this.save = function(params,preview = false)
  {
    if(preview){ return; }
    if(!this.layer){ this.create_layer(); }

    var d = null;

    this.modal();

    if(this.settings["format"].value == "jpg"){
      this.modal("image","<img src='"+this.merge().element.toDataURL('image/jpeg',this.settings["quality"].to_f())+"' />");
    }
    else{
      this.modal("image","<img src='"+this.merge().element.toDataURL('image/png')+"'/>");
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

    return 1,"Rendered the "+this.settings.format+" image, "+this.settings.quality+"."
  }

  this.help = function(params,preview = false)
  {
    if(preview){ return; }

    html = "";

    for(module_id in ronin.modules){
      html += ronin.modules[module_id]+"\n";

      for(mode_id in ronin.modules[module_id].modes){
        html += "  "+ronin.modules[module_id].modes[mode_id]+"\n";
      }
      for(setting_id in ronin.modules[module_id].settings){
        html += "  "+ronin.modules[module_id].settings[setting_id]+"\n";
      }
      for(method_id in ronin.modules[module_id].methods){
        html += "  "+ronin.modules[module_id].methods[method_id]+"\n";
      }
    }

    this.modal("text",html);
  }

  this.modal = function(type,content)
  {
    this.modal_element.setAttribute("class",type);
    this.modal_element.innerHTML = content;
  }

  this.merge = function()
  {
    var a = [];
    for(layer_name in ronin.frame.layers){
      if(ronin.frame.layers[layer_name].manager){ continue; }
      a.push(ronin.frame.layers[layer_name]);
    }
    for (i = 0; i < a.length; i++) {
      this.layer.context().drawImage(a[i].context().canvas,0,0,ronin.frame.size.width,ronin.frame.size.height);
    }
    return this.layer;
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
    this.coordinates = [];
    this.last_pos = null;
    ronin.terminal.input.value = "";

    this.modal_element.innerHTML = "";
    this.modal_element.setAttribute("class","hidden");
  }
}