function Cursor(rune)
{
  this.line = {origin:null,from:null,to:null,destination:null};
  this.is_down = false;

  this.mouse_down = function(e)
  {
    e.preventDefault();

    ronin.cursor.line.origin = {x:e.clientX,y:e.clientY};
    ronin.cursor.line.from = {x:e.clientX,y:e.clientY};
  }

  this.mouse_move = function(e)
  {
    e.preventDefault();

    if(!ronin.cursor.line.from){ return; }

    ronin.cursor.line.to = {x:e.clientX,y:e.clientY};

    if(ronin.commander.active_module()){

    }
    else if(e.altKey){
      ronin.eraser.stroke(ronin.cursor.line);
    }
    else{
      ronin.brush.stroke(ronin.cursor.line);  
    }
    
    ronin.cursor.line.from = {x:e.clientX,y:e.clientY};
  }

  this.mouse_up = function(e)
  {   
    e.preventDefault();
    
    ronin.cursor.line.destination = {x:e.clientX,y:e.clientY};

    if(distance_between(ronin.cursor.line.origin,ronin.cursor.line.destination) > 10){
      var offset = ronin.cursor.line.origin.x+","+ronin.cursor.line.origin.y;
      var rect = (ronin.cursor.line.destination.x - ronin.cursor.line.origin.x)+"x"+(ronin.cursor.line.destination.y - ronin.cursor.line.origin.y);
      ronin.commander.inject(offset+"%"+rect);
    }
    else{
      ronin.commander.inject(e.clientX+","+e.clientY);
    }
    
    ronin.cursor.is_down = false;
    ronin.cursor.line = {};
  }

  function distance_between(a,b)
  {
    return Math.sqrt( (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y) );
  }
}