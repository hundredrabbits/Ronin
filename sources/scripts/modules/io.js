function IO()
{
  Module.call(this,"io","File import/export tools.");

  this.settings = {anchor:{x:0,y:0,width:200,height:200}};

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
        ronin.io.draw_image(ronin.render.context(),img,ronin.commander.query());
      }
    });
  }

  this.image = null;

  this.methods.load = function(q)
  {
    var filepath = dialog.showOpenDialog({properties: ['openFile']});

    if(!filepath){ console.log("Nothing to load"); return; }

    fs.readFile(filepath[0], 'utf-8', (err, data) => {
      if(err){ alert("An error ocurred reading the file :" + err.message); return; }
      
      var img = new Image();
      img.src = filepath[0];

      img.onload = function() {
        ronin.io.image = img;
        ronin.commander.inject("io draw:20,20|100x100");
      }
    });
  }

  this.methods.draw = function(q)
  {
    ronin.io.draw_image(ronin.render.context(),ronin.io.image,ronin.commander.query().methods.draw);
    ronin.io.image = null;
    ronin.preview.clear();
  }
  
  this.methods.save = function(q)
  {
    // TODO
    ronin.io.render();
  }

  this.preview = function(q)
  {
    ronin.preview.clear();

    if(ronin.commander.query().methods.draw && this.image){
      this.draw_image(ronin.preview.context(),this.image,ronin.commander.query().methods.draw);  
    }
  }

  this.render = function()
  {
    var fs = require('fs');
    var data = ronin.render.to_base64('jpg').replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');

    dialog.showSaveDialog((fileName) => {
      if (fileName === undefined){ return; }
      fs.writeFile(fileName+'.jpg', buf);
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
      ronin.io.inject(event.target.result);
    }
    reader.readAsDataURL(file);
  }

  this.inject = function(data_url)
  {  
    var img = new Image();
    img.src = data_url;

    var width = parseInt(img.naturalWidth * 0.5);
    var height = parseInt(img.naturalHeight * 0.5);

    // if(height > 700){
    //   width *= 0.5;
    //   height *= 0.5;
    // }
    // if(height > 1400){
    //   width *= 0.25;
    //   height *= 0.25;
    // }

    ronin.frame.methods.resize({width:parseInt(width),height:parseInt(height)})

    img.onload = function() {
      ronin.render.context().drawImage(img, 0,0,width * 2,height * 2);
    }
  }

  this.draw_image = function(ctx = ronin.preview.context(),img,params)
  {
    var anchor = params ? params : ronin.io.settings.anchor;

    console.log("draw",ctx)
    var width = parseInt(img.naturalWidth * 0.5);
    var height = parseInt(img.naturalHeight * 0.5);
    var scale = (anchor.width/width) * 2;

    ctx.drawImage(img, anchor.x * 2,anchor.y * 2,width * scale,height * scale);    
  }
}