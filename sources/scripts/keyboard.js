function Keyboard()
{
  this.key_up = function(e)
  {
    ronin.hint.update(e);
  }

  this.key_down = function(e)
  {
    if(e.key == "Enter"){
      e.preventDefault();
      ronin.commander.validate();
    }
    
    if(e.key == "Escape"){
      e.preventDefault();
      ronin.commander.input_el.blur();;
    }

    if(e.key == "]"){
      e.preventDefault();
      ronin.brush.mod_size(1);
    }
    if(e.key == "["){
      e.preventDefault();
      ronin.brush.mod_size(-1);
    }

    if(e.key == "n" && (e.ctrlKey || e.metaKey)){
      e.preventDefault();
      ronin.render.clear();
    }

    ronin.hint.update(e);
  }
}