function Surface(rune)
{
  Module.call(this,rune);
  
  this.element = null;
  this.parameters = [Rect,Color,Bang];
  this.variables  = {"layer" : "main"};

  this.layers = {};
  this.active_layer = null;
  this.render_layer = null;

  this.size = new Rect("200x200");

  this.widget_element = document.createElement("widget");
  
  this.install = function()
  {
    this.element.appendChild(this.widget_element);
    this.blink();
  }

  this.blink = function()
  {
    Object.keys(ronin.surface.layers).forEach(function (key) {
      ronin.surface.layers[key].blink();
    });
    setTimeout(function(){ ronin.surface.blink(); }, 30);
  }

  this.active = function(cmd)
  {
    if(cmd.rect()){
      this.resize(cmd.rect(),cmd.position());
    }
    
    if(cmd.color()){
      this.context().beginPath();
      this.context().rect(0, 0, this.active_layer.element.width, this.active_layer.element.height);
      this.context().fillStyle = cmd.color().hex;
      this.context().fill();
      ronin.terminal.log(new Log(this,"Filled layer: "+cmd.color().hex)); 
      this.element.style.border = "1px solid "+cmd.color().hex;
      this.element.setAttribute("class",cmd.color().style());
    }

    if(cmd.bang() && Object.keys(ronin.surface.layers).length > 1){
      this.layers[this.active_layer.name].element.outerHTML = "";
      delete this.layers[this.active_layer.name];
      this.select_any_layer();
      ronin.surface.update_widget();
    }

    if(cmd.variable("layer")){
      var name = cmd.variable("layer").value;
      if(!this.layers[name]){
        this.add_layer(new Layer(name));
      }
      this.select_layer(this.layers[name]);
    }
  }

  this.select_layer = function(layer)
  {
    console.log("Selecting layer:"+layer.name);
    this.active_layer = layer;
  }

  this.select_any_layer = function()
  {
    var layer_name = Object.keys(ronin.surface.layers)[0];
    this.select_layer(ronin.surface.layers[layer_name]);    
  }

  this.add_layer = function(layer)
  {
    ronin.terminal.log(new Log(this,"Creating layer:"+layer.name+(layer.manager ? "["+layer.manager.constructor.name+"]" : ""))); 

    layer.resize(this.size);
    this.layers[layer.name] = layer;
    this.element.appendChild(layer.element);
  }
  
  this.passive = function(cmd)
  {
    if(cmd.rect()){
      ronin.overlay.draw(cmd.position(),cmd.rect());
    }
  }

  this.resize = function(rect, position = null)
  {
    this.size = rect;

    Object.keys(ronin.surface.layers).forEach(function (key) {
      ronin.surface.layers[key].resize(rect);
    });
    
    ronin.surface.element.width = rect.width * 2;
    ronin.surface.element.height = rect.height * 2;
    ronin.surface.element.style.width = rect.width+"px";
    ronin.surface.element.style.height = rect.height+"px";
    ronin.surface.element.style.marginLeft = -(rect.width/2);
    ronin.surface.element.style.marginTop = -(rect.height/2);

    ronin.on_resize();
    ronin.terminal.log(new Log(this,"Resized Surface to "+this.size.render()));
  }

  this.widget = function()
  {
    if(!this.active_layer){ return ""; }

    return this.rune+" "+this.size.render();
  }

  // Widget

  this.update_widget = function()
  {
    var s = "";
    
    s += "<span class='module'>";
    for (var key in ronin.modules){
      s += ronin.modules[key].widget() ? ronin.modules[key].widget()+" " : "";
    }
    s += "</span>";
  
    s += "<span class='cursor'>"+ronin.cursor.mode.mouse_mode()+"</span>";
    
    var keys = Object.keys(ronin.surface.layers);
    var loc = keys.indexOf(this.active_layer.name);

    if(keys.length > 1){
      s += "<span class='layer'>"+ronin.surface.active_layer.widget()+"("+(loc+1)+"/"+keys.length+")</span>";
    }
    else{
      s += "<span class='layer'>"+ronin.surface.active_layer.widget()+"</span>";
    }
  
    this.widget_element.innerHTML = s;
  }

  // Commands

  this.layer_up = function()
  {
    var keys = Object.keys(ronin.surface.layers);
    var loc = keys.indexOf(this.active_layer.name);

    if(loc >= keys.length-1){ console.log("Reached end"); return false; }

    if(keys[loc+1] != null){this.select_layer(ronin.surface.layers[keys[loc+1]]);}
  }

  this.layer_down = function()
  {
    var keys = Object.keys(ronin.surface.layers);
    var loc = keys.indexOf(this.active_layer.name);

    if(keys[loc-1] != null){this.select_layer(ronin.surface.layers[keys[loc-1]]);}
  }

  // Layers

  this.context = function()
  {
    return this.active_layer.context();
  }

  // Cursor

  this.mouse_mode = function()
  { 
    return "crop"; 
  }
  
  this.mouse_down = function(position)
  {
    ronin.overlay.clear();
    ronin.overlay.draw_pointer(position);
    ronin.terminal.input_element.value = "| "+this.mouse_from.render();
  }
  
  this.mouse_move = function(position,rect)
  {    
    ronin.overlay.clear();

    ronin.overlay.draw_rect(this.mouse_from,rect);
    ronin.terminal.input_element.value = "@ "+this.mouse_from.render()+" "+rect.render();

    ronin.terminal.update_hint();
  }
  
  this.mouse_up = function(position,rect)
  {
  }
}