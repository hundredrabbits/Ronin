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
    ronin.frame.update_widget();
    ronin.terminal.update_hint();
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
      case 38:  this.key_arrow_up(); break;
      case 40:  this.key_arrow_down(); break;
      case 8: this.key_delete(); break;
    }

    // Passive
    ronin.terminal.passive(ronin.terminal.input_element.value);
    ronin.frame.update_widget();
    ronin.terminal.update_hint();
  };

  this.key_tab = function()
  {
  }

  this.key_enter = function()
  {
    ronin.terminal.query(ronin.terminal.input_element.value);
  }

  this.key_space = function()
  {
  }

  this.key_arrow_up = function()
  {
    if(ronin.module){ ronin.module.key_arrow_up(); }
  }

  this.key_arrow_down = function()
  {
    if(ronin.module){ ronin.module.key_arrow_down(); }
  }

  this.key_arrow_left = function()
  {
    if(ronin.module){ ronin.module.key_arrow_left(); }
  }

  this.key_arrow_right = function()
  {
    if(ronin.module){ ronin.module.key_arrow_right(); }
  }

  this.key_colon = function()
  {
    return false;
  }

  this.key_escape = function()
  {
    for(var key in ronin.modules){
      ronin.modules[key].key_escape();
    }
  }

  this.key_delete = function()
  {
    if(ronin.module){ ronin.module.key_delete(); }
  }
}
