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
  
  this.modules[this.frame.constructor.name]    = this.frame;
  this.modules[this.type.constructor.name]     = this.type;
  this.modules[this.path.constructor.name]     = this.path;

  this.modules[this.brush.constructor.name]    = this.brush;

  this.modules[this.source.constructor.name]   = this.source;
  this.modules[this.render.constructor.name]   = this.render;
  // this.modules[this.eye.constructor.name]      = this.eye;
  // this.modules[this.magnet.constructor.name]   = this.magnet;

  this.modules[this.cursor.constructor.name]   = this.cursor;
  this.modules[this.terminal.constructor.name] = this.terminal;

  // 

  this.install = function()
  {
    for(var key in this.modules){
      this.modules[key].install();
    }

    this.terminal.install();
  }
  
  this.cursors = [];
  
  this.position_in_canvas = function(e)
  {
    var x = e.clientX;
    x -= (window.innerWidth - this.frame.settings["size"].width)/2;
    x -= parseInt(this.frame.element.style.marginLeft) + (this.frame.settings["size"].width/2);
    var y = e.clientY;
    y -= (window.innerHeight - this.frame.settings["size"].height)/2;
    y -= parseInt(this.frame.element.style.marginTop) + parseInt(this.frame.settings["size"].height/2);
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