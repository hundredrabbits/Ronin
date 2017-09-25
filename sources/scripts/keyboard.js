function Keyboard()
{
  this.key_up = function(e)
  {
    ronin.hint.update(e);
  }

  this.key_down = function(e)
  {
    if(e.key == "Enter"){
      ronin.commander.validate();
    }
    
    if(e.key == "Escape"){
      ronin.commander.input_el.blur();;
    }

    if(e.key == "]"){
      ronin.brush.mod_size(1);
    }
    if(e.key == "["){
      ronin.brush.mod_size(-1);
    }

    ronin.hint.update(e);
  }
}