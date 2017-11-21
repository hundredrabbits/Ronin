function Cursor(rune)
{
  Layer.call(this);

  this.el.id = "cursor";
  this.line = {origin:null,from:null,to:null,destination:null};
  this.is_down = false;
  this.query = null;
  this.mode = "vertex";

  this.color = "#f00"
  this.size = 4;

  this.draw_cursor = function(pos,touch = false)
  {
    this.clear();

    if(!pos){ return; }

    var ctx = this.context();
    var radius = ronin.cursor.size;

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

    var pos = ronin.magnet.filter({x:e.clientX,y:e.clientY});

    // Color Pick
    if(ronin.commander.input_el.value == "~"){
      ronin.brush.methods.pick.run({x:pos.x,y:pos.y})
      ronin.commander.input_el.value = "";
      ronin.commander.update();
      return;
    }

    ronin.cursor.draw_cursor({x:pos.x,y:pos.y},true);

    ronin.cursor.line.origin = {x:pos.x,y:pos.y};
    ronin.cursor.line.from = {x:pos.x,y:pos.y};

    // Save original query
    ronin.cursor.query = ronin.commander.input_el.value;

    if(ronin.commander.active_module()){

    }
    else if(e.altKey && e.shiftKey){
      ronin.brush.methods.pick.run(pos);
    }
    else{
      ronin.brush.stroke(ronin.cursor.line);  
    }

    if(e.shiftKey){ ronin.cursor.mode = "rect"; }
    if(e.altKey){ ronin.cursor.mode = "arc_to"; }
    if(e.ctrlKey){ ronin.cursor.mode = "cc_arc_to"; }
  }

  this.mouse_move = function(e)
  {
    e.preventDefault();

    var pos = ronin.magnet.filter({x:e.clientX,y:e.clientY});

    ronin.cursor.draw_cursor({x:pos.x,y:pos.y});

    if(!ronin.cursor.line.from){ return; }

    ronin.cursor.line.to = {x:pos.x,y:pos.y};

    if(ronin.commander.active_module()){

    }
    else if(e.altKey && e.shiftKey){
      ronin.brush.methods.pick.run(pos);
    }
    else if(e.altKey){
      ronin.brush.erase(ronin.cursor.line);
    }
    else if(e.shiftKey){
      ronin.cursor.drag(ronin.cursor.line);
    }
    else{
      ronin.brush.stroke(ronin.cursor.line);  
    }

    ronin.cursor.inject_query();
    
    ronin.cursor.line.from = {x:pos.x,y:pos.y};
  }

  this.mouse_up = function(e)
  {   
    e.preventDefault();

    var pos = ronin.magnet.filter({x:e.clientX,y:e.clientY});

    ronin.cursor.draw_cursor({x:pos.x,y:pos.y},true);
    
    ronin.cursor.line.destination = {x:pos.x,y:pos.y};

    ronin.cursor.inject_query();
    
    ronin.cursor.is_down = false;
    ronin.cursor.line = {};
    ronin.cursor.mode = "vertex";

    ronin.cursor.query = ronin.commander.input_el.value;
  }

  this.drag = function(line)
  {
    var offset = make_offset(line.from,line.to);
    var data = ronin.render.select();
    ronin.render.clear();
    ronin.render.context().putImageData(data, offset.x * -2, offset.y * -2);
  }

  function make_offset(a,b)
  {
    return {x:a.x-b.x,y:a.y-b.y};
  }

  this.inject_query = function()
  {
    if(ronin.cursor.query && ronin.cursor.query.indexOf("$") < 0){ return; }

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
    var i = ronin.cursor.query ? ronin.cursor.query.indexOf("$") : '';
    var i1 = ronin.cursor.query ? ronin.cursor.query.substr(i,2) : '';
    var e1 = ronin.cursor.query ? ronin.cursor.query.substr(i-1,2) : '';

    if(e1 == "#$"){
      var r = parseInt((b.x/ronin.frame.width) * 255);
      var g = 255 - parseInt((b.x/ronin.frame.width) * 255);
      var b = parseInt((b.y/ronin.frame.height) * 255);
      var str = new Color().rgb_to_hex([r,g,b]);
      ronin.commander.inject(ronin.cursor.query.replace("#$",str+" "));
    }
    else if(i1 == "$+"){
      ronin.commander.inject(ronin.cursor.query.replace("$+",str+"&$+"));
    }
    else if(ronin.cursor.query){
      ronin.commander.inject(ronin.cursor.query.replace("$",str));
    }
  }

  this.hint = function()
  {
    var html = "";

    var mode = "PAINT";

    if(ronin.commander.input_el.value.indexOf("$+") > -1){
      mode = "[MULTI]POS/SHIFT-RECT"
    }
    else if(ronin.commander.input_el.value.indexOf("$") > -1){
      mode = "POS/SHIFT-RECT"
    }
    else if(ronin.keyboard.is_down["Alt"] && ronin.keyboard.is_down["Shift"]){
      mode = "PICK";
    }
    else if(ronin.keyboard.is_down["Alt"]){
      mode = "ERASE";
    }
    else if(ronin.keyboard.is_down["Shift"]){
      mode = "DRAG";
    }

    return "<t class='mode'>"+mode+"</t><t class='size'>"+ronin.cursor.size+"</t> <t class='color' style='color:"+ronin.cursor.color+"'>●</t>";
  }

  function distance_between(a,b)
  {
    return Math.sqrt( (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y) );
  }
}