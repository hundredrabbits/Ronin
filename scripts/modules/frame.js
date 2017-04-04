function Frame(rune)
{
  Module.call(this,rune);
  
  this.element = null;
  this.settings = {"size":new Rect("200x200")};

  this.layers = {};
  this.active_layer = null;
  this.render_layer = null;

  this.add_method(new Method("resize",[new Rect().name]));
  this.add_method(new Method("crop",[new Position().name,new Rect().name]));
  this.add_method(new Method("select",["text"]));

  this.widget_element = document.createElement("widget");
  
  this.install = function()
  {
    this.element.appendChild(this.widget_element);
    this.blink();
  }

  // Methods

  this.resize = function(params, preview = false)
  {
    if(preview){ return; }

    this.settings["size"] = params.rect();

    for(layer_name in ronin.frame.layers){
      ronin.frame.layers[layer_name].resize(this.settings["size"]);
    }
    
    ronin.frame.element.width = this.settings["size"].width * 2;
    ronin.frame.element.height = this.settings["size"].height * 2;
    ronin.frame.element.style.width = this.settings["size"].width+"px";
    ronin.frame.element.style.height = this.settings["size"].height+"px";
    ronin.frame.element.style.marginLeft = -(this.settings["size"].width/2);
    ronin.frame.element.style.marginTop = -(this.settings["size"].height/2);

    ronin.on_resize();
    ronin.terminal.log(new Log(this,"Resized Surface to "+this.settings["size"].render()));
  }

  this.crop = function(params, preview = false)
  {
    if(!params.position() || !params.rect()){ return; }

    this.settings["size"] = params.rect();

    ronin.overlay.get_layer(true).clear();
    if(preview){ronin.overlay.draw_rect(params.position(),params.rect());}
  }

  this.select = function(params, preview = false)
  {
    if(preview){ return; }

    var layer_name = params.content;
    if(!ronin.frame.layers[layer_name]){
      this.add_layer(new Layer(layer_name));
    }
    this.select_layer(this.layers[layer_name]);
    ronin.modules["layer"] = this.layers[layer_name];
    ronin.layer = this.layers[layer_name];
  }

  this.context = function()
  {
    return this.active_layer.context();
  }

  // Misc

  this.blink = function()
  {
    Object.keys(ronin.frame.layers).forEach(function (key) {
      ronin.frame.layers[key].blink();
    });
    setTimeout(function(){ ronin.frame.blink(); }, 30);
  }

  this.select_layer = function(layer)
  {
    this.active_layer = layer;
  }

  this.select_any_layer = function()
  {
    var layer_name = Object.keys(ronin.frame.layers)[0];
    this.select_layer(ronin.frame.layers[layer_name]);    
  }

  this.add_layer = function(layer)
  {
    ronin.terminal.log(new Log(this,"Creating layer:"+layer.name+(layer.manager ? "["+layer.manager.constructor.name+"]" : ""))); 

    layer.resize(this.settings["size"]);
    this.layers[layer.name] = layer;
    this.element.appendChild(layer.element);
  }

  this.widget = function()
  {
    if(!this.active_layer){ return ""; }

    return this.rune+" "+this.settings["size"].render();
  }

  // Widget

  this.update_widget = function()
  {
    if(!this.active_layer){ return; }

    var s = "";
    
    s += "<span class='module'>";
    for (var key in ronin.modules){
      s += ronin.modules[key].widget() ? ronin.modules[key].widget()+" " : "";
    }
    s += "</span>";
  
    s += "<span class='cursor'>"+ronin.cursor.mode.mouse_mode()+"</span>";
    
    var keys = Object.keys(ronin.frame.layers);
    var loc = keys.indexOf(this.active_layer.name);

    if(keys.length > 1){
      s += "<span class='layer'>"+ronin.frame.active_layer.widget()+"("+(loc+1)+"/"+keys.length+")</span>";
    }
    else{
      s += "<span class='layer'>"+ronin.frame.active_layer.widget()+"</span>";
    }
  
    this.widget_element.innerHTML = s;
  }

  // Commands

  this.layer_up = function()
  {
    var keys = Object.keys(ronin.frame.layers);
    var loc = keys.indexOf(this.active_layer.name);

    if(loc >= keys.length-1){ console.log("Reached end"); return false; }

    if(keys[loc+1] != null){this.select_layer(ronin.frame.layers[keys[loc+1]]);}
  }

  this.layer_down = function()
  {
    var keys = Object.keys(ronin.frame.layers);
    var loc = keys.indexOf(this.active_layer.name);

    if(keys[loc-1] != null){this.select_layer(ronin.frame.layers[keys[loc-1]]);}
  }

  // this.passive = function(cmd)
  // { 
  //   var crop = ronin.terminal.cmd().method("crop");

  //   if(crop && crop.params.length == 2){
  //     console.log(crop);  
  //     ronin.overlay.get_layer(true).clear();
  //     ronin.overlay.draw_rect(new Position(crop.params[0]),new Rect(crop.params[1]));
  //   }
  //   else{
  //     console.log("Missing params")
  //   }
  //   ronin.terminal.update_hint();
  // }

  // Cursor

  this.mouse_mode = function()
  { 
    return "crop"; 
  }
  
  this.mouse_down = function(position)
  {
    ronin.overlay.get_layer(true).clear();
    ronin.overlay.draw_pointer(position);
  }
  
  this.mouse_move = function(position,rect)
  {      
    ronin.terminal.input_element.value = "frame."+ronin.terminal.method_name+" "+this.mouse_from.render()+" "+rect.render()+" ";
    ronin.terminal.passive();
  }
  
  this.mouse_up = function(position,rect)
  {
  }
}