var pointer = new Pointer();
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

function writeMessage(canvas, message) {
  var context = canvas.getContext('2d');
  // context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '12pt Calibri';
  context.fillStyle = 'black';
  context.fillText(message, 10, 25);
}

function getMousePos(canvas, evt)
{
  var rect = canvas.getBoundingClientRect();
  return new Position(evt.clientX - rect.left,evt.clientY - rect.top);
}

canvas.addEventListener('mousemove', function(evt) {
  pointer.position = getMousePos(canvas, evt);
  pointer.draw();
  // var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  // writeMessage(canvas, message);
  // draw_pixel(context,mousePos.x,mousePos.y);
}, false);

canvas.addEventListener('mousedown', function(evt) {
  pointer.can_draw = true;
}, false);

canvas.addEventListener('mouseup', function(evt) {
  pointer.can_draw = false;
}, false);

function draw_pixel(context,x,y)
{
  var id = context.createImageData(1,1);
  var d  = id.data;
  d[0]   = 0;
  d[1]   = 0;
  d[2]   = 0;
  d[3]   = 255;
  context.putImageData(id,x,y);
}