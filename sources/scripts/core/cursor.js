function Cursor(rune)
{
  Layer.call(this);

  this.el.id = "cursor";
  this.line = {origin:null,from:null,to:null,destination:null};
  this.is_down = false;
  this.query = null;
  this.mode = "vertex";

  this.draw_cursor = function(pos,touch = false)
  {
    this.clear();

    var ctx = this.context();
    var radius = ronin.brush.settings.size;

    ctx.beginPath();
    ctx.arc(pos.x * 2, pos.y * 2, radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4.5;
    ctx.stroke();
    ctx.strokeStyle = touch ? "#000" : "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.closePath();
  }

  this.mouse_down = function(e)
  {
    e.preventDefault();
    ronin.cursor.draw_cursor({x:e.clientX,y:e.clientY},true);

    ronin.cursor.line.origin = {x:e.clientX,y:e.clientY};
    ronin.cursor.line.from = {x:e.clientX,y:e.clientY};

    // Save original query
    ronin.cursor.query = ronin.commander.input_el.value;

    if(e.shiftKey){ ronin.cursor.mode = "rect"; }
    if(e.altKey){ ronin.cursor.mode = "arc_to"; }
    if(e.ctrlKey){ ronin.cursor.mode = "cc_arc_to"; }
  }

  this.mouse_move = function(e)
  {
    e.preventDefault();
    ronin.cursor.draw_cursor({x:e.clientX,y:e.clientY});

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
    ronin.cursor.draw_cursor({x:e.clientX,y:e.clientY},true);
    
    ronin.cursor.line.destination = {x:e.clientX,y:e.clientY};

    ronin.cursor.inject_query();
    
    ronin.cursor.is_down = false;
    ronin.cursor.line = {};
    ronin.cursor.mode = "vertex";

    ronin.cursor.query = ronin.commander.input_el.value;
  }

  this.inject_query = function()
  {
    if(ronin.cursor.query.indexOf("$") < 0){ return; }

    var a = ronin.cursor.line.origin;
    var b = ronin.cursor.line.destination ? ronin.cursor.line.destination : ronin.cursor.line.from;

    var str = "<error>";

    if(ronin.cursor.mode == "vertex"){
      str = b.x+","+b.y;
    }
    else if(ronin.cursor.mode == "rect"){
      var offset = a.x+","+a.y;
      var rect = (b.x - a.x)+"x"+(b.y - a.y);
      str = offset+"|"+rect;
    }
    else if(ronin.cursor.mode == "arc_to"){
      str = "@>"+b.x+","+b.y;
    }
    else if(ronin.cursor.mode == "cc_arc_to"){
      str = "@<"+b.x+","+b.y;
    }

    // 
    var i = ronin.cursor.query.indexOf("$");
    var i1 = ronin.cursor.query.substr(i,1);
    if(i1 == "$"){
      ronin.commander.inject(ronin.cursor.query.replace("$+",str+"&$+"));
    }
    else{
      ronin.commander.inject(ronin.cursor.query.replace("$",str));
    }
  }

  function distance_between(a,b)
  {
    return Math.sqrt( (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y) );
  }
}