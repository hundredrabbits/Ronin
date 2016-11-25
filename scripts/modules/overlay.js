function Overlay(element)
{
  Module.call(this);
  
  this.parameters = [Position,Rect];
  this.element = element;
  
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
    
    if(!position){ return; }
    
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
  
  this.resize = function(rect)
  {
    this.element.setAttribute('width',rect.width+"px");
    this.element.setAttribute('height',rect.height+"px");
    this.element.style.left = (window.innerWidth/2)-(rect.width/2);
    this.element.style.top = (window.innerHeight/2)-(rect.height/2);
  }
  
  this.show_guide = function(position,rect)
  {
    this.clear();
    this.context().beginPath();
    
    this.context().moveTo(0,0);
    this.context().lineTo(rect.width,0);
    this.context().lineTo(rect.width,rect.height);
    this.context().lineTo(0,rect.height);
    this.context().lineTo(0,0);
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = "#ff0000";
    this.context().stroke();
    this.context().closePath();
  }
  
  this.context = function()
  {
    return this.element.getContext('2d');
  }
  
  this.clear = function()
  {
    this.context().clearRect(0, 0, ronin.canvas.element.width, ronin.canvas.element.height);
  }
  
  // Drag
  
  this.drag_from = null;
  
  this.drag_start = function(e)
  {
    this.drag_from = new Position(e.clientX,e.clientY);
  }
  
  this.drag = function(e)
  {
    if(e.which != 2){ return; }
    
    var offset_x = this.drag_from.x - e.clientX;
    this.element.style.left = parseInt(this.element.style.left) - offset_x;
    var offset_y = this.drag_from.y - e.clientY;
    this.element.style.top = parseInt(this.element.style.top) - offset_y;
    this.drag_from = new Position(e.clientX,e.clientY);
  }
  
  this.drag_stop = function(e)
  {
    this.drag_from = null;
  }
}