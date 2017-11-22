function Keyboard()
{
  this.is_down = {};

  this.key_up = function(e)
  {
    ronin.keyboard.is_down[e.key] = false;
    ronin.hint.update(e);
  }

  this.key_down = function(e)
  {
    ronin.keyboard.is_down[e.key] = true;

    if(e.key == "~"){
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
      ronin.preview.clear();
    }

    if(e.key == "tab" || e.keyCode == 9){
      e.preventDefault();
      ronin.cursor.update();
      ronin.commander.autocomplete();
      return;
    }

    if(ronin.commander.is_focused()){
      ronin.hint.update(e);
      return;
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
      ronin.guide.inspect = false;
      ronin.guide.clear();
      ronin.render.clear();
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

    if(e.key == "H" && (e.ctrlKey || e.metaKey) && e.shiftKey){
      e.preventDefault();
      ronin.docs.export();
    }

    if(e.key == "x"){
      e.preventDefault();
      ronin.cursor.swap_colors();
    }

    if(e.key == "z"){
      e.preventDefault();
      ronin.cursor.swap_layer();
    }

    ronin.hint.update(e);
  }
}