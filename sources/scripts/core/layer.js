function Layer(name)
{
  this.name = name;
  this.el = document.createElement('canvas');
  this.el.id = name;
  this.el.className = "layer";

  this.install = function()
  {
    ronin.frame.el.appendChild(this.el);
  }

  this.update = function(zoom = {scale:1,offset:{x:0,y:0}})
  {
  }

  this.context = function()
  {
    return this.el.getContext('2d');
  }

  this.resize_to = function(size)
  {
    console.log(`Resized ${this.name}`);
    this.el.width = ronin.frame.width * 2;
    this.el.height = ronin.frame.height * 2;
    this.update();
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

  this.zoom = function(zoom = {scale:1,offset:{x:0,y:0}})
  {
    this.update(zoom);
  }
}