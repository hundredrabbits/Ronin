function Layer()
{
  this.el = document.createElement('canvas');

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

  this.select = function(x,y,width,height)
  {
    return this.context().getImageData(x, y, width * 2, height * 2);
  }

  this.to_data = function()
  {
    return this.el.toDataURL('image/png');
  }

  this.to_img = function()
  {
    var img = new Image();
    img.src = this.to_data();
    return img;
  }

  this.clear = function()
  {
    this.context().clearRect(0, 0, this.el.width * 2, this.el.height * 2);
  }
}