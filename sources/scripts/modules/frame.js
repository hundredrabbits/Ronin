function Frame()
{
  Module.call(this,"frame");
  
  this.settings = {width:200,height:200};

  this.methods = {};

  this.methods.resize = function(q)
  {
    var data = ronin.render.select(0,0,ronin.frame.settings.width,ronin.frame.settings.height);

    ronin.render.clear();
    ronin.frame.resize_to(q);
    ronin.render.context().putImageData(data, 0, 0);
  }

  this.methods.rescale = function(p)
  {
    var img = new Image();
    var data = ronin.render.image();

    img.src = data;
    var copy_canvas = document.createElement("canvas");
    var copy_ctx = copy_canvas.getContext("2d");

    copy_canvas.width = ronin.frame.settings.width;
    copy_canvas.height = ronin.frame.settings.height;
    copy_ctx.drawImage(img, 0, 0);

    // ronin.render.clear();
    // ronin.frame.resize_to(p);
    ronin.render.context().drawImage(copy_ctx.canvas,0,0,ronin.frame.settings.width * 0.5,ronin.frame.settings.height * 0.5);
  }

  this.methods.crop = function(p)
  {
    var data = ronin.render.select(p.x,p.y,p.width,p.height);

    ronin.render.clear();
    ronin.frame.resize_to(p);
    ronin.render.context().putImageData(data, 0, 0);
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
  }
}