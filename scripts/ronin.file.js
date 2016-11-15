function File()
{
  Module.call(this);
  
  this.storage = [];
  
  this.active = function(cmd)
  {
    if(cmd.bang()){ this.storage = []; }
    
    ronin.overlay.clear();
    
    if(!cmd.path() && !cmd.value()){ return; }
    
    var position = cmd.position() ? cmd.position() : new Position();
    
    base_image = new Image();
    base_image.src = cmd.value() && this.storage[cmd.value()] ? this.storage[cmd.value()] : cmd.path();
    base_image.src += '?' + new Date().getTime();
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
      
      ronin.canvas.context().drawImage(base_image, position.x, position.y, width, height);
    }
  }
  
  this.passive = function(cmd)
  {
    if(!cmd.path() && !cmd.value()){ return; }
    
    var position = cmd.position() ? cmd.position() : new Position();
    
    if(position && cmd.rect()){
      ronin.overlay.draw(position,cmd.rect());
    }
    else if(position){
      ronin.overlay.draw(position);
    }
  }
  
  this.hint = function(cmd)
  {
    var hint_path = (cmd.path() ? "Path "+cmd.path()+" " : "");
    var hint_position = (cmd.position() ? "Position "+cmd.position().x+","+cmd.position().y+" " : "");
    var hint_rect = (cmd.rect() ? "Size "+cmd.rect().width+" by "+cmd.rect().height+" " : "");
    
    return "File: "+hint_path+hint_position+hint_rect;
  }
  
  this.save = function(cmd)
  {
    if(cmd.value() > 0){
      this.storage[cmd.value()] = ronin.canvas.element.toDataURL("image/png");
    }
    else{
      var d = ronin.canvas.element.toDataURL("image/png");
      var w = window.open('about:blank','image from canvas');
      w.document.write("<title>"+(cmd.content[0] ? cmd.content[0] : "Untitled")+"</title><img src='"+d+"' alt='from canvas'/>");
    }
  }
}