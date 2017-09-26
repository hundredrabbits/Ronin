function Frame()
{
  Module.call(this,"frame");
  
  this.settings = {width:200,height:200};

  this.methods = {};

  this.methods.resize = function(q)
  {
    if(q.indexOf("x") == -1){ return; }

    var size = {width:parseInt(q.split("x")[0]),height:parseInt(q.split("x")[1])};
    ronin.frame.resize(size);
  }

  this.methods.rescale = function(p)
  {
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