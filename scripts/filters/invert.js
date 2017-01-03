function Filter_Invert()
{
  Filter.call(this);
  this.parameters = [Angle];

  this.render = function(cmd)
  {
    var imageObj = new Image();
    imageObj.src = ronin.surface.active_layer.element.toDataURL('image/png');

    var context = ronin.surface.active_layer.context();

    var imageData = context.getImageData(0, 0, imageObj.width * 2, imageObj.height* 2);
    var data = imageData.data;

    for(var i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }

    ronin.surface.active_layer.clear();
    context.putImageData(imageData, 0, 0);
  }
  
}