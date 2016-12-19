var ronin = new Ronin();
ronin.canvas.element = document.getElementById('workspace');
ronin.overlay.element = document.getElementById('overlay');
ronin.hint.element = document.getElementById('commander_hint');
ronin.surface = document.getElementById('surface');
ronin.widget.element = document.getElementById('widget');

var commander = new Commander(document.getElementById("commander"),document.getElementById("commander_input"));

// Cursor
document.addEventListener('mousedown', function(e){ ronin.cursor.mode.mouse_down(e);}, false);
document.addEventListener('mousemove', function(e){ ronin.cursor.mode.mouse_move(e);}, false);
document.addEventListener('mouseup', function(e){ ronin.cursor.mode.mouse_up(e);}, false);
document.addEventListener('contextmenu', function(ev){ ev.preventDefault(); return false;}, false);

// Keyboard
var keyboard = new Keyboard();
document.onkeyup = function myFunction(){ keyboard.listen_onkeyup(event); };
document.onkeydown = function myFunction(){ keyboard.listen_onkeydown(event); };

// Canvas
var starting_canvas = new Rect();
starting_canvas.width = window.innerWidth - 200;
starting_canvas.height = window.innerHeight - 200;

ronin.canvas.resize(starting_canvas);
ronin.overlay.resize(starting_canvas);