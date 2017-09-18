function Filter_Contrast()
{
  Filter.call(this);

  this.parameters = [Value];
  
  this.render = function(params)
  {
    var color = params.color() ? params.color().floats() : new Color("#999999").floats();
    var originalData = ronin.frame.context().getImageData(0, 0, ronin.frame.size.width*2, ronin.frame.size.height*2);
    var data = originalData.data;

    for(var i = 0; i < data.length; i += 4) {
      var average = parseFloat(data[i] + data[i+1] + data[i+2])/3;
      var distance = 50;
      data[i]     = data[i] + distance;
      data[i + 1] = data[i+1] + distance;
      data[i + 2] = data[i+2] + distance;
    }

    ronin.frame.context().putImageData(originalData, 0, 0);
  }
}