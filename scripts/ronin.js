function Ronin()
{
  this.element = null;
  this.guides_element = null;
  this.guides_context = null;
  this.guides = [];
  
  this.draw_guides = function()
  {
    this.guides_context.clearRect(0, 0, canvas.width, canvas.height);
    
    for (i = 0; i < this.guides.length; i++) {
      this.guides[i].draw(this.guides_context);
    }
  }
  
  this.guide = function(p)
  {
    this.guides_context.clearRect(0, 0, canvas.width, canvas.height);
    
    var x = p[0] ? p[0] : 0 ;
    var y = p[1] ? p[1] : 0 ;
    var w = p[2] ? p[2] : 0 ;
    var h = p[3] ? p[3] : 0 ;
    
    var g = new Guide(new Position(x,y), new Rect(w,h), new Color('000000'));
    
    g.draw(this.guides_context);
  }
  
  this.add_guide = function(p)
  {
    var x = p[0] ? p[0] : 0 ;
    var y = p[1] ? p[1] : 0 ;
    var w = p[2] ? p[2] : 0 ;
    var h = p[3] ? p[3] : 0 ;
    
    var g = new Guide(new Position(x,y), new Rect(w,h), new Color('ff0000'));
    
    this.guides.push(g);
    this.draw_guides();
  }
}