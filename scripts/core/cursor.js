function Cursor()
{
  this.mode = new Mode_Paint();
  this.position = new Position();
  
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
    document.body.setAttribute("class",this.mode.name);
    ronin.widget.update();
  }
  
  this.mouse_down = function(position)
  {
    this.position = position;
    this.mode.mouse_down(position);
  }
  
  this.mouse_move = function(position)
  {
    this.position = position;
    this.mode.mouse_move(position);
  }
  
  this.mouse_up = function(position)
  {
    this.position = position;
    this.mode.mouse_up(position);
  }
}