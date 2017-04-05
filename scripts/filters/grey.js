function Filter_Grey()
{
  Filter.call(this);

  this.parameters = [Color];
  
  this.render = function(cmd)
  {
    if(cmd.color() && cmd.color().rgb()){
      this.draw(ronin.frame.context(),cmd.color().rgb());
    }
    else{
      this.draw(ronin.frame.context());
    }
  }

  this.preview = function(cmd)
  {
    if(cmd.color() && cmd.color().rgb()){
      this.draw(ronin.render.layer.context(),cmd.color().rgb());
    }
    else{
      this.draw(ronin.render.layer.context());
    }
  }

  this.draw = function(context = this.context(), color_rgb = new Color("#36ba0e").rgb())
  {
    var imageObj = new Image();
    imageObj.src = ronin.frame.active_layer.element.toDataURL('image/png');

    var w = ronin.frame.settings["size"].width;
    var h = ronin.frame.settings["size"].height;

    var originalData = ronin.frame.context().getImageData(0, 0, w*2, h*2);
    var data = originalData.data;

    var _r = (color_rgb.r / 255);
    var _g = (color_rgb.g / 255);
    var _b = (color_rgb.b / 255);

    for(var i = 0; i < data.length; i += 4) {
      var r = data[i];
      var g = data[i+1];
      var b = data[i+2];
      var v = _r*r + _g*g + _b*b;
      data[i] = data[i+1] = data[i+2] = v
    }

    ronin.render.layer.clear();
    context.putImageData(originalData, 0, 0);
  }
}