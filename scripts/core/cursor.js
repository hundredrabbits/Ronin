function Cursor()
{
  this.mode = null;
  this.position = new Position();
  
  this.update = function(event)
  {
    if(event.ctrlKey === true){ this.set_mode(ronin.overlay); }
    else if(event.altKey === true){ this.set_mode(ronin.canvas); }
    else if(event.shiftKey === true){ this.set_mode(ronin.brush);  }
    else{ this.set_mode(ronin.brush); }
  }
  
  this.set_mode = function(mode)
  {
    if(this.mode == mode){ return; }
    this.mode = mode;
    document.body.setAttribute("class",this.mode.constructor.name);
    ronin.widget.update();
  }
  
  this.mouse_down = function(position)
  {
    this.position = position;
    this.mode.mouse_down(position);
    ronin.widget.update();
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
    ronin.widget.update();
  }
}