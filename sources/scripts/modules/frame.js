function Frame(rune)
{
  Module.call(this,rune);
  
  this.element = null;

  this.size = new Rect("200x200");

  this.layers = {};
  this.active_layer = null;
  this.render_layer = null;

  this.add_method(new Method("resize",[new Position().name,new Rect().name]));
  this.add_method(new Method("select",["text"]));
  this.add_mode(new Mode("resize"));
  
  this.install = function()
  {
    this.select(new Command("frame.select background"));

    // Canvas
    var starting_canvas = new Rect();
    starting_canvas.width = window.innerWidth - 100;
    starting_canvas.height = window.innerHeight - 100;

    // Clamp

    starting_canvas.width = parseInt(starting_canvas.width/40) * 40 - 40;
    starting_canvas.height = parseInt(starting_canvas.height/40) * 40 - 40;

    this.resize(new Command(starting_canvas.width+"x"+starting_canvas.height));
  }

  // Methods

  this.resize = function(cmd, preview = false)
  {
    var rect = cmd.rect();
    var position = cmd.position() ? cmd.position() : new Position(0,0);

    if(preview){ ronin.overlay.draw(position,rect); return; }

    for(layer_name in ronin.frame.layers){
      ronin.frame.layers[layer_name].resize(rect);
    }
    
    ronin.frame.element.width = rect.width * 2;
    ronin.frame.element.height = rect.height * 2;
    ronin.frame.element.style.width = rect.width+"px";
    ronin.frame.element.style.height = rect.height+"px";

    ronin.frame.element.style.left = (window.innerWidth - rect.width)/2;
    ronin.frame.element.style.top = (window.innerHeight - rect.height)/2;

    ronin.on_resize();

    this.size = rect;

    return 1, "Resized to "+this.size.toString();
  }

  this.select = function(cmd, preview = false)
  {
    if(preview){ return; }

    var layer_name = cmd.values();

    if(!ronin.frame.layers[layer_name]){
      this.add_layer(new Layer(layer_name));
    }
    this.select_layer(this.layers[layer_name]);
    ronin.modules["layer"] = this.layers[layer_name];
    ronin.layer = this.layers[layer_name];

    return 1, "Selected "+this.active_layer.name;
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

  this.center = function()
  {
    ronin.frame.element.style.left = (window.innerWidth/2) - (ronin.frame.element.width/4);
    ronin.frame.element.style.top = (window.innerHeight/2) - (ronin.frame.element.height/4) - 30;
  }

  this.select_layer = function(layer)
  {
    if(!layer || layer.manager){ return; }
    this.active_layer = layer;
  }

  this.add_layer = function(layer)
  {
    if(this.active_layer){layer.set_depth(this.active_layer.depth+1);}
    layer.resize(this.size);
    this.layers[layer.name] = layer;
    this.element.appendChild(layer.element);
  }

  // Commands

  this.layer_above = function()
  {
    var keys = Object.keys(ronin.frame.layers);
    var loc = keys.indexOf(this.active_layer.name);

    if(loc >= keys.length-1){ console.log("Reached end"); return false; }

    if(keys[loc+1] != null){ return ronin.frame.layers[keys[loc+1]]; }
  }

  this.layer_below = function()
  {
    var keys = Object.keys(ronin.frame.layers);
    var loc = keys.indexOf(this.active_layer.name);

    if(keys[loc-1] != null){ return ronin.frame.layers[keys[loc-1]]; }
  }

  // Cursor

  this.mouse_mode = function()
  { 
    return "crop"; 
  }
  
  this.mouse_down = function(position)
  {
    ronin.overlay.draw(position);
  }
  this.mouse_move = function(position,rect)
  {
    ronin.overlay.draw(this.mouse_from,rect);
  }
  
  this.mouse_up = function(position,rect)
  {
    ronin.overlay.draw(this.mouse_from,rect)+" "+rect.toString();

    var line = "frame.resize "+this.mouse_from.toString()+" "+rect.toString();
    ronin.terminal.update(line);
  }

  this.widget = function()
  {
    var html = ""

    html += this.size.toString()+" ";
    html += this.active_layer.name+" ";

    var user_layers = 0;
    var managed_layers = 0;

    count = 0;
    for(id in this.layers){
      if(this.layers[id].manager){
        managed_layers += 1;
      }
      else{
        user_layers += 1;
      }
      count += 1;
    }

    html += user_layers+"&"+managed_layers+" ";

    html += this.widget_map()+" "

    return html
  }

  this.widget_map = function()
  {
    html = ""
    var keys = Object.keys(ronin.frame.layers);
    var loc = keys.indexOf(this.active_layer.name);
    i = 0;
    while(i < keys.length){
      if(i == loc){
        html += "<span style='color:white'>|</span>";
      }
      else if(this.layers[keys[i]].manager){
        html += "<span style='color:red'>|</span>";        
      }
      else{
        html += "|";
      }
      i += 1;
    }
    return html;
  }
}