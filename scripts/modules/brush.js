function Brush(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Position,Rect,Angle,Color,Value,Bang];
  this.pointers = [new Pointer(new Position())];
  
  this.position = new Position();
  this.size = 1;
  this.opacity = 1;
  this.color = new Color();
  
  // Module
  
  this.active = function(cmd)
  {
    if(cmd.bang()){ this.pointers = []; }
    
    var pointer = new Pointer();
    
    if(cmd.position()){
      pointer.offset = cmd.position();
    }
    if(cmd.rect()){
      pointer.mirror = cmd.rect();
    }
    if(cmd.variable("osc_scale") && cmd.variable("osc_rate")){
      pointer.osc_rate  = parseFloat(cmd.variable("osc_rate"));
      pointer.osc_scale = parseFloat(cmd.variable("osc_scale"));
    }
    if(cmd.angle()){
      pointer.angle = cmd.angle();
    }
    if(cmd.rect() || cmd.position() || cmd.variable("osc_rate") || cmd.angle()){
      this.add_pointer(pointer);
    }
    if(cmd.color()){
      this.color = cmd.color();
    }
    if(cmd.value()){
      this.size = cmd.value().float;
    }
    ronin.widget.update();
  }
  
  this.passive = function(cmd)
  {
    if(cmd.rect()){
      var x = isNaN(cmd.rect().width) ? 0 : cmd.rect().width;
      var y = isNaN(cmd.rect().height) ? 0 : cmd.rect().height;
      var pos = new Position(x+","+y);
      ronin.overlay.draw(pos);
    }
    if(cmd.angle() && cmd.position()){
      ronin.overlay.draw(cmd.position());
    }
  }
  
  this.add_pointer = function(pointer)
  {
    this.pointers.push(pointer);
  }

  this.widget = function()
  {
    return "> "+this.size+" <span style='color:"+this.color.render()+"'>"+this.color.render()+"</span> ";
  }
}