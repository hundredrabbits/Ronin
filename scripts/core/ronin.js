function Ronin()
{
  this.modules  = {};
  this.element  = null;  
  this.widget   = new Widget();
  
  this.surface  = new Surface("#");
  this.fileload = new FileLoad("/");
  this.filesave = new FileSave("$");
  this.history  = new History("^");
  this.overlay  = new Overlay("|");
  this.brush    = new Brush(">");
  this.eraser   = new Eraser(".");
  this.eye      = new Eye("*");
  this.filter   = new Filter("%");
  this.stroke   = new Stroke("_");
  this.vector   = new Vector("+");
  this.help     = new Help("?");
  this.typo     = new Typographe("&");
  
  this.cursor   = new Cursor();
  
  this.modules[this.surface.rune]  = this.surface;
  this.modules[this.fileload.rune] = this.fileload;
  this.modules[this.filesave.rune] = this.filesave;
  this.modules[this.history.rune]  = this.history;
  this.modules[this.overlay.rune]  = this.overlay;
  this.modules[this.filter.rune]   = this.filter;
  this.modules[this.brush.rune]    = this.brush;
  this.modules[this.eraser.rune]   = this.eraser;
  this.modules[this.eye.rune]      = this.eye;
  this.modules[this.typo.rune]     = this.typo;
  this.modules[this.stroke.rune]   = this.stroke;
  this.modules[this.vector.rune]   = this.vector;
  this.modules[this.help.rune]     = this.help;
  
  this.cursors = [];
  
  this.position_in_canvas = function(e)
  {
    var x = e.clientX;
    x -= (window.innerWidth - this.surface.size.width)/2;
    x -= parseInt(this.surface.element.style.marginLeft) + (this.surface.size.width/2);
    var y = e.clientY;
    y -= (window.innerHeight - this.surface.size.height)/2;
    y -= parseInt(this.surface.element.style.marginTop) + (this.surface.size.height/2);
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
}