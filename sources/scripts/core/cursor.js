function Cursor(rune)
{
  this.line = {origin:null,from:null,to:null,destination:null};
  this.is_down = false;

  this.query = null;

  this.mouse_down = function(e)
  {
    e.preventDefault();

    ronin.cursor.line.origin = {x:e.clientX,y:e.clientY};
    ronin.cursor.line.from = {x:e.clientX,y:e.clientY};

    // Save original query
    ronin.cursor.query = ronin.commander.input_el.value;
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

    ronin.cursor.inject_query();
    
    ronin.cursor.line.from = {x:e.clientX,y:e.clientY};
  }

  this.mouse_up = function(e)
  {   
    e.preventDefault();
    
    ronin.cursor.line.destination = {x:e.clientX,y:e.clientY};

    ronin.cursor.inject_query();
    
    ronin.cursor.is_down = false;
    ronin.cursor.line = {};
  }

  this.inject_query = function()
  {
    if(ronin.cursor.query.indexOf("$") < 0){ return; }

    var a = ronin.cursor.line.origin;
    var b = ronin.cursor.line.destination ? ronin.cursor.line.destination : ronin.cursor.line.from;

    if(distance_between(a,b) > 10){
      var offset = a.x+","+a.y;
      var rect = (b.x - a.x)+"x"+(b.y - a.y);
      var str = offset+"|"+rect;
    }
    else{
      var str = a.x+","+a.y;
    }
    ronin.commander.inject(ronin.cursor.query.replace("$",str));
  }

  function distance_between(a,b)
  {
    return Math.sqrt( (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y) );
  }
}