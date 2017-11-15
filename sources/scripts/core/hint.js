function Hint()
{
  this.el = document.createElement('yu');
  this.el.id = "hint";
  this.cursor_hint_el = document.createElement('yu');
  this.cursor_hint_el.id = "cursor_hint";

  this.install = function()
  {
    ronin.commander.el.appendChild(this.el);
    ronin.commander.el.appendChild(this.cursor_hint_el);
    this.cursor_hint_el.innerHTML = "";
  }

  this.find_autocomplete = function(collection,append = "")
  {
    var target = ronin.commander.query().last;
    var a = [];

    for(id in collection){
      var name = collection[id].name;
      if(name && name.substr(0,target.length) == target){
        a.push(name.substr(target.length,20)+append)
      }
    }

    return a;
  }

  this.update = function(e = null)
  {
    var html = ""

    for(module_id in ronin.modules){
      var module = ronin.modules[module_id];
      html += module_id+" ";
    }

    var target_module = ronin.commander.query().module;
    var target_method = Object.keys(ronin.commander.query().methods).length > 0 ? Object.keys(ronin.commander.query().methods)[0] : null

    if(ronin.commander.input_el.value == ""){
      this.el.innerHTML = html;
    }
    else if(ronin.modules[target_module] && ronin.modules[target_module].methods[target_method]){
      this.el.innerHTML = this.pad(ronin.commander.input_el.value)+" "+ronin.modules[target_module].methods[target_method].docs();
    }
    else if(ronin.modules[target_module]){
      var ac = this.find_autocomplete(ronin.modules[target_module].methods,":");
      if(ac.length > 0){
        this.el.innerHTML = this.pad(ronin.commander.input_el.value)+"<span class='autocomplete'>"+ac[0]+"</span> > Press tab to autocomplete."  
      }
      else{
        this.el.innerHTML = this.pad(ronin.commander.input_el.value)+" "+ronin.modules[target_module].hint();  
      }
    }
    else{
      var ac = this.find_autocomplete(ronin.modules);
      if(ac.length > 0){
        this.el.innerHTML = this.pad(ronin.commander.input_el.value)+"<span class='autocomplete'>"+ac[0]+"</span> > Press tab to autocomplete."  
      }
      else{
        this.el.innerHTML = this.pad(ronin.commander.input_el.value)+" > Unknown command."  
      }
    }
  }

  this.pad = function(input)
  {
    var s = "";
    for (i = 0; i < input.length; i++){
      s += "_";
    }
    return "<span style='color:RGBA(0,0,0,0)'>"+s+"</span>";
  }
}