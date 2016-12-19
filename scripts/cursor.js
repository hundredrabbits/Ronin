function Cursor()
{
  this.mode = new Mode_Paint();
  
  this.update = function(event)
  {
    if(event.ctrlKey === true){ this.set_mode(new Mode_Guide()); }
    else if(event.altKey === true){ this.set_mode(new Mode_Drag()); }
    else if(event.shiftKey === true){ this.set_mode(new Mode_Paint()); }
    else{ this.set_mode(new Mode_Paint()); }
  }
  
  this.set_mode = function(mode)
  {
    if(this.mode.name == mode.name){ return; }
    this.mode = mode;
    ronin.widget.update();
  }
  
  this.mouse_down = function(event)
  {
    
  }
  
  this.mouse_move = function(event)
  {
    
  }
  
  this.mouse_up = function(event)
  {
    
  }
}