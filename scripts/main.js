
// Juchecore

var ronin = new Ronin();
ronin.canvas.element = document.getElementById('workspace');
ronin.overlay.element = document.getElementById('overlay');
ronin.hint.element = document.getElementById('commander_hint');

var commander = new Commander(document.getElementById("commander"),document.getElementById("commander_input"));

// Interactive

document.addEventListener('mousemove', function(e)  { ronin.brush.draw(e); }, false);
document.addEventListener('mousedown', function(e)  { if(e.which != 1){ return; } ronin.brush.draw_start(e); }, false);
document.addEventListener('mouseup',   function(e)  { ronin.brush.draw_stop(e); }, false);

var keyboard = new Keyboard();
document.onkeyup = function myFunction(){ keyboard.listen(event); };

// Done.
