var pointer = new Pointer();
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

canvas.addEventListener('mousemove', function(e) {
  pointer.draw(e);
}, false);

canvas.addEventListener('mousedown', function(e) {
  pointer.can_draw = true;
}, false);

canvas.addEventListener('mouseup', function(e) {
  pointer.can_draw = false;
}, false);