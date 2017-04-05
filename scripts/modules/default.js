function Default(rune)
{
  Module.call(this,rune);
  
  this.hint = function()
  {
    if(ronin.terminal.input_element.value == ""){
      var s = "";
      for(module in ronin.modules){
        s += ronin.modules[module].constructor.name+" ";
      }
      return s;
    }

    //

    var candidates = [];

    for(module in ronin.modules){
      for(method in ronin.modules[module].methods){
        candidates.push(module.toLowerCase()+"."+method);
      }
    }

    var s = "";

    for(candidate in candidates){
      if(candidates[candidate].indexOf(ronin.terminal.input_element.value) > -1){
        s += candidates[candidate]+" ";
      }
    }
    
    return s;
  }

  // Cursor
  
  this.mouse_mode = function()
  {
    return "Drag";
  }
  
  this.mouse_pointer = function(position)
  {
    return ronin.cursor.draw_pointer_drag(position);
  }
  
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
    
    ronin.frame.element.style.marginLeft = -(ronin.frame.settings["size"].width/2) + this.drag_offset_x;
    ronin.frame.element.style.marginTop = -(ronin.frame.settings["size"].height/2) + this.drag_offset_y;

    ronin.element.style.backgroundPosition = ((this.drag_offset_x/8))-(window.innerWidth % 20)+"px "+((this.drag_offset_y/8)-(window.innerWidth % 20))+"px";

    this.drag_from = new Position(position.x,position.y);
  }
  
  this.mouse_up = function(event)
  {
    this.drag_from = null;
  }
}