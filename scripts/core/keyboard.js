function Keyboard()
{
  this.listen_onkeyup = function(event)
  {
    switch (event.key) {
      case "Enter": this.key_enter(); break;
      case "ArrowUp": this.key_arrow_up(); break;
      case "ArrowDown": this.key_arrow_down(); break;
      case "ArrowLeft": this.key_arrow_left(); break;
      case "ArrowRight": this.key_arrow_right(); break;
      case ":": this.key_colon(); break;
      case ";": if (event.shiftKey) this.key_colon(); break;
      case "Escape": this.key_escape(); break;
    }

    switch(event.which)
    {
      case 13:  this.key_enter();  break;
      case 186: this.key_colon();  break;
      case 27:  this.key_escape(); break;
      case 219:  ronin.brush.size -= ronin.brush.size > 1 ? 1 : 0;ronin.widget.update(); break;
      case 221:  ronin.brush.size += 1;ronin.widget.update(); break;
    }

    // Passive
    commander.passive(commander.element_input.value);
    
    ronin.cursor.set_mode(ronin.brush);
    ronin.widget.update();
  };
  
  this.listen_onkeydown = function(event)
  {
    ronin.cursor.update(event);
  }

  this.key_tab = function()
  {
  }

  this.key_enter = function()
  {
    commander.query(commander.element_input.value);
  }

  this.key_space = function()
  {
  }

  this.key_arrow_up = function()
  {
    commander.prev_cmd();
  }

  this.key_arrow_down = function()
  {
    commander.next_cmd();
  }

  this.key_arrow_left = function()
  {
  }

  this.key_arrow_right = function()
  {
  }

  this.key_colon = function()
  {
    commander.show();
    return false;
  }

  this.key_escape = function()
  {
    commander.hide();
    ronin.overlay.clear();
  }
}
