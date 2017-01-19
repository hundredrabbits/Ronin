function Layer(name,manager = null)
{
  this.name = name;
  this.manager = manager;
  this.element = document.createElement("canvas");
  this.element.setAttribute("id","_"+name);
  this.element.setAttribute("class","layer");

  this.resize = function(rect)
  {
    console.log("Resize "+this.name+" to "+rect.render());

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

  this.context = function()
  {
    return this.element.getContext('2d');
  }

  this.image = function()
  {
    return this.element.toDataURL('image/png');
  }

  //

  this.widget_cursor = function()
  {
    return "Move";
  }

  this.widget = function()
  {
    var e_name = "";
    e_name += this.name;

    var e_class = "";
    e_class += "layer ";
    if(ronin.surface.active_layer.name == this.name){ e_class += "highlight "; }
    if(this.manager != null){ e_class += "managed "; }

    var e_icon = this.manager ? "~" : "-";


    return "<span class='"+e_class+"'>"+e_icon+" "+e_name+"</span><br />";
  }

  this.move_from = null;

  this.mouse_down = function(position)
  {
    this.move_from = ronin.position_in_window(position);
    ronin.stroke.new_stroke();
  }
  
  this.mouse_move = function(position)
  {
    if(this.move_from === null){ return; }
    
    ronin.stroke.append_stroke(position); // Save to stroke

    position = ronin.position_in_window(position);
    
    var offset_x = this.move_from.x - position.x;
    var offset_y = this.move_from.y - position.y;

    var imageData = this.context().getImageData(0, 0, ronin.surface.size.width * 2, ronin.surface.size.height * 2);
    this.clear();
    this.context().putImageData(imageData, -offset_x * 2, -offset_y * 2);

    this.move_from = new Position(position.x,position.y);
    
  }
  
  this.mouse_up = function(event)
  {
    this.move_from = null;
    ronin.stroke.save_stroke("move");
  }
}