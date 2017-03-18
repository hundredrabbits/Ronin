function Layer(name,manager = null)
{
  this.rune = "@";
  this.name = name;
  this.manager = manager;
  this.element = document.createElement("canvas");
  this.element.setAttribute("id","_"+name);
  this.element.setAttribute("class","layer");

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

  this.fill = function(color)
  {
    this.context().beginPath();
    this.context().rect(0, 0, this.active_layer.element.width, this.active_layer.element.height);
    this.context().fillStyle = cmd.color().hex;
    this.context().fill();
    ronin.terminal.log(new Log(this,"Filled layer: "+cmd.color().hex)); 
    this.element.style.border = "1px solid "+cmd.color().hex;
    this.element.setAttribute("class",cmd.color().style());
  }

  this.clear = function()
  {
    this.context().clearRect(0, 0, this.element.width, this.element.height);
  }

  this.remove = function(manager)
  {
    ronin.terminal.log(new Log(this,"Removing layer "+this.name));
    manager.layer = null;
    ronin.surface.layers[this.name].element.outerHTML = "";
    delete ronin.surface.layers[this.name];
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
    
    if(ronin.surface.active_layer.name == this.name){ e_class += "highlight "; }
    if(this.manager != null){ e_class += "managed "; }

    return "<span class='"+e_class+"'>"+e_name+"</span>";
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

    var imageData = this.context().getImageData(0, 0, ronin.surface.settings["size"].width * 2, ronin.surface.settings["size"].height * 2);
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