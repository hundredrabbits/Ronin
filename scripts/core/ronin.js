function Ronin()
{
  this.modules  = {};
  this.element  = null;  
  
  this.default  = new Default("`");

  this.frame    = new Frame("@");
  this.path     = new Path("+");
  this.type     = new Type("&");
  this.brush    = new Brush("-");

  this.source   = new Source("$");
  
  this.eye      = new Eye("*");
  this.render   = new Render("%");
  this.magnet   = new Magnet("^");

  this.overlay  = new Overlay("|");
  this.terminal = new Terminal(">");
  this.cursor   = new Cursor(".");
  this.widget   = new Widget("?");
  
  this.modules[this.frame.name]    = this.frame;
  this.modules[this.type.name]     = this.type;
  this.modules[this.path.name]     = this.path;

  this.modules[this.brush.name]    = this.brush;

  this.modules[this.source.name]   = this.source;
  this.modules[this.render.name]   = this.render;
  // this.modules[this.eye.constructor.name]      = this.eye;
  this.modules[this.magnet.name]   = this.magnet;

  this.modules[this.cursor.name]   = this.cursor;
  this.modules[this.terminal.name] = this.terminal;

  // 

  this.install = function()
  {
    for(var key in this.modules){
      this.modules[key].install();
    }

    // this.terminal.install();
    this.widget.install();
  }

  this.start = function()
  {
    ronin.terminal.update();
    ronin.widget.update();
    ronin.terminal.input.focus();
  }
  
  this.cursors = [];
  
  this.position_in_canvas = function(e)
  {
    var x = e.clientX;
    var y = e.clientY;
    // Canvas Size
    x += (-window.innerWidth/2) + (parseInt(this.frame.element.style.width)/2);
    y += (-window.innerHeight/2) + (parseInt(this.frame.element.style.height)/2);
    return new Position(x,y);
  }
  
  this.position_in_window = function(p)
  {
    return new Position(p.x + parseInt(this.frame.element.style.marginLeft),p.y + parseInt(this.frame.element.style.marginTop));
  }
  
  this.timestamp = function()
  {
    var currentdate = new Date();
    var date = currentdate.getFullYear()+""+(currentdate.getMonth()+1)+""+currentdate.getDate();
    return date+" "+currentdate.getHours()+":"+currentdate.getMinutes()+":"+currentdate.getSeconds();
  }

  this.on_resize = function()
  {
  }
}