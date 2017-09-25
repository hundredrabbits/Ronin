function Keyboard()
{
  this.key_up = function()
  {

  }

  this.key_down = function(e)
  {
    if(e.key == "Enter"){
      ronin.commander.validate();
    }
  }
}