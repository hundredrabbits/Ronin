function Render(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.collection = {};

  this.collection["stencil"] = new Filter_Stencil();
  this.collection["rotate"] = new Filter_Rotate();
  this.collection["invert"] = new Filter_Invert();
  
  this.active = function(cmd)
  {
    var name = cmd.content[0];

    if(!this.collection[name]){ return; }
    
    return this.collection[name].render(cmd);
  }
  
  this.passive = function(cmd)
  {
    var name = cmd.content[0];
    if(!this.collection[name]){ return; }

    return this.collection[name].preview(cmd);
  }
	
}
