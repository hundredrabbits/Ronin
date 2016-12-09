function Overlay(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Position,Rect];
  
  // Module
  
  this.passive = function(cmd)
  {
    this.draw(cmd.position(),cmd.rect());
  }
  
  this.active = function(cmd)
  {
    if(cmd.bang()){ this.guides = []; }
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
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = "#ff0000";
    this.context().stroke();
    this.context().closePath();
  }
  
  this.draw_pointer = function(position)
  {
    this.context().beginPath();
    
    this.context().moveTo(position.x,position.y);
    this.context().lineTo(position.x + 10,position.y);
    this.context().lineTo(position.x,position.y + 10);
    this.context().lineTo(position.x,position.y);
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = "#ff0000";
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
    this.context().strokeStyle = "#ff0000";
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
    this.context().strokeStyle = "#ff0000";
    this.context().stroke();
    this.context().closePath();
  }
  
  // Live Draw(Ctrl)
  
  this.live_draw_from = null;
  
  this.live_draw_start = function(e)
  {
    this.clear();
    
    this.draw_pointer(ronin.position_in_canvas(e));
    this.live_draw_from = ronin.position_in_canvas(e);
    commander.show();
    commander.element_input.focus();
    commander.element_input.value = "| "+this.live_draw_from.render();
  }
  
  this.live_draw = function(e)
  {
    this.clear();
    
    var rect = new Rect();
    rect.width = ronin.position_in_canvas(e).x - this.live_draw_from.x;
    rect.height = ronin.position_in_canvas(e).y - this.live_draw_from.y;
  
    this.draw_rect(this.live_draw_from,rect);
    commander.element_input.value = "| "+this.live_draw_from.render()+" "+rect.render();
  }
  
  this.resize = function(rect)
  {
    this.element.setAttribute('width',rect.width+"px");
    this.element.setAttribute('height',rect.height+"px");
    this.element.style.left = (window.innerWidth/2)-(rect.width/2);
    this.element.style.top = (window.innerHeight/2)-(rect.height/2);
  }
  
  this.context = function()
  {
    return this.element.getContext('2d');
  }
  
  this.clear = function()
  {
    this.context().clearRect(0, 0, ronin.canvas.element.width, ronin.canvas.element.height);
  }
}