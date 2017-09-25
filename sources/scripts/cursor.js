function Cursor(rune)
{
  this.line = {from:null,to:null};
  this.is_down = false;

  this.mouse_down = function(e)
  {
    e.preventDefault();

    ronin.cursor.line.from = {x:e.clientX,y:e.clientY};
  }

  this.mouse_move = function(e)
  {
    e.preventDefault();

    if(!ronin.cursor.line.from){ return; }

    ronin.cursor.line.to = {x:e.clientX,y:e.clientY};

    if(e.altKey){
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
    
    ronin.cursor.is_down = false;
    ronin.cursor.line = {};
  }
}