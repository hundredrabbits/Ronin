function Layer(name)
{
  this.name = name;
  this.element = document.createElement("canvas");
  this.element.setAttribute("id","_"+name);
  this.element.setAttribute("class","layer");

  this.resize = function(rect)
  {
    console.log("Resize "+this.name+" to "+rect.render());

    var canvas_pixels = this.element.toDataURL("image/png");
    var pixels_rect   = new Rect(this.element.width+"x"+this.element.height);
    
    this.element.width = rect.width * 2;
    this.element.height = rect.height * 2;
    this.element.style.width = rect.width+"px";
    this.element.style.height = rect.height+"px";

    this.context().scale(2,2);
    
    // base_image = new Image();
    // base_image.src = canvas_pixels;
    
    // ronin.surface.context().drawImage(base_image, -position.x, -position.y, pixels_rect.width, pixels_rect.height);
    // ronin.surface.context().scale(2,2);
  }

  this.clear = function()
  {
    this.context().clearRect(0, 0, this.element.width, this.element.height);
  }

  this.context = function()
  {
    return this.element.getContext('2d');
  }
}