function Frame()
{
  Module.call(this,"frame","Manager for the canvas size");
  
  this.el = document.createElement('surface');
  this.background = "pink";

  this.install = function()
  {
    ronin.el.appendChild(this.el);
  }

  this.methods.new = new Method("new","WxH","New Canvas",function(q){
    ronin.layers.above.clear();
    ronin.layers.below.clear();
    ronin.frame.resize_to({width:900,height:540});
  });

  this.width = 400;
  this.height = 400;
  this.zoom = {scale:1,offset:{x:0,y:0}};

  this.methods.set_background = new Method("set_background","WxH","Resize canvas to size.",function(q){
    ronin.frame.background = q;
    ronin.frame.el.style.backgroundColor = q;
  });

  this.methods.resize = new Method("resize","WxH","Resize canvas to size.",function(q){
    var data = ronin.cursor.target.select(0,0,ronin.frame.width,ronin.frame.height);
    ronin.cursor.target.clear();
    ronin.frame.resize_to(q);
    ronin.cursor.target.context().putImageData(data, 0, 0);
  });

  this.methods.rescale = new Method("rescale","0.5","Rescale canvas to float.",function(p){
    var new_size = {width:ronin.frame.width * p,height:ronin.frame.height * p};
    ronin.cursor.target.context().drawImage(ronin.cursor.target.to_img(),0,0,new_size.width * 2,new_size.height * 2);
    setTimeout(function(){ ronin.frame.methods.resize.run(new_size);},500)
  });

  this.methods.crop = new Method("crop","X,Y|WxH","Crop canvas to rect.",function(p){
    var data = ronin.cursor.target.select(0,0,p.width*2,p.height*2);
    ronin.cursor.target.clear();
    ronin.frame.resize_to(p);
    setTimeout(function(){ ronin.cursor.target.context().putImageData(data, p.x*-2, p.y*-2);},500)
  });

  this.methods.clear = new Method("clear","","Erase entire canvas",function(q){
    ronin.cursor.target.clear();
  });

  this.methods.fill = new Method("fill","#f00","Fill entire canvas with color",function(q){
    ronin.cursor.target.fill(q ? q : ronin.cursor.color);
  });

  this.methods.inspect = new Method("inspect","","View canvas details",function(q){
    ronin.guide.inspect = ronin.guide.inspect ? false : true;
    ronin.guide.draw();
  });

  this.methods.zoom = new Method("zoom","","Zoom canvas",function(q){
    if(ronin.frame.zoom.scale == parseInt(q)){ return; }

    ronin.frame.zoom.scale = parseInt(q);

    ronin.frame.el.style.width = `${ronin.frame.width * ronin.frame.zoom.scale}px`;
    ronin.frame.el.style.height = `${ronin.frame.height * ronin.frame.zoom.scale}px`;
    ronin.frame.zoom.offset.x = ronin.frame.zoom.scale == 1 ? 0 : ((-ronin.cursor.pos.x * ronin.frame.zoom.scale) + (ronin.frame.width/2));
    ronin.frame.zoom.offset.y = ronin.frame.zoom.scale == 1 ? 0 : ((-ronin.cursor.pos.y * ronin.frame.zoom.scale) + (ronin.frame.height/2));

    // Normalize
    if(ronin.frame.zoom.offset.x > 0){ ronin.frame.zoom.offset.x = 0; }
    if(ronin.frame.zoom.offset.y > 0){ ronin.frame.zoom.offset.y = 0; }

    ronin.frame.el.style.top = `${ronin.frame.zoom.offset.y}px`;
    ronin.frame.el.style.left = `${ronin.frame.zoom.offset.x}px`;
  });

  this.resize_to = function(size)
  {
    this.el.style.width = `${size.width}px`;
    this.el.style.height = `${size.height}px`;
    ronin.frame.width = size.width;
    ronin.frame.height = size.height;

    const {dialog,app} = require('electron').remote;
    var win = require('electron').remote.getCurrentWindow();
    win.setSize(size.width,size.height);
    ronin.layers.above.resize_to(size);
    ronin.layers.below.resize_to(size);
    ronin.guide.resize_to(size);
  }
}