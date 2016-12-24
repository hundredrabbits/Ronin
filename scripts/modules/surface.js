function Surface(rune)
{
  Module.call(this,rune);
  
  this.element = null;
  this.parameters = [Rect,Color,Any];

  this.layers = {};
  this.active_layer = null;

  this.size = null;
  
  this.active = function(cmd)
  {
    if(cmd.rect()){
      this.resize(cmd.rect(),cmd.position());
      ronin.overlay.resize(cmd.rect());
    }
    if(cmd.color()){
      this.context().beginPath();
      this.context().rect(0, 0, this.active_layer.element.width, this.active_layer.element.height);
      this.context().fillStyle = cmd.color().hex;
      this.context().fill();
    }

    //

    if(cmd.variable("layer")){
      var layer_name = cmd.variable("layer").value;
      if(this.layers[layer_name]){
        console.log("Selecting layer:"+layer_name);
        this.active_layer = this.layers[layer_name];
      }
      else{
        console.log("Creating layer:"+layer_name); 
        this.layers[layer_name] = new Layer(layer_name,this.size);
        this.active_layer = this.layers[layer_name];
        this.element.appendChild(this.active_layer.element);
        this.active_layer.resize(this.size);
      }
    }

    
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
    ronin.surface.element.style.left = (window.innerWidth/2)-(rect.width/2);
    ronin.surface.element.style.top = (window.innerHeight/2)-(rect.height/2);
    ronin.surface.element.style.width = rect.width+"px";
    ronin.surface.element.style.height = rect.height+"px";
    ronin.widget.element.style.left = (window.innerWidth/2)-(rect.width/2);
    ronin.widget.element.style.top = (window.innerHeight/2)+(rect.height/2);
    ronin.widget.element.style.width = rect.width+"px";
    
    ronin.widget.update(); 
  }

  this.widget = function()
  {
    if(!this.active_layer){ return ""; }
    return "# "+this.active_layer.name;
  }
  
  this.widget_cursor = function()
  {
    return "Move";
  }

  // Layers

  this.context = function()
  {
    return this.active_layer.context();
  }
  
  // Cursor
  
  this.drag_from = null;

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
    
    ronin.surface.element.style.left = ronin.surface.element.style.left ? parseInt(ronin.surface.element.style.left) - offset_x : offset_x;
    ronin.surface.element.style.top = ronin.surface.element.style.top ? parseInt(ronin.surface.element.style.top) - offset_y : offset_y;
    
    this.drag_from = new Position(position.x,position.y);
  }
  
  this.mouse_up = function(event)
  {
    this.drag_from = null;
  }
}