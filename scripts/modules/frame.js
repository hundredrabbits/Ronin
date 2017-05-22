function Frame(rune)
{
  Module.call(this,rune);
  
  this.element = null;
  this.settings = {size:new Rect("200x200")};

  this.layers = {};
  this.active_layer = null;
  this.render_layer = null;

  this.add_method(new Method("resize",[new Position().name,new Rect().name]));
  this.add_method(new Method("select",["text"]));
  
  this.install = function()
  {
    this.blink();
    this.select(new Command("frame.select main"));

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

    this.settings.size = rect;

    return 1, "Resized to "+this.settings.size.render();
  }

  this.select = function(params, preview = false)
  {
    if(preview){ return; }

    var layer_name = "main";
    if(!ronin.frame.layers[layer_name]){
      this.add_layer(new Layer(layer_name));
    }
    this.select_layer(this.layers[layer_name]);
    ronin.modules["layer"] = this.layers[layer_name];
    ronin.layer = this.layers[layer_name];

    return 1, "ok";
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
    if(this.active_layer){layer.set_depth(this.active_layer.depth+1);}
    layer.resize(this.settings["size"]);
    this.layers[layer.name] = layer;
    this.element.appendChild(layer.element);
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
  
  this.mouse_up = function(position,rect)
  {
  }

  this.widget = function()
  {
    var html = ""

    html += this.settings.size.render()+" ";
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

    return html
  }
}