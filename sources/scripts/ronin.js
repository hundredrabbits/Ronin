function Ronin()
{
  this.el = document.createElement('yu');
  this.el.id = "ronin";

  this.keyboard = new Keyboard();
  this.commander = new Commander();
  this.cursor = new Cursor();
  this.hint = new Hint();
  this.docs = new Docs();

  this.grid = new Grid();
  this.guide = new Guide();
  this.render = new Render();
  this.preview = new Preview();

  this.io = new IO();
  this.brush = new Brush();
  this.frame = new Frame();
  this.line = new Line();
  this.path = new Path();
  this.magnet = new Magnet();
  this.filter = new Filter();
  this.type = new Type();

  this.layers = {
    grid : this.grid,
    guide : this.guide,
    render : this.render,
    cursor : this.cursor,
    preview : this.preview,
  };

  this.modules = {
    brush : this.brush,
    frame : this.frame,
    line : this.line,
    io : this.io,
    path : this.path,
    magnet : this.magnet,
    filter : this.filter,
    type : this.type
  };
  
  this.install = function()
  {
    document.body.appendChild(this.el);

    this.frame.width = window.innerWidth;
    this.frame.height = window.innerHeight;

    this.grid.install();
    this.guide.install();
    this.render.install();
    this.preview.install();
    this.cursor.install();

    this.commander.install();
    this.hint.install();

    this.start();
  }

  this.start = function()
  {
    window.addEventListener('dragover', ronin.io.drag_over);
    window.addEventListener('drop', ronin.io.drop);
    ronin.cursor.el.addEventListener('mousedown', ronin.cursor.mouse_down);
    ronin.cursor.el.addEventListener('mousemove', ronin.cursor.mouse_move);
    ronin.cursor.el.addEventListener('mouseup', ronin.cursor.mouse_up);
    window.addEventListener('keydown', ronin.keyboard.key_down);
    ronin.commander.input_el.addEventListener('input', ronin.commander.on_input);

    console.log("Ronin","Started");
    this.render.update();
    this.grid.update();
    this.guide.update();
    this.cursor.update();
    this.preview.update();
    this.commander.update();
  }
}