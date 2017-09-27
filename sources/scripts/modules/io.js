function IO()
{
  Module.call(this,"io");

  this.settings = {rect:"25,25|200x200"};

  this.methods = {};

  this.methods.import = function(q)
  {
    var filepath = dialog.showOpenDialog({properties: ['openFile']});

    if(!filepath){ console.log("Nothing to load"); return; }

    fs.readFile(filepath[0], 'utf-8', (err, data) => {
      if(err){ alert("An error ocurred reading the file :" + err.message); return; }
      
      var img = new Image();
      img.src = filepath[0];
        
      img.onload = function() {
        ronin.io.draw_image(img);
      }
    });
  }

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

    console.log(file);

    if (!file.type.match(/image.*/)) { console.log("Not image"); return false; }

    var reader = new FileReader();
    
    reader.onload = function(event)
    {
      ronin.io.inject(event.target.result);
    }
    reader.readAsDataURL(file);
  }

  this.inject = function(data_url)
  {  

    var width = parseInt(img.naturalWidth * 0.5);
    var height = parseInt(img.naturalHeight * 0.5);

    if(height > 900){
      width *= 0.5;
      height *= 0.5;
    }

    img.onload = function() {
      ronin.render.context().drawImage(img, 0,0,width * 2,height * 2);
    }
  }

  this.draw_image = function(img)
  {
    var width = parseInt(img.naturalWidth * 0.5);
    var height = parseInt(img.naturalHeight * 0.5);

    if(height > 900){
      width *= 0.5;
      height *= 0.5;
    }

    console.log(width,height);
    ronin.render.context().drawImage(img, 0,0,width * 2,height * 2);    
  }
}