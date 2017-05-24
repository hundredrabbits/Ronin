function Filter_Saturate()
{
  Filter.call(this);

  this.parameters = [Color];
  
  this.render = function(params)
  {
    var color = params.color() ? params.color().floats() : new Color("#999999").floats();
    var originalData = ronin.frame.context().getImageData(0, 0, ronin.frame.size.width*2, ronin.frame.size.height*2);
    var data = originalData.data;

    for(var i = 0; i < data.length; i += 4) {
      var average = parseFloat(data[i] + data[i+1] + data[i+2])/3;
      data[i]     = (average+(data[i]*color.r))/2;
      data[i + 1] = (average+(data[i+1]*color.g))/2;
      data[i + 2] = (average+(data[i+2]*color.b))/2;
    }

    ronin.frame.context().putImageData(originalData, 0, 0);
  }
}