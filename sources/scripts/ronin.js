function Ronin()
{
  this.el = document.createElement('yu');
  this.el.id = "ronin";

  this.io = new IO();
  this.keyboard = new Keyboard();
  this.commander = new Commander();
  this.cursor = new Cursor();
  this.render = new Render();
  this.brush = new Brush();
  this.eraser = new Eraser();
  this.hint = new Hint();

  this.modules = {
    rescale : new Rescale(),
    brush : this.brush,
  };
  
  this.install = function()
  {
    document.body.appendChild(this.el);

    this.render.install();
    this.commander.install();
    this.hint.install();

    this.start();
  }

  this.start = function()
  {
    window.addEventListener('dragover', ronin.io.drag_over);
    window.addEventListener('drop', ronin.io.drop);
    ronin.render.el.addEventListener('mousedown', ronin.cursor.mouse_down);
    ronin.render.el.addEventListener('mousemove', ronin.cursor.mouse_move);
    ronin.render.el.addEventListener('mouseup', ronin.cursor.mouse_up);
    window.addEventListener('keydown', ronin.keyboard.key_down);
    ronin.commander.input_el.addEventListener('input', ronin.commander.on_input);

    console.log("Ronin","Started");
    this.render.update();
  }

  this.resize_to = function(size)
  {
    const {dialog,app} = require('electron').remote;
    var win = require('electron').remote.getCurrentWindow();
    win.setSize(size.width,size.height);
    this.render.resize_to(size);
  }
}