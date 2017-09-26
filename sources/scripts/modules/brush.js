function Brush()
{
  Module.call(this,"brush");

  this.settings = {size:1,color:"#f00",opacity:1.0};

  this.pointers = [
    new Pointer({offset:{x:0,y:0}}),
    new Pointer({offset:{x:2,y:2}}),
    new Pointer({offset:{x:4,y:4}}),
  ];

  // brush speed->blue speed->thickness noise->green

  this.ports.speed = 0;
  this.ports.distance = 0;
  this.ports.red = 255;
  this.ports.green = 0;
  this.ports.blue = 0;
  this.ports.alpha = 1;
  this.ports.noise = 0;

  this.thickness = function(line)
  {
    if(this.ports[this.routes.thickness]){
      return this.ports[this.routes.thickness] * this.settings.size;  
    }
    return this.settings.size;
  }

  this.offset = function(line)
  {
    if(this.ports[this.routes.offset]){
      return this.ports[this.routes.offset] * this.settings.size;  
    }
    return 1;
  }

  this.red = function(line)
  {
    if(this.ports[this.routes.red]){
      return this.ports[this.routes.red] * 255;  
    }
    return this.ports.red;
  }

  this.green = function(line)
  {
    if(this.ports[this.routes.green]){
      console.log(this.ports[this.routes.green])
      return this.ports[this.routes.green] * 255;  
    }
    return this.ports.green;
  }

  this.blue = function(line)
  {
    if(this.ports[this.routes.blue]){
      return this.ports[this.routes.blue] * 255;  
    }
    return this.ports.blue;
  }

  this.alpha = function(line)
  {
    return 1;
  }

  this.stroke = function(line)
  {
    ronin.commander.blur();

    this.ports.speed = distance_between(line.from,line.to)/15.0;
    this.ports.distance += this.ports.speed;
    this.ports.noise = Math.random(255);

    for(pointer_id in this.pointers){
      this.pointers[pointer_id].stroke(line);
    }
  }

  this.mod_size = function(mod)
  {
    this.settings.size = clamp(this.settings.size+mod,1,100);
  }

  function clamp(v, min, max)
  { 
    return v < min ? min : v > max ? max : v; 
  }

  function distance_between(a,b)
  {
    return Math.sqrt( (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y) );
  }
}

function Pointer(options)
{
  this.options = options;

  this.thickness = function(line)
  {
    return ronin.brush.thickness(line);
  }

  this.color = function(line)
  {
    return ronin.brush.settings.color;
  }

  this.stroke = function(line)
  {
    var ctx = ronin.render.context();

    ctx.beginPath();
    ctx.globalCompositeOperation="source-over";
    ctx.moveTo((line.from.x * 2) + (this.options.offset.x * ronin.brush.offset(line)),(line.from.y * 2) + (this.options.offset.y * ronin.brush.offset(line)));
    ctx.lineTo((line.to.x * 2) + (this.options.offset.x * ronin.brush.offset(line)),(line.to.y * 2) + (this.options.offset.y * ronin.brush.offset(line)));
    ctx.lineCap="round";
    ctx.lineWidth = this.thickness(line);
    ctx.strokeStyle = "rgba("+clamp(parseInt(ronin.brush.red()),0,255)+","+clamp(parseInt(ronin.brush.green()),0,255)+","+clamp(parseInt(ronin.brush.blue()),0,255)+","+ronin.brush.alpha()+")";
    ctx.stroke();
    ctx.closePath();

    console.log("rgba("+clamp(parseInt(ronin.brush.red()),0,255)+","+clamp(parseInt(ronin.brush.green()),0,255)+","+clamp(parseInt(ronin.brush.blue()),0,255)+","+ronin.brush.alpha()+")");
  }

  function clamp(v, min, max)
  { 
    return v < min ? min : v > max ? max : v; 
  }
}