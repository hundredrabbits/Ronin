function Filter_Balance()
{
  Filter.call(this);
  
  this.parameters = [Color];

  this.render = function(cmd)
  {
    if(!cmd.color()){ return; }
    if(!cmd.color().rgb()){ return; }

    this.draw(ronin.frame.context(),cmd.color().rgb());
  }

  this.preview = function(cmd)
  {
    if(!cmd.color()){ return; }
    if(!cmd.color().rgb()){ return; }

    this.draw(ronin.render.layer.context(),cmd.color().rgb());
  }

  this.draw = function(context = this.context(), color_rgb)
  {
    var imageObj = new Image();
    imageObj.src = ronin.frame.active_layer.element.toDataURL('image/png');

    var w = ronin.frame.settings["size"].width;
    var h = ronin.frame.settings["size"].height;

    var originalData = ronin.frame.context().getImageData(0, 0, w*2, h*2);
    var data = originalData.data;

    var r = (color_rgb.r / 255) + 0.5;
    var g = (color_rgb.g / 255) + 0.5;
    var b = (color_rgb.b / 255) + 0.5;

    for(var i = 0; i < data.length; i += 4) {
      data[i]     = data[i] * r;
      data[i + 1] = data[i + 1] * g;
      data[i + 2] = data[i + 2] * b;
    }

    ronin.render.layer.clear();
    context.putImageData(originalData, 0, 0);
  }
}