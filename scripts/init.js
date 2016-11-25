var ronin = new Ronin();
ronin.canvas.element = document.getElementById('workspace');
ronin.overlay.element = document.getElementById('overlay');
ronin.hint.element = document.getElementById('commander_hint');

var commander = new Commander(document.getElementById("commander"),document.getElementById("commander_input"));

// Interactive

document.addEventListener('mousemove', function(e)  {
  if(e.which == 1){ ronin.brush.draw(e); }
  if(e.which == 2){ ronin.canvas.drag(e); ronin.overlay.drag(e); }
}, false);
document.addEventListener('mousedown', function(e)  {
  if(e.which == 1){ ronin.brush.draw_start(e); ronin.brush.draw(e); }
  if(e.which == 2){ ronin.canvas.drag_start(e); ronin.canvas.drag(e); ronin.overlay.drag_start(e); ronin.overlay.drag(e); }
}, false);
document.addEventListener('mouseup',   function(e)  {
  if(e.which == 1){ ronin.brush.draw_stop(e); }
  if(e.which == 2){ ronin.canvas.drag_stop(e); ronin.overlay.drag_stop(e);  }
  document.getElementById("commander_input").focus();
}, false);

var keyboard = new Keyboard();
document.onkeyup = function myFunction(){ keyboard.listen(event); };

var starting_canvas = new Rect();
starting_canvas.width = window.innerWidth - 200;
starting_canvas.height = window.innerHeight - 200;

ronin.canvas.resize(starting_canvas);
ronin.overlay.resize(starting_canvas);
