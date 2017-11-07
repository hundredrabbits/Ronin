function Magnet()
{
  Module.call(this,"magnet","Cursor magnetisation settings, changes are reflected on the grid layer.");

  this.settings = {size:0,step:4};

  this.methods.lock = new Method("lock","10x10","Magnetize cursor",function(q){
    var size = parseInt(q);
    if(size < 5){ this.unlock(); return; }
    ronin.magnet.settings.size = size;
    ronin.grid.draw(size,ronin.magnet.settings.step);
  })

  this.methods.unlock = new Method("unlock","","Release cursor",function(q){
    ronin.magnet.settings.size = 0;
    ronin.grid.clear();
  })

  this.filter = function(pos)
  {
    if(this.settings.size < 5){
      return pos;
    }

    var s = this.settings.size;
    return {x:parseInt(pos.x/s)*s,y:parseInt(pos.y/s)*s};
  }
}