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
    }

    if(cmd.bang() && Object.keys(ronin.surface.layers).length > 1){
      this.layers[this.active_layer.name].element.outerHTML = "";
      delete this.layers[this.active_layer.name];
      this.select_any_layer();
      ronin.widget.update();
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
    console.log("Creating layer:"+layer.name+"("+(layer.manager ? layer.manager.constructor.name : "")+")"); 

    this.layers[layer.name] = layer;
    this.active_layer = layer;
    this.element.appendChild(layer.element);
    this.active_layer.resize(this.size);
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
  }

  this.widget = function()
  {
    if(!this.active_layer){ return ""; }

    var s = "";

    Object.keys(ronin.surface.layers).forEach(function (key) {
      s = ronin.surface.layers[key].widget()+s;
    });
    return this.rune+" "+this.size.render()+"<br />"+s;
  }
  
  this.widget_cursor = function()
  {
    return "Drag";
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
  
  this.drag_from = null;
  this.drag_offset_x = 0;
  this.drag_offset_y = 0;

  this.mouse_down = function(position)
  {
    this.drag_from = ronin.position_in_window(position);
  }
  
  this.mouse_move = function(position)
  {
    if(this.drag_from === null){ return; }
    
    position = ronin.position_in_window(position);
    
    var offset_x = this.drag_from.x - position.x;
    var offset_y = this.drag_from.y - position.y;
    this.drag_offset_x -= offset_x;
    this.drag_offset_y -= offset_y;
    
    ronin.surface.element.style.marginLeft = -(this.size.width/2) + this.drag_offset_x;
    ronin.surface.element.style.marginTop = -(this.size.height/2) + this.drag_offset_y;

    ronin.element.style.backgroundPosition = ((this.drag_offset_x/8))-(window.innerWidth % 20)+"px "+((this.drag_offset_y/8)-(window.innerWidth % 20))+"px";
    ronin.widget.element.style.marginLeft = this.drag_offset_x;
    ronin.widget.element.style.marginTop = this.drag_offset_y;

    this.drag_from = new Position(position.x,position.y);
  }
  
  this.mouse_up = function(event)
  {
    this.drag_from = null;
  }
}