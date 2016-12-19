function Ronin()
{
  this.modules  = {};
  
  this.hint     = new Hint();
  this.widget   = new Widget();
  this.surface  = null;
  
  this.canvas   = new Canvas("@");
  this.overlay  = new Overlay("|");
  this.brush    = new Brush(">");
  this.fileload = new FileLoad("/");
  this.filesave = new FileSave("$");
  this.filter   = new Filter("%");
  this.stroke   = new Stroke("_");
  this.vector   = new Vector("+");
  this.help     = new Help("?");
  
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
  
  this.position_in_canvas = function(e)
  {
    return new Position(e.clientX - parseFloat(ronin.surface.style.left) - parseFloat(ronin.canvas.element.style.left),e.clientY- parseFloat(ronin.surface.style.top) - parseFloat(ronin.canvas.element.style.top));
  }
}