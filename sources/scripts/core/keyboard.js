function Keyboard()
{
  this.is_down = {};

  this.key_up = function(e)
  {
    if(e.key == "tab" || e.keyCode == 9){
      e.preventDefault();
      ronin.cursor.update();
      ronin.commander.autocomplete();
      ronin.commander.show();
      setTimeout(()=>{ronin.commander.focus},100)
      return;
    }

    ronin.keyboard.is_down[e.key] = false;
    ronin.hint.update(e);
  }

  this.key_down = function(e)
  {
    ronin.keyboard.is_down[e.key] = true;

    if(e.key == "/"){
      e.preventDefault();
      ronin.commander.inject("~")
      return;
    }

    if(e.key == "Enter"){
      e.preventDefault();
      ronin.commander.validate();
    }
    
    if(e.key == "Escape"){
      e.preventDefault();
      ronin.commander.input_el.blur();
      ronin.commander.input_el.value = "";
      ronin.guide.update();
      ronin.guide.clear();
      ronin.guide.inspect = false;
      if(!ronin.commander.is_focused()){
        ronin.commander.hide();
      }
    }

    // Macros
    if(e.key == "f" && (e.ctrlKey || e.metaKey)){
      e.preventDefault();
      ronin.commander.inject(`frame fill:${ronin.cursor.color}`)
    }

    if(ronin.commander.is_focused()){
      ronin.hint.update(e);
      return;
    }

    if((e.key == "n" || e.key == "Backspace") && (e.ctrlKey || e.metaKey)){
      e.preventDefault();
      ronin.guide.inspect = false;
      ronin.guide.clear();
      ronin.cursor.target.clear();
    }

    if(e.key == "N" && (e.ctrlKey || e.metaKey) && e.shiftKey){
      e.preventDefault();
      ronin.guide.inspect = false;
      ronin.guide.clear();
      ronin.layers.above.clear()
      ronin.layers.below.clear()
    }

    // Open
    if(e.key == "o" && (e.ctrlKey || e.metaKey)){
      e.preventDefault();
      ronin.io.methods.load.run();
    }

    // Save
    if(e.key == "s" && (e.ctrlKey || e.metaKey)){
      e.preventDefault();
      ronin.io.methods.save.run();
    }

    ronin.hint.update(e);
  }
}