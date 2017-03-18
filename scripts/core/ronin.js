function Ronin()
{
  this.modules  = {};
  this.element  = null;  
  
  this.default  = new Default("`");
  this.surface  = new Surface("@");
  this.fileload = new FileLoad("/");
  this.filesave = new FileSave("$");
  this.overlay  = new Overlay("|");
  this.brush    = new Brush("-");
  this.eye      = new Eye("*");
  this.render   = new Render("%");
  this.vector   = new Vector("+");
  this.typo     = new Typographe("&");
  this.cursor   = new Cursor(".");
  this.terminal = new Terminal(">");
  
  this.modules[this.surface.rune]  = this.surface;
  this.modules[this.fileload.rune] = this.fileload;
  this.modules[this.filesave.rune] = this.filesave;
  this.modules[this.render.rune]   = this.render;
  this.modules[this.brush.rune]    = this.brush;
  this.modules[this.eye.rune]      = this.eye;
  this.modules[this.typo.rune]     = this.typo;
  this.modules[this.vector.rune]   = this.vector;
  this.modules[this.terminal.rune] = this.terminal;
  this.modules[this.overlay.rune]  = this.overlay;

  this.modules[this.cursor.rune]   = this.cursor;

  // 

  this.install = function()
  {
    for(var key in this.modules){
      this.modules[key].install();
    }
  }
  
  this.cursors = [];
  
  this.position_in_canvas = function(e)
  {
    var x = e.clientX;
    x -= (window.innerWidth - this.surface.settings["size"].width)/2;
    x -= parseInt(this.surface.element.style.marginLeft) + (this.surface.settings["size"].width/2);
    var y = e.clientY;
    y -= (window.innerHeight - this.surface.settings["size"].height)/2;
    y -= parseInt(this.surface.element.style.marginTop) + parseInt(this.surface.settings["size"].height/2);
    return new Position(x,y);
  }
  
  this.position_in_window = function(p)
  {
    return new Position(p.x + parseInt(this.surface.element.style.marginLeft),p.y + parseInt(this.surface.element.style.marginTop));
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