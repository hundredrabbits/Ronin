var ronin = new Ronin();
ronin.canvas.element = document.getElementById('workspace');
ronin.overlay.element = document.getElementById('overlay');
ronin.surface = document.getElementById('surface');
ronin.widget.element = document.getElementById('widget');
ronin.cursor.mode = ronin.brush;

var commander = new Commander(document.getElementById("commander"),document.getElementById("commander_input"));
commander.hint.element = document.getElementById('commander_hint');

// Cursor
document.addEventListener('mousedown', function(e){ ronin.cursor.mouse_down(ronin.position_in_canvas(e));}, false);
document.addEventListener('mousemove', function(e){ ronin.cursor.mouse_move(ronin.position_in_canvas(e));}, false);
document.addEventListener('mouseup', function(e){ ronin.cursor.mouse_up(ronin.position_in_canvas(e));}, false);
document.addEventListener('contextmenu', function(ev){ ev.preventDefault(); return false;}, false);

// Keyboard
var keyboard = new Keyboard();
document.onkeyup = function myFunction(){ keyboard.listen_onkeyup(event); };
document.onkeydown = function myFunction(){ keyboard.listen_onkeydown(event); };

// Canvas
var starting_canvas = new Rect();
starting_canvas.width = window.innerWidth - 200;
starting_canvas.height = window.innerHeight - 200;

commander.query("~ "+ronin.timestamp());
commander.query("@ "+starting_canvas.render());
commander.query("> 1 0,0 #000000");
commander.query("> banking=true");
commander.query("> natural=true");
commander.query("> -5,0");