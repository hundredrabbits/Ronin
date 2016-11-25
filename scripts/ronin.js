function Ronin()
{
  this.modules  = {};
  
  this.hint     = new Hint();
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
}