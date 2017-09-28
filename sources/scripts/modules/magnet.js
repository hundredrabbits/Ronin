function Magnet()
{
  Module.call(this,"magnet","Cursor magnetisation settings, changes are reflected on the grid layer.");

  this.settings = {size:0,step:4};

  this.methods.lock = function(q)
  {
    var size = parseInt(q);
    ronin.magnet.settings.size = size;

    if(size < 5){ this.unlock(); return; }

    ronin.grid.draw(size,ronin.magnet.settings.step);
  }

  this.methods.unlock = function(q)
  {
    ronin.magnet.settings.size = 0;
    ronin.grid.clear();
  }

  this.filter = function(pos)
  {
    if(this.settings.size < 5){
      return pos;
    }

    var s = this.settings.size;
    return {x:parseInt(pos.x/s)*s,y:parseInt(pos.y/s)*s};
  }
}