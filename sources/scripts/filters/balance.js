function Filter_Balance()
{
  Filter.call(this);
  
  this.parameters = [Color];

  this.render = function(params)
  {
    var color = params.color() ? params.color().floats() : new Color("#999999").floats();
    var originalData = ronin.frame.context().getImageData(0, 0, ronin.frame.size.width*2, ronin.frame.size.height*2);
    var data = originalData.data;

    for(var i = 0; i < data.length; i += 4) {
      data[i]     = data[i] * (color.r + 0.5);
      data[i + 1] = data[i + 1] * (color.g + 0.5);
      data[i + 2] = data[i + 2] * (color.b + 0.5);
    }

    ronin.frame.context().putImageData(originalData, 0, 0);
  }
}