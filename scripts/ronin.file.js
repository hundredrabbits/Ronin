function File()
{
  Module.call(this);
  
  this.active = function()
  {
    console.log("Nothing to do.");
    ronin.overlay.clear();
  }
  
  this.passive = function(cmd)
  {
    if(!cmd.path()){ return; }
    
    var position = cmd.position() ? cmd.position() : new Position();
    
    if(position && cmd.rect()){
      ronin.overlay.draw(position,cmd.rect());
    }
    else if(position){
      ronin.overlay.draw(position);
    }
  }
}