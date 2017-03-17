function FileLoad(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Filepath,Position,Rect];
  
  this.active = function(cmd)
  {
    ronin.overlay.clear();
    
    if(!cmd.filepath() && !cmd.value()){ ronin.terminal.log(new Log(this,"Missing image path.","error")); return; }
    
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
    ronin.overlay.draw(cmd.position(),cmd.rect());
  }

  this.mouse_mode = function()
  {
    return "Place";
  }

  this.mouse_down = function(position)
  {
    ronin.overlay.draw(position);
    ronin.terminal.input_element.value = "/ "+position.render();
    ronin.terminal.update_hint();
  }
  
  this.mouse_move = function(position,rect)
  {
    ronin.overlay.draw(this.mouse_from,rect);
    ronin.terminal.input_element.value = "/ "+this.mouse_from.render()+" "+rect.render();
    ronin.terminal.update_hint();
  }
  
  this.mouse_up = function(position,rect)
  {
    ronin.overlay.draw(this.mouse_from,rect);
    ronin.terminal.input_element.value = "/ "+this.mouse_from.render()+" "+rect.render();
    ronin.terminal.update_hint();
  }
}