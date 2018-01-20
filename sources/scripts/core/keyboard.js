function Keyboard()
{
  this.is_down = {};

  this.key_up = function(e)
  {
    ronin.hint.update(e);
  }

  this.key_down = function(e)
  {
    ronin.keyboard.is_down[e.key] = true;

    if(e.key == "Enter"){
      e.preventDefault();
      ronin.commander.validate();
    }

    if(ronin.commander.is_focused()){
      ronin.hint.update(e);
      return;
    }

    ronin.hint.update(e);
  }
}