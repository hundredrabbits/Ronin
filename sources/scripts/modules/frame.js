function Frame()
{
  Module.call(this,"frame","Manager for the canvas size");
  
  this.width = 400;
  this.height = 400;
  this.zoom = {scale:1,offset:{x:0,y:0}};

  this.methods.resize = new Method("resize","WxH","Resize canvas to size.",function(q){
    var data = ronin.render.select(0,0,ronin.frame.width,ronin.frame.height);
    ronin.render.clear();
    ronin.frame.resize_to(q);
    ronin.render.context().putImageData(data, 0, 0);
  });

  this.methods.rescale = new Method("rescale","0.5","Rescale canvas to float.",function(p){
    var new_size = {width:ronin.frame.width * p,height:ronin.frame.height * p};
    ronin.render.context().drawImage(ronin.render.to_img(),0,0,new_size.width * 2,new_size.height * 2);
    setTimeout(function(){ ronin.frame.methods.resize.run(new_size);},500)
  });

  this.methods.crop = new Method("crop","X,Y|WxH","Crop canvas to rect.",function(p){
    var data = ronin.render.select(0,0,p.width*2,p.height*2);
    ronin.render.clear();
    ronin.frame.resize_to(p);
    setTimeout(function(){ ronin.render.context().putImageData(data, p.x*-2, p.y*-2);},500)
  });

  this.methods.clear = new Method("clear","","Erase entire canvas",function(q){
    ronin.render.clear();
  });

  this.methods.fill = new Method("fill","#f00","Fill entire canvas with color",function(q){
    ronin.render.fill(q ? q : ronin.cursor.color);
  });

  this.methods.inspect = new Method("inspect","","View canvas details",function(q){
    ronin.guide.inspect = ronin.guide.inspect ? false : true;
    ronin.guide.draw();
  });

  this.methods.zoom = new Method("zoom","","Zoom canvas",function(q){
    if(ronin.frame.zoom.scale == parseInt(q)){ return; }

    ronin.frame.zoom.scale = parseInt(q);
    ronin.layers.render.el.style.width = (ronin.frame.width * ronin.frame.zoom.scale)+"px";
    ronin.layers.render.el.style.height = (ronin.frame.height * ronin.frame.zoom.scale)+"px";

    if(ronin.frame.zoom.scale == 1){
      ronin.frame.zoom.offset.x = 0;
      ronin.frame.zoom.offset.y = 0;
    }
    else{
      ronin.frame.zoom.offset.x = ((-ronin.cursor.pos.x * ronin.frame.zoom.scale) + (ronin.frame.width/2));
      ronin.frame.zoom.offset.y = ((-ronin.cursor.pos.y * ronin.frame.zoom.scale) + (ronin.frame.height/2));
    }
    ronin.layers.render.el.style.left = ronin.frame.zoom.offset.x+"px"; 
    ronin.layers.render.el.style.top = ronin.frame.zoom.offset.y+"px"; 
  });

  this.resize_to = function(size)
  {
    ronin.frame.width = size.width;
    ronin.frame.height = size.height;

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