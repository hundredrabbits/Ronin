function Frame()
{
  Module.call(this,"frame","Manager for the canvas size");
  
  this.settings = {width:400,height:400};

  this.methods = {};

  this.methods.resize = new Method("resize","WxH");

  this.methods.resize.run = function(q)
  {
    var data = ronin.render.select(0,0,ronin.frame.settings.width,ronin.frame.settings.height);

    ronin.render.clear();
    ronin.frame.resize_to(q);
    ronin.render.context().putImageData(data, 0, 0);
  }

  this.methods.rescale = new Method("rescale","X,Y|WxH");

  this.methods.rescale.run = function(p)
  {
    // Create a canvas copy
    var copy_canvas = document.createElement("canvas");
    copy_canvas.width = ronin.frame.settings.width * 2;
    copy_canvas.height = ronin.frame.settings.height * 2;
    var copy_ctx = copy_canvas.getContext("2d");
    copy_ctx.drawImage(ronin.render.to_img(), 0, 0);

    var new_size = {width:ronin.frame.settings.width * p,height:ronin.frame.settings.height * p};

    // Paste
    ronin.render.clear();
    ronin.frame.resize_to(new_size);
    ronin.render.context().drawImage(copy_ctx.canvas,0,0,new_size.width * 2,new_size.height * 2);
  }

  this.methods.crop = new Method("crop","X,Y|WxH");
  this.methods.crop.run = function(p)
  {
    var data = ronin.render.select(p.x,p.y,p.width,p.height);

    ronin.render.clear();
    ronin.frame.resize_to(p);
    ronin.render.context().putImageData(data, 0, 0);
  }

  this.methods.clear = new Method("clear","X,Y|WxH");
  this.methods.clear.run = function(q)
  {
    ronin.render.fill("blue");
  }

  this.methods.fill = new Method("fill","X,Y|WxH");
  this.methods.fill.run = function(q)
  {
    ronin.render.fill(q);
  }

  this.resize_to = function(size)
  {
    ronin.frame.settings.width = size.width;
    ronin.frame.settings.height = size.height;

    const {dialog,app} = require('electron').remote;
    var win = require('electron').remote.getCurrentWindow();
    win.setSize(size.width,size.height);
    ronin.render.resize_to(size);
    ronin.grid.resize_to(size);
    ronin.guide.resize_to(size);
    ronin.cursor.resize_to(size);
    ronin.preview.resize_to(size);
  }
}