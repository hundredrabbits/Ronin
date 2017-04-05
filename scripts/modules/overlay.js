function Overlay(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Position,Rect,Color];
  
  this.color = new Color("#ffffff");

  this.passive = function(cmd)
  {
    this.draw(cmd.position(),cmd.rect());
  }
  
  this.active = function(cmd)
  {
    if(cmd.bang()){ this.guides = []; }
    if(cmd.color()){ this.color = cmd.color(); }
  }
  
  // draw
  
  this.draw = function(position,rect)
  {
    this.clear();
    
    if(!position){ position = new Position("0,0"); }
    
    if(rect){
      this.draw_rect(position,rect);
    }
    else if(position.x !== 0 && position.y !== 0){
      this.draw_pointer(position);
    }
    else if(position.x !== 0 ){
      this.draw_vertical_line(position);
    }
    else if(position.y !== 0 ){
      this.draw_horizontal_line(position);
    }
  }
  
  this.draw_rect = function(position,rect)
  {
    this.context().beginPath();
    
    position.normalize(rect);
    
    this.context().moveTo(position.x,position.y);
    this.context().lineTo(position.x + rect.width,position.y);
    this.context().lineTo(position.x + rect.width,position.y + rect.height);
    this.context().lineTo(position.x,position.y + rect.height);
    this.context().lineTo(position.x,position.y);

    // Limits
    this.context().moveTo(position.x + (rect.width/2),position.y-2);
    this.context().lineTo(position.x + (rect.width/2),position.y+2);
    this.context().moveTo(position.x + (rect.width/2),position.y + rect.height-2);
    this.context().lineTo(position.x + (rect.width/2),position.y + rect.height+2);
    this.context().moveTo(position.x + rect.width-2,position.y + (rect.height/2));
    this.context().lineTo(position.x + rect.width+2,position.y + (rect.height/2));
    this.context().moveTo(position.x+2,position.y + (rect.height/2));
    this.context().lineTo(position.x-2,position.y + (rect.height/2));

    // Center
    this.context().moveTo(position.x + (rect.width/2) + 3,position.y + (rect.height/2));
    this.context().lineTo(position.x + (rect.width/2) + 5,position.y + (rect.height/2));
    this.context().moveTo(position.x + (rect.width/2) - 3,position.y + (rect.height/2));
    this.context().lineTo(position.x + (rect.width/2) - 5,position.y + (rect.height/2));

    this.context().moveTo(position.x + (rect.width/2),position.y + (rect.height/2) + 3);
    this.context().lineTo(position.x + (rect.width/2),position.y + (rect.height/2) + 5);
    this.context().moveTo(position.x + (rect.width/2),position.y + (rect.height/2) - 3);
    this.context().lineTo(position.x + (rect.width/2),position.y + (rect.height/2) - 5);
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = this.color.hex;
    this.context().stroke();
    this.context().closePath();
  }
  
  this.draw_pointer = function(position)
  {
    this.context().beginPath();
    
    this.context().moveTo(position.x + 2,position.y);
    this.context().lineTo(position.x + 5,position.y);
    this.context().moveTo(position.x,position.y + 2);
    this.context().lineTo(position.x,position.y + 5);
    this.context().moveTo(position.x - 2,position.y);
    this.context().lineTo(position.x - 5,position.y);
    this.context().moveTo(position.x,position.y - 2);
    this.context().lineTo(position.x,position.y - 5);
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = this.color.hex;
    this.context().stroke();
    this.context().closePath();
  }
  
  this.draw_line = function(position,to)
  {
    this.context().beginPath();
    
    this.context().moveTo(position.x,position.y);
    this.context().lineTo(to.x,to.y);
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = this.color.hex;
    this.context().stroke();
    this.context().closePath();
  }

  this.draw_circle = function(position,radius = 5)
  {
    this.context().beginPath();
    this.context().arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    this.context().lineWidth = 1;
    this.context().strokeStyle = "white";
    this.context().stroke();
    this.context().closePath();
  }

  this.draw_cross = function(position,radius = 5)
  {
    this.context().beginPath();
    
    this.context().moveTo(position.x+(radius-2),position.y);
    this.context().lineTo(position.x+radius,position.y);
    this.context().moveTo(position.x-(radius-2),position.y);
    this.context().lineTo(position.x-radius,position.y);
    this.context().moveTo(position.x,position.y+(radius-2));
    this.context().lineTo(position.x,position.y+radius);
    this.context().moveTo(position.x,position.y-(radius-2));
    this.context().lineTo(position.x,position.y-radius);
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = this.color.hex;
    this.context().stroke();
    this.context().closePath();
  }
  
  this.draw_vertical_line = function(position)
  {
    this.context().beginPath();
    
    this.context().moveTo(position.x,0);
    this.context().lineTo(position.x,this.element.height);
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = this.color.hex;
    this.context().stroke();
    this.context().closePath();
  }
  
  this.draw_horizontal_line = function(position)
  {
    this.context().beginPath();
    
    this.context().moveTo(0,position.y);
    this.context().lineTo(this.element.width,position.y);
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = this.color.hex;
    this.context().stroke();
    this.context().closePath();
  }
  
  // Cursor
  
  this.live_draw_from = null;

  this.mouse_down = function(position)
  {
    ronin.overlay.clear();
    ronin.overlay.draw_pointer(position);
    this.live_draw_from = position;
    ronin.terminal.input_element.value = "| "+this.live_draw_from.render();
  }
  
  this.mouse_move = function(position)
  {
    if(this.live_draw_from === null){ return; }
    
    ronin.overlay.clear();
    
    var rect = new Rect();
    rect.width = position.x - this.live_draw_from.x;
    rect.height = position.y - this.live_draw_from.y;
  
    ronin.overlay.draw_rect(this.live_draw_from,rect);
    ronin.terminal.input_element.value = "| "+this.live_draw_from.render()+" "+rect.render();

    ronin.terminal.update_hint();
  }
  
  this.mouse_up = function(position)
  {
    this.live_draw_from = null;
    ronin.terminal.input_element.focus();
  }
  
  // Widget
  
  this.widget_cursor = function()
  {
    return "Guide";
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}