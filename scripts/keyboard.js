function Keyboard()
{
  this.is_locked = false;

  this.lock = function()
  {
    this.is_locked = true;
    interface.actions_panel.style.color = "red";
  }

  this.unlock = function()
  {
    this.is_locked = false;
    interface.actions_panel.style.color = "black";
  }

  this.listen = function(event)
  {
    if(this.is_locked === true){ return; }
    
    commander.passive();
    
    switch (event.keyCode)
    {
      case  9: this.key_tab(); break;
      case 13: this.key_enter(); break;
      case 32: this.key_space(); break;
      case 38: this.key_arrow_up(); break;
      case 40: this.key_arrow_down(); break;
      case 37: this.key_arrow_left(); break;
      case 39: this.key_arrow_right(); break;
      case 186: this.key_colon(); break;
      case  27: this.key_escape(); break;
    }
  };

  this.key_tab = function()
  {
    return;
  }

  this.key_enter = function()
  {
    commander.validate();
  }

  this.key_space = function()
  {
  }

  this.key_arrow_up = function()
  {
  }

  this.key_arrow_down = function()
  {
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
  }
}