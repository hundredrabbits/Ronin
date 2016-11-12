
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var brush = new Brush();
var commander = new Commander(document.getElementById("commander"),document.getElementById("commander_input"));

canvas.addEventListener('mousemove', function(e) {
  brush.draw(e);
}, false);

canvas.addEventListener('mousedown', function(e) {
  brush.draw_start(e);
}, false);

canvas.addEventListener('mouseup', function(e) {
  brush.draw_stop(e);
}, false);

var mirror_test = new Pointer();
mirror_test.mirror = new Position(200,0);
brush.add_pointer(mirror_test);

var mirror_test2 = new Pointer(new Position(0,10));
mirror_test2.mirror = new Position(200,0);
brush.add_pointer(mirror_test2);

brush.add_pointer(new Pointer(new Position(0,10)));

var keyboard = new Keyboard();
document.onkeydown = function myFunction(){ keyboard.listen(event); };
