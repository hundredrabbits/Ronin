function Render(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.collection = {};

  this.collection["stencil"] = new Filter_Stencil();
  
  this.active = function(cmd)
  {
    var name = cmd.content[0];

    if(!this.collection[name]){ console.log("Unknown filter:"+name); return; }

    cmd.content.shift();
    
    return this.collection[name].render(cmd.content);
  }
  
  this.passive = function(cmd)
  {
    
  }
	
}
