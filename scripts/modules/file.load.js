function FileLoad(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Filepath,Position,Rect];
  
  this.active = function(cmd)
  {
    ronin.overlay.clear();
    
    if(!cmd.filepath() && !cmd.value()){ return; }
    
    var position = cmd.position() ? cmd.position() : new Position();
    
    base_image = new Image();
    base_image.src = cmd.filepath().path;
    base_image.src += '?'+new Date().getTime();
    base_image.crossOrigin = "Anonymous";
    
    base_image.onload = function(){
      var width = base_image.naturalWidth;
      var height = base_image.naturalHeight;
      if(cmd.rect()){
        width = cmd.rect().width;
        height = cmd.rect().height;
        position.normalize(cmd.rect());
      }
      // Scale with only 1 unit
      width  = isNaN(width) && height > 0 ? (height*base_image.naturalWidth)/base_image.naturalHeight : width;
      height = isNaN(height) && width > 0 ? (width*base_image.naturalHeight)/base_image.naturalWidth : height;
      
      ronin.surface.context().drawImage(base_image, position.x, position.y, width, height);
    }
  }
  
  this.passive = function(cmd)
  {
    if(!cmd.filepath() && !cmd.value()){ return; }
    
    var position = cmd.position() ? cmd.position() : new Position();
    
    if(position && cmd.rect()){
      ronin.overlay.draw(position,cmd.rect());
    }
    else if(position){
      ronin.overlay.draw(position);
    }
  }
}