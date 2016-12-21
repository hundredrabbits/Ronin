function Ronin()
{
  this.modules  = {};
  
  this.widget   = new Widget();
  
  this.canvas   = new Canvas("@");
  this.overlay  = new Overlay("|");
  this.brush    = new Brush(">");
  this.fileload = new FileLoad("/");
  this.filesave = new FileSave("$");
  this.filter   = new Filter("%");
  this.stroke   = new Stroke("_");
  this.vector   = new Vector("+");
  this.help     = new Help("?");
  this.history  = new History("^");
  this.eraser   = new Eraser(".");
  this.planner  = new Planner("*");
  this.surface  = new Surface("#");
  
  this.cursor   = new Cursor();
  
  this.modules[this.canvas.rune] = this.canvas;
  this.modules[this.overlay.rune] = this.overlay;
  this.modules[this.brush.rune] = this.brush;
  this.modules[this.fileload.rune] = this.fileload;
  this.modules[this.filesave.rune] = this.filesave;
  this.modules[this.filter.rune] = this.filter;
  this.modules[this.stroke.rune] = this.stroke;
  this.modules[this.vector.rune] = this.vector;
  this.modules[this.help.rune] = this.help;
  this.modules[this.history.rune] = this.history;
  this.modules[this.eraser.rune] = this.eraser;
  this.modules[this.planner.rune] = this.planner;
  this.modules[this.surface.rune] = this.surface;
  
  this.cursors = [];
  
  this.position_in_canvas = function(e)
  {
    var x = e.clientX - parseFloat(ronin.surface.element.style.left) - parseFloat(ronin.canvas.element.style.left);
    var y = e.clientY- parseFloat(ronin.surface.element.style.top) - parseFloat(ronin.canvas.element.style.top);
    return new Position(x+","+y);
  }
  
  this.position_in_window = function(p)
  {
    return new Position(p.x + parseFloat(ronin.surface.element.style.left) + parseFloat(ronin.canvas.element.style.left),p.y + parseFloat(ronin.surface.element.style.top) + parseFloat(ronin.canvas.element.style.top));
  }
  
  this.timestamp = function()
  {
    var currentdate = new Date();
    var date = currentdate.getFullYear()+""+(currentdate.getMonth()+1)+""+currentdate.getDate();
    return date+" "+currentdate.getHours()+":"+currentdate.getMinutes()+":"+currentdate.getSeconds();
  }
}