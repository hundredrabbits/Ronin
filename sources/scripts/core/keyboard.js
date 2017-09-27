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
      ronin.commander.input_el.blur();
      ronin.commander.input_el.value = "";
      ronin.guide.update();
    }

    if(e.key == "tab" || e.keyCode == 9){
      e.preventDefault();
      ronin.commander.focus();
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
      ronin.render.clear();
    }

    if(e.key == "o" && (e.ctrlKey || e.metaKey)){
      e.preventDefault();
      ronin.io.load();
    }

    if(e.key == "s" && (e.ctrlKey || e.metaKey)){
      e.preventDefault();
      ronin.io.save();
    }

    if(e.key == "r" && (e.ctrlKey || e.metaKey)){
      e.preventDefault();
      ronin.io.render();
    }

    if(e.key == "H" && (e.ctrlKey || e.metaKey) && e.shiftKey){
      e.preventDefault();
      ronin.docs.export();
    }

    ronin.hint.update(e);
  }
}