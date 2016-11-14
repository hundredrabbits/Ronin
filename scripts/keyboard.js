function Keyboard()
{
  this.is_locked = false;
  
  this.cmd = function()
  {
    var val = commander.element_input.value;
    
    if(val.indexOf(";") > 0){
      var cmds = val.split(";");
      var vals = [];
      for (i = 0; i < cmds.length; i++) {
        val = cmds[i].replace(/^\s+|\s+$/g, '');
        vals.push(val.split(" "));
      }
      return vals;
    }
    else{
      return [val.split(" ")];
    }
  }
  
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
    
    // Passive
    var cmd = commander.element_input.value;
    
    if(cmd.indexOf(";") > 0){
      var cmds = cmd.split(";");
      for (i = 0; i < cmds.length; i++) {
        cmd = cmds[i].replace(/^\s+|\s+$/g, '');
        commander.passive(cmd.split(" "));
      }
    }
    else{
      commander.passive(cmd.split(" "));
    }
  };

  this.key_tab = function()
  {
    return;
  }

  this.key_enter = function()
  {
    var cmd = commander.element_input.value;
    
    if(cmd.indexOf(";") > 0){
      var cmds = cmd.split(";");
      for (i = 0; i < cmds.length; i++) {
        cmd = cmds[i].replace(/^\s+|\s+$/g, '');
        commander.active(cmd.split(" "));
      }
    }
    else{
      commander.active(cmd.split(" "));
    }
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
    ronin.overlay.clear();
  }
}