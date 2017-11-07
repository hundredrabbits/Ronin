function Filter()
{
  Module.call(this,"filter","Pixel filter");

  this.methods.balance = new Method("balance","#ff0033","Filter color balance.",function(q){
    var color = {r:1,g:0,b:0.5};
    var originalData = ronin.render.context().getImageData(0, 0, ronin.frame.settings.width*2, ronin.frame.settings.height*2);
    var data = originalData.data;

    for(var i = 0; i < data.length; i += 4) {
      data[i]     = data[i] * (color.r + 0.5);
      data[i + 1] = data[i + 1] * (color.g + 0.5);
      data[i + 2] = data[i + 2] * (color.b + 0.5);
    }

    ronin.preview.context().putImageData(originalData, 0, 0);
  });
}