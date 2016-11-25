function Ronin()
{
  this.modules  = {};
  
  this.hint     = new Hint();
  this.widget   = new Widget();
  this.surface  = null;
  
  this.canvas   = new Canvas();
  this.overlay  = new Overlay();
  this.brush    = new Brush();
  this.file     = new File();
  this.filter   = new Filter();
  this.stroke   = new Stroke();
  this.vector   = new Vector();
  
  this.modules["@"] = this.canvas;
  this.modules["|"] = this.overlay;
  this.modules[">"] = this.brush;
  this.modules["/"] = this.file;
  this.modules[":"] = this.filter;
  this.modules["-"] = this.stroke;
  this.modules["+"] = this.vector;
  
  // Drag
  
  this.drag_from = null;
  
  this.drag_start = function(e)
  {
    this.drag_from = new Position(e.clientX,e.clientY);
  }
  
  this.drag = function(e)
  {
    if(e.which != 2){ return; }
    
    var offset_x = this.drag_from.x - e.clientX;
    this.surface.style.left = this.surface.style.left ? parseInt(this.surface.style.left) - offset_x : offset_x;
    var offset_y = this.drag_from.y - e.clientY;
    this.surface.style.top = this.surface.style.top ? parseInt(this.surface.style.top) - offset_y : offset_y;
    this.drag_from = new Position(e.clientX,e.clientY);
  }
  
  this.drag_stop = function(e)
  {
    this.drag_from = null;
  }
}