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
// document.addEventListener('contextmenu', function(ev){ ev.preventDefault(); return false;}, false);
window.addEventListener('resize', function(){ ronin.on_resize(); }, true);

// Keyboard

var keyboard = new Keyboard();
document.onkeyup = function myFunction(){ keyboard.listen_onkeyup(event); };
document.onkeydown = function myFunction(){ keyboard.listen_onkeydown(event); };

ronin.install();

var target_file = window.location.hash ? window.location.hash : "default";
target_file = target_file.substr(1,target_file.length-1);

ronin.start();

// ronin.terminal.load(window.location.hash ? target_file+".rin" : "default.rin");