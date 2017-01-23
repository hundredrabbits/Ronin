var ronin = new Ronin();
ronin.element = document.getElementById('ronin');
ronin.surface.element = document.getElementById('surface');
ronin.widget.element = document.getElementById('widget');
ronin.cursor.mode = ronin.brush;

var commander = new Commander(document.getElementById("commander"),document.getElementById("commander_input"));
commander.hint.element = document.getElementById('commander_hint');

// Cursor

document.addEventListener('mousedown', function(e){ ronin.cursor.mouse_down(ronin.position_in_canvas(e));}, false);
document.addEventListener('mousemove', function(e){ ronin.cursor.mouse_move(ronin.position_in_canvas(e));}, false);
document.addEventListener('mouseup', function(e){ ronin.cursor.mouse_up(ronin.position_in_canvas(e));}, false);
document.addEventListener('contextmenu', function(ev){ ev.preventDefault(); return false;}, false);
window.addEventListener('resize', function(){ ronin.on_resize(); }, true);

// Keyboard

var keyboard = new Keyboard();
document.onkeyup = function myFunction(){ keyboard.listen_onkeyup(event); };
document.onkeydown = function myFunction(){ keyboard.listen_onkeydown(event); };

ronin.install();

// Canvas
var starting_canvas = new Rect();
starting_canvas.width = window.innerWidth - 200;
starting_canvas.height = window.innerHeight - 300;

// Clamp

starting_canvas.width = parseInt(starting_canvas.width/40) * 40;
starting_canvas.height = parseInt(starting_canvas.height/40) * 40;

commander.query("~ "+ronin.timestamp());
commander.query("# "+starting_canvas.render());
commander.query("# layer=Background");
commander.query("# #a1a1a1");
commander.query("# layer=Main");
commander.query("> 1 ; > 0,0 ; > 1,1 ; > #ffffff");
commander.query("~ Ready.");