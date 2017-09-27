function IO()
{
  this.render = function()
  {
    var fs = require('fs');
    var data = ronin.render.to_data().replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');

    dialog.showSaveDialog((fileName) => {
      if (fileName === undefined){ return; }
      fs.writeFile(fileName+'.png', buf);
    }); 
  }

  this.drag_over = function(e)
  {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  this.drop = function(e)
  {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    var file = files[0];

    if (!file.type.match(/image.*/)) { console.log("Not image"); return false; }

    var reader = new FileReader();
    
    reader.onload = function(event)
    {
      base_image = new Image();
      base_image.src = event.target.result;

      var width = parseInt(base_image.naturalWidth * 0.5);
      var height = parseInt(base_image.naturalHeight * 0.5);

      if(height > 900){
        width *= 0.5;
        height *= 0.5;
      }

      ronin.frame.resize_to({width:width,height:height});
      ronin.render.context().drawImage(base_image, 0,0,width * 2,height * 2);
    }
    reader.readAsDataURL(file);
  }
}