function Keyboard()
{
  this.shift_held = false;
  this.alt_held = false;

  this.listen_onkeydown = function(event)
  {
    if(event.shiftKey == true){
      this.shift_held = true;
    }
    if(event.altKey == true){
      this.alt_held = true;
    }
    ronin.cursor.update(event);
    ronin.widget.update();
  }

  this.listen_onkeyup = function(event)
  {
    this.shift_held = false;
    this.alt_held = false;

    switch (event.key) {
      case "Enter": this.key_enter(); break;
      case "ArrowUp": this.key_arrow_up(); break;
      case "ArrowDown": this.key_arrow_down(); break;
      case "ArrowLeft": this.key_arrow_left(); break;
      case "ArrowRight": this.key_arrow_right(); break;
      case ":": this.key_colon(); break;
      case "Escape": this.key_escape(); break;
    }

    switch(event.which)
    {
      case 219:  ronin.brush.size_up(); break;
      case 221:  ronin.brush.size_down(); break;
      case 38:  ronin.surface.layer_up(); break;
      case 40:  ronin.surface.layer_down(); break;
      case 8: this.key_delete(); break;
    }

    // Passive
    commander.passive(commander.element_input.value);
    
    // ronin.cursor.set_mode(ronin.brush);
    ronin.widget.update();
  };

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

    if(ronin.module){ ronin.module.key_escape(); }
  }

  this.key_delete = function()
  {
    if(ronin.module){ ronin.module.key_delete(); }
  }
}
