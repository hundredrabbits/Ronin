function Ronin()
{
  this.element = null;
  
  this.load_image = function(p)
  {
    base_image = new Image();
    base_image.src = p[0]; // media/logo.png
    base_image.onload = function(){
      
      var rec_w = parseFloat(p[3]);
      var rec_h = parseFloat(p[4]);
      var pos_x = parseFloat(p[1]);
      var pos_y = parseFloat(p[2]);
      
      pos_x = pos_x < 0 ? canvas.width - Math.abs(pos_x) - rec_w : pos_x;
      pos_y = pos_y < 0 ? canvas.height - Math.abs(pos_y) - rec_h : pos_y;

      context.drawImage(base_image, pos_x, pos_y, rec_w, rec_h);
    }
    this.draw_guides();
  }
  
  this.fill = function(p)
  {
    cvSave = canvas.toDataURL("image/png");
    
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#"+p[0];
    context.fill();
    
    var imgObj = new Image();
    imgObj.src = cvSave;

    context.drawImage(imgObj,0,0);
  }
  
  // Guides
  
  this.guides_element = null;
  this.guides_context = null;
  this.guides = [];
  
  this.clear_guides = function()
  {
    this.guides = [];
    this.draw_guides();
  }
  
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
    this.draw_guides();
    
    var x = p[0] ? p[0] : 0 ;
    var y = p[1] ? p[1] : 0 ;
    var w = p[2] ? p[2] : 0 ;
    var h = p[3] ? p[3] : 0 ;
    
    if(x < -10 && w === 0 && h === 0){
      x = Math.abs(x);
      for (i = 0; i < canvas.width/x; i++) {
        var g = new Guide(new Position(x * i,y), new Rect(w,h), new Color('ff0000'));
        g.draw(this.guides_context);
      }
    }
    else if(y < -10 && w === 0 && h === 0){
      y = Math.abs(y);
      for (i = 0; i < canvas.width/y; i++) {
        var g = new Guide(new Position(x,y* i), new Rect(w,h), new Color('ff0000'));
        g.draw(this.guides_context);
      }
    }
    else{
      var g = new Guide(new Position(x,y), new Rect(w,h), new Color('ff0000'));
      g.draw(this.guides_context);
      return g;
    }
  }
  
  this.add_guide = function(p)
  {
    if(p[0] == "?"){ this.guides = []; this.draw_guides(); return; }
    var x = p[0] ? p[0] : 0 ;
    var y = p[1] ? p[1] : 0 ;
    var w = p[2] ? p[2] : 0 ;
    var h = p[3] ? p[3] : 0 ;
    
    if(x < -10 && w === 0 && h === 0){
      x = Math.abs(x);
      for (i = 0; i < canvas.width/x; i++) {
        var g = new Guide(new Position(x * i,y), new Rect(w,h), new Color('000000'));
        this.guides.push(g);
      }
    }
    else if(y < -10 && w === 0 && h === 0){
      y = Math.abs(y);
      for (i = 0; i < canvas.width/y; i++) {
        var g = new Guide(new Position(x,y* i), new Rect(w,h), new Color('000000'));
        this.guides.push(g);
      }
    }
    else{
      var g = new Guide(new Position(x,y), new Rect(w,h), new Color('000000'));
      this.guides.push(g);
    }
    
    this.draw_guides();
  }
}