function Layer(name)
{
  this.name = name;
  this.el = document.createElement('canvas');
  this.el.id = name;
  this.el.className = "layer";

  this.install = function()
  {
    ronin.el.appendChild(this.el);
  }

  this.update = function()
  {
    this.el.width = window.innerWidth * 2;
    this.el.height = window.innerHeight * 2;
    this.el.style.width = (window.innerWidth)+"px";
    this.el.style.height = (window.innerHeight)+"px";
  }

  this.context = function()
  {
    return this.el.getContext('2d');
  }

  this.resize_to = function(size)
  {
    this.el.width = size.width * 2;
    this.el.height = size.height * 2;
    this.el.style.width = size.width+"px";
    this.el.style.height = size.height+"px";
  }

  this.select = function(x = 0,y = 0,width = ronin.frame.width,height = ronin.frame.width)
  {
    return this.context().getImageData(x, y, width * 2, height * 2);
  }

  this.to_base64 = function(format = 'png', quality = 0.9)
  {
    return format == 'png' ? this.el.toDataURL('image/png') : this.el.toDataURL('image/jpeg',0.9);
  }

  this.to_img = function()
  {
    var img = new Image();
    img.src = this.to_base64();
    return img;
  }

  this.clear = function()
  {
    this.context().clearRect(0, 0, this.el.width * 2, this.el.height * 2);
  }

  this.fill = function(color = "red")
  {
    var ctx = this.context();

    ctx.beginPath();
    ctx.globalCompositeOperation="source-over";
    ctx.moveTo(0,0);
    ctx.lineTo(this.el.width,0);
    ctx.lineTo(this.el.width,this.el.height);
    ctx.lineTo(0,this.el.height);
    ctx.lineTo(0,0);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  this.zoom = function(zoom)
  {
    this.el.style.width = (ronin.frame.width * ronin.frame.zoom.scale)+"px";
    this.el.style.height = (ronin.frame.height * ronin.frame.zoom.scale)+"px";

    // Clamp
    if(zoom.offset.x > 0){ zoom.offset.x = 0; }
    if(zoom.offset.y > 0){ zoom.offset.y = 0; }

    this.el.style.left = zoom.offset.x+"px"; 
    this.el.style.top = zoom.offset.y+"px"; 
  }
}