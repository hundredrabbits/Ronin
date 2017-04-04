function Filter_Sharpen()
{
  Filter.call(this);
  
  this.parameters = [Value];

  this.render = function(cmd)
  {
    var imageObj = new Image();
    imageObj.src = ronin.frame.active_layer.element.toDataURL('image/png');

    var w = ronin.frame.settings["size"].width;
    var h = ronin.frame.settings["size"].height;
    var context = ronin.frame.context();

    var originalData = context.getImageData(0, 0, w*2, h*2);
    var data = originalData.data;
    var newImage = context.getImageData(0, 0, w*2, h*2);

    var strenght = cmd.value() ? cmd.value().float : 1;

    var weight_map = [ 
       -2 * strenght, 0 * strenght,  -2 * strenght,
      0 * strenght, 17 * strenght, 0 * strenght,
       -2 * strenght, 0 * strenght,  -2 * strenght
    ];

    for(var i = 0; i < data.length; i += 4) {
      var p = i / 4;
      var x = (p % originalData.width);
      var y = parseInt(p/originalData.width);

      var average = this.get_neighbors_average(originalData,x,y,weight_map);
      newImage.data[i] = parseInt(average.r);
      newImage.data[i+1] = parseInt(average.g);
      newImage.data[i+2] = parseInt(average.b);
    }

    ronin.frame.active_layer.clear();
    context.putImageData(newImage, 0, 0);
  }

  this.preview = function(cmd)
  {
    
  }

  this.draw = function(context = this.context(), value, position)
  {
    
  }

}
