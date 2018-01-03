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
  this.above = new Layer("above");
  this.below = new Layer("below");
  this.preview = new Preview();

  this.io = new IO();
  this.brush = new Brush();
  this.frame = new Frame();
  this.path = new Path();
  this.magnet = new Magnet();
  this.filter = new Filter();
  this.type = new Type();

  this.layers = {
    grid : this.grid,
    guide : this.guide,
    above : this.above,
    below : this.below,
    cursor : this.cursor,
    preview : this.preview,
  };

  this.modules = {
    brush : this.brush,
    frame : this.frame,
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

    this.cursor.target = this.layers.above;

    this.grid.install();
    this.guide.install();
    this.above.install();
    this.below.install();
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
    ronin.cursor.el.addEventListener('contextmenu', ronin.cursor.mouse_alt);
    window.addEventListener('keydown', ronin.keyboard.key_down);
    window.addEventListener('keyup', ronin.keyboard.key_up);
    ronin.commander.input_el.addEventListener('input', ronin.commander.on_input);

    console.log("Ronin","Started");
    this.above.update();
    this.below.update();
    this.grid.update();
    this.guide.update();
    this.cursor.update();
    this.preview.update();
    this.commander.update();

    this.frame.resize_to({width:930,height:540});

    this.load();
  }

  this.load = function(content = this.default())
  {

  }

  this.default = function()
  {
    return "select_layer:below ; fill:#fff ; select_layer:above ; add_cursor:1,1 ; add_cursor:-1,-1"
  }
}