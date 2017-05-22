function Layer(name,manager = null)
{
  Module.call(this,"#");

  this.add_method(new Method("translate",["position"]));
  this.add_method(new Method("rotate",["position","angle"]));
  this.add_method(new Method("scale",["position","value"]));
  this.add_method(new Method("clear",[]));
  this.add_method(new Method("rotate",["position","angle"]));
  this.add_method(new Method("mirror",["position"]));
  this.add_method(new Method("fill",["color","position","rect"],"Add position"));
  
  this.add_method(new Method("rename",["text"]));

  this.name = name;
  this.rune = "#";
  this.manager = manager;
  this.element = document.createElement("canvas");
  this.element.setAttribute("id","_"+name);
  this.element.setAttribute("class","layer");
  this.depth = 0;

  this.scale = function(params,preview = false)
  {
    // TODO
    // ronin.render.get_layer();
    // ronin.render.context().drawImage(ronin.frame.context().canvas,0,0,w/2,h/2);
  }

  this.rotate = function(params, preview = false)
  {
    if(preview){ ronin.overlay.draw_pointer(params.position()); return; }
    if(!params.position()){ return; }

    var position = params.position();
    var angle = params.angle().degrees;

    var w = ronin.frame.settings["size"].width;
    var h = ronin.frame.settings["size"].height;

    ronin.render.get_layer().clear();
    ronin.render.context().drawImage(ronin.frame.context().canvas,0,0,w,h);
    ronin.frame.active_layer.clear();

    ronin.frame.context().save();
    ronin.frame.context().translate(position.x,position.y);
    ronin.frame.context().rotate(angle*Math.PI/180);

    ronin.frame.context().drawImage(ronin.render.context().canvas, -position.x, -position.y,w,h)

    ronin.frame.context().rotate(-angle*Math.PI/180);
    ronin.frame.context().restore();
    ronin.render.get_layer().clear();

    return 1, "ok";
  }

  this.translate = function(params,preview = false)
  {
    if(preview){ return; }
    if(!params.position()){ return; }

    var data = this.data();
    this.clear();
    this.context().putImageData(data, params.position().x * 2, params.position().y * 2);
    ronin.overlay.get_layer(true).clear();

    return 1, "ok";
  }

  this.fill = function(params,preview = false)
  {
    if(!params.color()){ return 0, "Color?"; }
    if(preview){ return 0, "No Preview"; }

    var rect = params.rect() ? params.rect() : new Rect(this.element.width+"x"+this.element.height);
    var position = params.position() ? params.position() : new Position("0,0");

    this.context().beginPath();
    this.context().rect(position.x, position.y, rect.width, rect.height);
    this.context().fillStyle = params.color().hex;
    this.context().fill();
    
    return 1, "ok";
  }

  this.rename = function(params, preview = false)
  {
    if(preview){ return; }

    // TODO
    // ronin.frame.layers[params.text()] = this;
    // ronin.frame.layers[this.name] = null;
    ronin.terminal.log(new Log(this,"Renamed layer "+this.name+" to "+params.text())); 
  }

  this.clear = function(params, preview = false)
  {
    if(preview){ return; }

    this.context().clearRect(0, 0, this.element.width, this.element.height);
  }

  this.resize = function(rect)
  {
    var pixels_rect   = new Rect(this.element.width+"x"+this.element.height);
    
    this.element.width = rect.width * 2;
    this.element.height = rect.height * 2;
    this.element.style.width = rect.width+"px";
    this.element.style.height = rect.height+"px";

    this.context().scale(2,2);
  }

  this.remove = function(manager)
  {
    manager.layer = null;
    ronin.frame.layers[this.name].element.outerHTML = "";
    delete ronin.frame.layers[this.name];
  }

  this.context = function()
  {
    return this.element.getContext('2d');
  }

  this.set_depth = function(depth)
  {
    this.depth = depth;
    this.element.setAttribute("z-index",depth);
  }

  this.image = function()
  {
    return this.element.toDataURL('image/png');
  }

  this.data = function()
  {
    return this.context().getImageData(0, 0, ronin.frame.settings["size"].width * 2, ronin.frame.settings["size"].height * 2);
  }

  //

  this.mouse_pointer = function(position)
  {
    return ronin.cursor.draw_pointer_arrow(position);
  }

  this.mouse_mode = function()
  {
    return "Move";
  }
  
  this.mouse_move = function(position)
  {
    var offset = new Position((-this.mouse_from.x + position.x)+","+(-this.mouse_from.y + position.y));

    ronin.overlay.get_layer(true).clear();
    ronin.overlay.draw_cross(this.mouse_from);
    ronin.overlay.draw_cross(position);
    ronin.overlay.draw_line(this.mouse_from,position);
  }
  
  this.mouse_up = function(position)
  {
    var offset = new Position((-this.mouse_from.x + position.x)+","+(-this.mouse_from.y + position.y));

    ronin.overlay.get_layer(true).clear();
    ronin.overlay.draw_circle(position);
    ronin.overlay.draw_circle(this.mouse_from);
    ronin.overlay.draw_line(this.mouse_from,position);

    // ronin.terminal.input_element.value = "layer."+ronin.terminal.method_name+" "+offset.render();

    // if(this.coordinates.length == 0){
    //   this.coordinates.push("M"+position.render());
    // }
    // else{
    //   var offset = this.last_pos ? position.offset(this.last_pos) : position;

    //   if(keyboard.shift_held == true && keyboard.alt_held == true){
    //     this.coordinates.push("M"+position.render());
    //   }
    //   else if(keyboard.shift_held == true){
    //     this.coordinates.push("a"+offset.render()+" 0 0,1 "+offset.render());
    //   }
    //   else if(keyboard.alt_held == true){
    //    this.coordinates.push("a"+offset.render()+" 0 0,0 "+offset.render()); 
    //   }
    //   else{
    //     this.coordinates.push("l"+offset.render());
    //   }
    // }

    // ronin.terminal.input_element.value = "path."+ronin.terminal.method_name+" "+this.create_path();
    // this.last_pos = position;
    // ronin.terminal.passive();
  }
  
  // this.move_from = null;

  // this.mouse_down = function(position)
  // {
  //   this.move_from = ronin.position_in_window(position);
  // }
  
  // this.mouse_move = function(position)
  // {
  //   if(this.move_from === null){ return; }

  //   position = ronin.position_in_window(position);
    
  //   var offset_x = this.move_from.x - position.x;
  //   var offset_y = this.move_from.y - position.y;

  //   var imageData = this.context().getImageData(0, 0, ronin.frame.settings["size"].width * 2, ronin.frame.settings["size"].height * 2);
  //   this.clear();
  //   this.context().putImageData(imageData, -offset_x * 2, -offset_y * 2);

  //   this.move_from = new Position(position.x,position.y);
    
  // }
  
  // this.mouse_up = function(event)
  // {
  //   this.move_from = null;
  // }

  // Blink

  this.is_blinking = false;

  this.blink = function()
  {
    if(this.is_blinking == false){ return; }
    
    this.element.style.display = this.element.style.display == "none" ? "block" : "none";
  }
}