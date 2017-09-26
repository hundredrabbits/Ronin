function Ronin()
{
  this.el = document.createElement('yu');
  this.el.id = "ronin";

  this.grid = new Grid();
  this.io = new IO();
  this.keyboard = new Keyboard();
  this.commander = new Commander();
  this.cursor = new Cursor();
  this.render = new Render();
  this.hint = new Hint();
  this.guide = new Guide();

  this.brush = new Brush();
  this.eraser = new Eraser();
  this.frame = new Frame();
  this.line = new Line();

  this.modules = {
    brush : this.brush,
    eraser : this.eraser,
    frame : this.frame,
    line : this.line,
  };
  
  this.install = function()
  {
    document.body.appendChild(this.el);

    this.grid.install();
    this.guide.install();
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
    this.grid.update();
    this.guide.update();

    this.commander.input_el.value = "frame crop:$";
  }
}