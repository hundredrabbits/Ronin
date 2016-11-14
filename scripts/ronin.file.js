function File()
{
  Module.call(this);
  
  this.active = function(cmd)
  {
    ronin.overlay.clear();
    
    if(!cmd.position()){ return; }
    if(!cmd.rect()){ return; }
    
    var position = cmd.position() ? cmd.position() : new Position();
    
    base_image = new Image();
    base_image.src = cmd.path();
    base_image.onload = function(){
      position.normalize(cmd.rect());
      context.drawImage(base_image, position.x, position.y, cmd.rect().width, cmd.rect().height);
    }
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
  
  this.hint = function(cmd)
  {
    var hint_path = (cmd.path() ? "Path "+cmd.path()+" " : "");
    var hint_position = (cmd.position() ? "Position "+cmd.position().x+","+cmd.position().y+" " : "");
    var hint_rect = (cmd.rect() ? "Size "+cmd.rect().width+"px by "+cmd.rect().height+"px " : "");
    
    return "File: "+hint_path+hint_position+hint_rect;
  }
  
  this.save = function(cmd)
  {
    var d=canvas.toDataURL("image/png");
    var w=window.open('about:blank','image from canvas');
    w.document.write("<title>"+(cmd.cmd_array[0] ? cmd.cmd_array[0] : "Untitled")+"</title><img src='"+d+"' alt='from canvas'/>");
  }
}