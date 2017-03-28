function Layer(name,manager = null)
{
  Module.call(this,"#");

  this.add_method(new Method("fill",["color","position","rect"],"Add position"));
  this.add_method(new Method("rename",["text"]));

  this.name = name;
  this.rune = "#";
  this.manager = manager;
  this.element = document.createElement("canvas");
  this.element.setAttribute("id","_"+name);
  this.element.setAttribute("class","layer");

  this.fill = function(params,preview = false)
  {
    if(preview){ return; }
    if(!params.color()){ return; }

    var rect = params.rect() ? params.rect() : new Rect(this.element.width+"x"+this.element.height);
    var position = params.position() ? params.position() : new Position("0,0");

    this.context().beginPath();
    this.context().rect(position.x, position.y, rect.width, rect.height);
    this.context().fillStyle = params.color().hex;
    this.context().fill();
    ronin.terminal.log(new Log(this,"Filled layer "+this.name+": "+params.color().hex)); 
  }

  this.rename = function(params, preview = false)
  {
    if(preview){ return; }

    // TODO
    // ronin.frame.layers[params.text()] = this;
    // ronin.frame.layers[this.name] = null;
    ronin.terminal.log(new Log(this,"Renamed layer "+this.name+" to "+params.text())); 
  }

  this.resize = function(rect)
  {
    ronin.terminal.log(new Log(this,"Resize "+this.name+" to "+rect.render()));

    var pixels_rect   = new Rect(this.element.width+"x"+this.element.height);
    
    this.element.width = rect.width * 2;
    this.element.height = rect.height * 2;
    this.element.style.width = rect.width+"px";
    this.element.style.height = rect.height+"px";

    this.context().scale(2,2);
  }

  this.clear = function()
  {
    this.context().clearRect(0, 0, this.element.width, this.element.height);
  }

  this.remove = function(manager)
  {
    ronin.terminal.log(new Log(this,"Removing layer "+this.name));
    manager.layer = null;
    ronin.frame.layers[this.name].element.outerHTML = "";
    delete ronin.frame.layers[this.name];
  }

  this.context = function()
  {
    return this.element.getContext('2d');
  }

  this.image = function()
  {
    return this.element.toDataURL('image/png');
  }

  //

  this.widget = function()
  {
    var e_name = this.name;
    var e_class = "";
    
    if(ronin.frame.active_layer.name == this.name){ e_class += "highlight "; }
    if(this.manager != null){ e_class += "managed "; }

    return "<span class='"+e_class+"'>"+e_name+"</span>";
  }

  this.mouse_pointer = function(position)
  {
    return ronin.cursor.draw_pointer_drag(position);
  }

  this.mouse_mode = function()
  {
    return "Move";
  }
  
  this.move_from = null;

  this.mouse_down = function(position)
  {
    this.move_from = ronin.position_in_window(position);
  }
  
  this.mouse_move = function(position)
  {
    if(this.move_from === null){ return; }

    position = ronin.position_in_window(position);
    
    var offset_x = this.move_from.x - position.x;
    var offset_y = this.move_from.y - position.y;

    var imageData = this.context().getImageData(0, 0, ronin.frame.settings["size"].width * 2, ronin.frame.settings["size"].height * 2);
    this.clear();
    this.context().putImageData(imageData, -offset_x * 2, -offset_y * 2);

    this.move_from = new Position(position.x,position.y);
    
  }
  
  this.mouse_up = function(event)
  {
    this.move_from = null;
  }

  // Blink

  this.is_blinking = false;

  this.blink = function()
  {
    if(this.is_blinking == false){ return; }
    
    this.element.style.display = this.element.style.display == "none" ? "block" : "none";
  }
}