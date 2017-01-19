function Filter_Invert()
{
  Filter.call(this);
  this.parameters = [];

  this.render = function(cmd)
  {
    var imageObj = new Image();
    imageObj.src = ronin.surface.active_layer.element.toDataURL('image/png');

    var w = ronin.surface.size.width;
    var h = ronin.surface.size.height;
    var context = ronin.surface.active_layer.context();

    var originalData = context.getImageData(0, 0, w*2, h*2);
    var data = originalData.data;

    for(var i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }

    ronin.surface.active_layer.clear();
    context.putImageData(originalData, 0, 0);
  }
}