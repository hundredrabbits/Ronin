function IO()
{
  Module.call(this,"io","File import/export tools.");
  
  this.image = null;

  this.methods.load = new Method("load","browser","Press enter to open the file browser.",function(q){
    var filepath = q ? [q] : dialog.showOpenDialog({properties: ['openFile']});

    if(!filepath){ console.log("Nothing to load"); return; }

    console.log("Loaded",filepath)

    fs.readFile(filepath[0], 'utf-8', (err, data) => {
      if(err){ alert("An error ocurred reading the file :" + err.message); return; }
      var img = new Image();
      img.src = filepath[0];
      img.onload = function() {
        ronin.io.image = img;
        ronin.commander.inject("io draw:20,20|100x100");
      }
    });
  });

  this.methods.draw = new Method("draw","X,Y|WxH","Draw the loaded image pixels.",function(q){
    if(!ronin.io.image){ return; }

    ronin.io.draw_image(ronin.render.context(),ronin.io.image,ronin.commander.query().methods.draw);
    ronin.io.image = null;
    ronin.preview.clear();
  });
  
  this.methods.save = new Method("save","jpg/png","Export canvas.",function(q){
    var ext = q ? q : "jpg";
    var fs = require('fs');
    var data = ronin.render.to_base64(ext).replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');

    dialog.showSaveDialog((fileName) => {
      if (fileName === undefined){ return; }
      fs.writeFile(fileName+'.'+ext, buf);
    }); 
  });

  this.preview = function(q)
  {
    ronin.preview.clear();

    if(ronin.commander.query().methods.draw && this.image){
      this.draw_image(ronin.preview.context(),this.image,ronin.commander.query().methods.draw);  
    }
  }

  this.draw_image = function(ctx = ronin.preview.context(),img,params)
  {
    var width = parseInt(img.naturalWidth * 0.5);
    var height = parseInt(img.naturalHeight * 0.5);
    var scale = (params.width/width) * 2;

    ctx.drawImage(img, params.x * 2,params.y * 2,width * scale,height * scale);    
  }
}

window.addEventListener('dragover',function(e)
{
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});

window.addEventListener('drop', function(e)
{
  e.stopPropagation();
  e.preventDefault();

  var files = e.dataTransfer.files;
  var file = files[0];

  if (file.type && !file.type.match(/image.*/)) { console.log("Not image", file.type); return false; }

  var path = file.path ? file.path : file.name;
  var reader = new FileReader();

  reader.onload = function(event)
  {
    var img = new Image();
    img.src = event.target.result;
    ronin.io.image = img;
    ronin.commander.inject("io draw:20,20|100x100");
  }
  reader.readAsDataURL(file);
});