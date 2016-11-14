function Ronin()
{
  this.element = null;
  this.canvas  = new Canvas();
  this.overlay = new Overlay();
  this.brush   = new Brush();
  this.file   = new File();
  
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
}