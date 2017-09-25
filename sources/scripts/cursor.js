function Cursor(rune)
{
  this.is_down = false;

  this.mouse_down = function(e)
  {
    e.preventDefault();

    ronin.cursor.is_down = true;

    var ctx = ronin.render.context();
    ctx.beginPath();
    ctx.rect(e.clientX * 2, e.clientY * 2, 5, 5);
    ctx.fillStyle = "red";
    ctx.fill();
  }

  this.mouse_move = function(e)
  {
    e.preventDefault();

    if(!ronin.cursor.is_down){ return; }

    var ctx = ronin.render.context();
    ctx.beginPath();
    ctx.rect(e.clientX * 2, e.clientY * 2, 5, 5);
    ctx.fillStyle = "red";
    ctx.fill();
  }

  this.mouse_up = function(e)
  {   
    e.preventDefault();
    
    ronin.cursor.is_down = false; 
  }
}