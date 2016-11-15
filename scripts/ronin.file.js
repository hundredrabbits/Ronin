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
    base_image.onload = function(){
      var width = base_image.naturalWidth;
      var height = base_image.naturalHeight;
      if(cmd.rect()){
        width = cmd.rect().width;
        height = cmd.rect().height;
        position.normalize(cmd.rect());
      }
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
    var hint_rect = (cmd.rect() ? "Size "+cmd.rect().width+"px by "+cmd.rect().height+"px " : "");
    
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
      w.document.write("<title>"+(cmd.cmd_array[0] ? cmd.cmd_array[0] : "Untitled")+"</title><img src='"+d+"' alt='from canvas'/>");
    }
  }
}