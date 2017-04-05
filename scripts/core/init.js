var ronin = new Ronin();
ronin.element = document.getElementById('ronin');
ronin.frame.element = document.getElementById('frame');
ronin.cursor.element = document.getElementById('cursor');
ronin.terminal.element = document.getElementById('terminal');
ronin.cursor.mode = ronin.brush;

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

ronin.terminal.query("~ "+ronin.timestamp());
ronin.terminal.query("frame.select main");
ronin.terminal.query("frame.resize "+starting_canvas.render());
ronin.terminal.query("brush:color #ff0000");

ronin.terminal.input_element.focus();
ronin.terminal.update_hint();
ronin.frame.update_widget();