function IO()
{
  Module.call(this,"io","File import/export tools.");
  
  this.image = null;

  this.methods.open = new Method("open","browser","Press enter to open the file browser.",function(q){
    var filepath = q ? [q] : dialog.showOpenDialog({properties: ['openFile']});

    if(!filepath){ console.log("Nothing to load"); return; }

    fs.readFile(filepath[0], 'utf-8', (err, data) => {
      if(err){ alert("An error ocurred reading the file :" + err.message); return; }
      var img = new Image();
      img.src = filepath[0];
      img.onload = function() {
        var width = parseInt(img.naturalWidth * 0.5);
        var height = parseInt(img.naturalHeight * 0.5);
        ronin.frame.resize_to({width:width,height:height});
        ronin.io.draw_image(ronin.cursor.target.context(),img,{x:0,y:0,width:width,height:height});
      }
    });
  })

  this.methods.load = new Method("load","browser","Press enter to open the file browser.",function(q){
    var filepath = q ? [q] : dialog.showOpenDialog({properties: ['openFile']});

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
  });

  this.methods.render = new Method("render","png","Export canvas.",function(q){
    var ext = "png";
    var fs = require('fs');
    var data = ronin.io.render().to_base64(ext).replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');

    dialog.showSaveDialog((fileName) => {
      if (fileName === undefined){ return; }
      fs.writeFile(fileName+'.'+ext, buf);
    }); 
  });

  this.methods.export = new Method("render","jpg","Export canvas.",function(q){
    var ext = "jpg";
    var fs = require('fs');
    var data = ronin.io.render(ronin.frame.background).to_base64(ext).replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');

    dialog.showSaveDialog((fileName) => {
      if (fileName === undefined){ return; }
      fs.writeFile(fileName+'.'+ext, buf);
    }); 
  });

  this.methods.draw = new Method("draw","X,Y|WxH","Draw the loaded image pixels.",function(q){
    if(!ronin.io.image){ return; }

    ronin.io.draw_image(ronin.cursor.target.context(),ronin.io.image,ronin.commander.query().methods.draw);
    ronin.io.image = null;
  });
  
  // this.preview = function(q)
  // {
  //   ronin.preview.clear();

  //   if(ronin.commander.query().methods.draw && this.image){
  //     this.draw_image(ronin.preview.context(),this.image,ronin.commander.query().methods.draw);  
  //   }
  // }

  this.render = function(fill = null)
  {
    var export_layer = new Layer();

    export_layer.el.width = ronin.frame.width * 2;
    export_layer.el.height = ronin.frame.height * 2;

    if(fill){
      export_layer.fill(fill);
    }
    export_layer.context().drawImage(ronin.layers.below.el,0,0)
    export_layer.context().drawImage(ronin.layers.above.el,0,0)
    return export_layer;
  }

  this.draw_image = function(ctx,img,params)
  {
    var width = parseInt(img.naturalWidth * 0.5);
    var height = parseInt(img.naturalHeight * 0.5);

    var scale = params.width > params.height ? (params.width/width) * 2 : (params.height/height) * 2;

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
  var path = file.path ? file.path : file.name;

  if(path.substr(-4,4) == ".thm"){ return; }
  
  if (file.type && !file.type.match(/image.*/)) { console.log("Not image", file.type); return false; }

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