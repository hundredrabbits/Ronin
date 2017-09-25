function Overlay(rune)
{
  Module.call(this,rune);
  
  this.color = new Color("#ffffff");

  // draw
  
  this.draw = function(position,rect)
  {
    if(!this.layer){ this.create_layer(true); this.layer.is_blinking = true; }
    
    if(!position){ position = new Position("0,0"); }

    this.layer.clear();
    
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
  
  this.draw_rect = function(position = new Position(0,0),rect)
  {
    if(!position || !rect){ return; }

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
    var radius = 3;
    var radius_2 = 4;
    this.context().moveTo(position.x + (rect.width/2) + radius,position.y + (rect.height/2));
    this.context().lineTo(position.x + (rect.width/2) + radius_2,position.y + (rect.height/2));
    this.context().moveTo(position.x + (rect.width/2) - radius,position.y + (rect.height/2));
    this.context().lineTo(position.x + (rect.width/2) - radius_2,position.y + (rect.height/2));

    this.context().moveTo(position.x + (rect.width/2),position.y + (rect.height/2) + radius);
    this.context().lineTo(position.x + (rect.width/2),position.y + (rect.height/2) + radius_2);
    this.context().moveTo(position.x + (rect.width/2),position.y + (rect.height/2) - radius);
    this.context().lineTo(position.x + (rect.width/2),position.y + (rect.height/2) - radius_2);
    
    this.context().lineCap="square";
    this.context().lineWidth = 2;
    this.context().strokeStyle = "#000000";
    this.context().stroke();

    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = "#ffffff";
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
    
    this.context().lineCap="square";
    this.context().lineWidth = 2;
    this.context().strokeStyle = "#000000";
    this.context().stroke();

    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = "#ffffff";
    this.context().stroke();

    this.context().closePath();
  }
  
  this.draw_line = function(position,to)
  {
    this.context().beginPath();
    
    this.context().moveTo(position.x,position.y);
    this.context().lineTo(to.x,to.y);
    
    this.context().lineCap="square";
    this.context().lineWidth = 2;
    this.context().strokeStyle = "#000000";
    this.context().stroke();

    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = "#ffffff";
    this.context().stroke();

    this.context().closePath();
  }

  this.draw_circle = function(position,radius = 5)
  {
    this.context().beginPath();
    this.context().arc(position.x, position.y, radius, 0, 2 * Math.PI, false);

    this.context().lineCap="square";
    this.context().lineWidth = 2;
    this.context().strokeStyle = "#000000"
    this.context().stroke();
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = "#ffffff"
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
    
    this.context().lineCap="square";
    this.context().lineWidth = 2;
    this.context().strokeStyle = "#000000"
    this.context().stroke();
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = "#ffffff"
    this.context().stroke();

    this.context().closePath();
  }
  
  this.draw_vertical_line = function(position)
  {
    this.context().beginPath();
    
    this.context().moveTo(position.x,0);
    this.context().lineTo(position.x,ronin.frame.size.height);
    
    this.context().lineCap="square";
    this.context().lineWidth = 2;
    this.context().strokeStyle = "#000000"
    this.context().stroke();
    

    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = "#ffffff"
    this.context().stroke();
    
    this.context().closePath();
  }
  
  this.draw_horizontal_line = function(position)
  {
    this.context().beginPath();
    
    this.context().moveTo(0,position.y);
    this.context().lineTo(ronin.frame.size.width,position.y);
    
    this.context().lineCap="square";
    this.context().lineWidth = 2;
    this.context().strokeStyle = "#000000"
    this.context().stroke();
    
    this.context().lineCap="round";
    this.context().lineWidth = 1;
    this.context().strokeStyle = "#ffffff"
    this.context().stroke();

    this.context().closePath();
  }

  this.clear = function()
  {
    this.layer.remove(this);
  }

  this.key_escape = function()
  {
    if(this.layer){ this.layer.remove(this); }
  }
}