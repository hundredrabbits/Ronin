function Ronin()
{
  this.element = null;
  this.canvas  = new Canvas();
  this.overlay = new Overlay();
  this.brush   = new Brush();
  this.file   = new File();
  
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