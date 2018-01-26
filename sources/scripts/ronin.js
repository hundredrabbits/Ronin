function Ronin()
{
  this.el = document.createElement('yu');
  this.el.id = "ronin";

  this.controller = new Controller();

  this.keyboard = new Keyboard();
  this.commander = new Commander();
  this.cursor = new Cursor();
  this.hint = new Hint();
  this.docs = new Docs();

  this.guide = new Guide();
  this.above = new Layer("above");
  this.below = new Layer("below");

  this.io = new IO();
  this.brush = new Brush();
  this.frame = new Frame();
  this.path = new Path();
  this.filter = new Filter();
  this.type = new Type();

  this.layers = {
    guide : this.guide,
    above : this.above,
    below : this.below,
    cursor : this.cursor,
    guide : this.guide,
  };

  this.modules = {
    brush : this.brush,
    frame : this.frame,
    io : this.io,
    path : this.path,
    filter : this.filter,
    type : this.type
  };
  
  this.install = function()
  {
    document.body.appendChild(this.el);

    this.frame.width = window.innerWidth;
    this.frame.height = window.innerHeight;

    this.commander.install();
    this.frame.install();

    this.cursor.target = this.layers.above;

    // this.guide.install();
    this.above.install();
    this.below.install();
    this.cursor.install();
    this.guide.install();

    this.guide.update();

    this.hint.install();

    this.start();
  }

  this.start = function()
  {
    this.controller.add("default","*","About",() => { require('electron').shell.openExternal('https://github.com/hundredrabbits/Ronin'); },"CmdOrCtrl+,");
    this.controller.add("default","*","Fullscreen",() => { app.toggle_fullscreen(); },"CmdOrCtrl+Enter");
    this.controller.add("default","*","Hide",() => { app.toggle_visible(); },"CmdOrCtrl+H");
    this.controller.add("default","*","Inspect",() => { app.inspect(); },"CmdOrCtrl+.");
    this.controller.add("default","*","Documentation",() => { ronin.controller.docs(); },"CmdOrCtrl+Esc");
    this.controller.add("default","*","Reset",() => { ronin.reset(); },"CmdOrCtrl+Backspace");
    this.controller.add("default","*","Quit",() => { app.exit(); },"CmdOrCtrl+Q");

    this.controller.add("default","File","New Image",() => { ronin.frame.methods.new.run(); },"CmdOrCtrl+N");
    this.controller.add("default","File","Open Image",() => { ronin.io.methods.open.run(); },"CmdOrCtrl+O");
    this.controller.add("default","File","Import Image",() => { ronin.io.methods.load.run(); },"CmdOrCtrl+I");
    this.controller.add("default","File","Render Image(PNG)",() => { ronin.io.methods.render.run(); },"CmdOrCtrl+R");
    this.controller.add("default","File","Save Images(PNGs)",() => { ronin.io.methods.save.run(); },"CmdOrCtrl+S");
    this.controller.add("default","File","Export Image(JPG)",() => { ronin.io.methods.export.run(); },"CmdOrCtrl+E");

    this.controller.add("default","Layers","Above Layer",() => { ronin.cursor.select_layer(ronin.layers.above); },"c");
    this.controller.add("default","Layers","Below Layer",() => { ronin.cursor.select_layer(ronin.layers.below); },"z");
    this.controller.add("default","Layers","Toggle Layer",() => { ronin.cursor.swap_layer(); },"x");

    this.controller.add("default","Brush","Inc Size",() => { ronin.brush.mod_size(1); },"]");
    this.controller.add("default","Brush","Dec Size",() => { ronin.brush.mod_size(-1); },"[");
    this.controller.add("default","Brush","Toggle Color",() => { ronin.cursor.swap_colors(); },"x");

    this.controller.add("default","Commander","Show",() => { ronin.commander.activate(); },"`");
    this.controller.add("default","Commander","Hide",() => { ronin.commander.deactivate(); },"Escape");
    this.controller.add("default","Commander","Fill With $",() => { ronin.commander.inject("fill:$"); },"CmdOrCtrl+F");

    this.controller.add("default","View","Zoom Reset",() => { ronin.frame.methods.zoom.run(1); },"1");
    this.controller.add("default","View","Zoom 2x",() => { ronin.frame.methods.zoom.run(2); },"2");
    this.controller.add("default","View","Zoom 4x",() => { ronin.frame.methods.zoom.run(4); },"3");
    this.controller.add("default","View","Toggle Guide",() => { ronin.guide.toggle(); },"h");

    this.controller.commit();

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
    this.guide.update();
    this.cursor.update();
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