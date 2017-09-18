function Filter_Grey()
{
  Filter.call(this);

  this.parameters = [Color];
  
  this.render = function(params)
  {
    var color = params.color() ? params.color().floats() : new Color("#36ba0e").floats();
    var originalData = ronin.frame.context().getImageData(0, 0, ronin.frame.size.width*2, ronin.frame.size.height*2);
    var data = originalData.data;

    for(var i = 0; i < data.length; i += 4) {
      var r = data[i];
      var g = data[i+1];
      var b = data[i+2];
      var v = color.r*r + color.g*g + color.b*b;
      data[i] = data[i+1] = data[i+2] = v
    }
    ronin.frame.context().putImageData(originalData, 0, 0);
  }
}