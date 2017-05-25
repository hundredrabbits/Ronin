function Eye(rune)
{
  Module.call(this,rune);

  this.add_mode(new Mode("picker"));
  
  // TODO: If a rect is given, return the average color
  this.color_picker = function(position,rect = null)
  {
    var pixel = ronin.frame.context().getImageData(position.x*2, position.y*2, 1, 1).data;
    var hex = new Color().rgb_to_hex({r:pixel[0],g:pixel[1],b:pixel[2]});
    ronin.terminal.log(new Log(this,"Pixel on "+ronin.frame.active_layer.name+" layer at "+position.toString()+" is "+hex));
    ronin.terminal.input.focus();
  }
  
  // Mouse

  this.mouse_down = function(position)
  {
    this.color_picker(position);
  }
  
  this.mouse_move = function(position,rect)
  {
    this.color_picker(position);
  }
  
  this.mouse_up = function(position,rect)
  {
    this.color_picker(position);
  }
}