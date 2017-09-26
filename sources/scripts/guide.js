function Guide()
{
  this.el = document.createElement('canvas'); this.el.id = "guide";

  this.install = function()
  {
    ronin.el.appendChild(this.el);
  }

  this.update = function()
  {
    var u = ronin.guide.find_unit();

    console.log(u);
    // if(u.x){ this.draw_pos(u); }
    // if(u.width){ this.draw_rect(u); }
  }

  this.find_unit = function(q = ronin.commander.query())
  {
    for(method_id in q.methods){
      var params = q.methods[method_id];
      if(params.from){ return params.from[0]; }
      if(params[0]){ return params[0]; }
      return params;
    }
    return null;
  }
}