function Hint()
{
  this.el = document.createElement('yu');
  this.el.id = "hint";

  this.install = function()
  {
    ronin.el.appendChild(this.el);
    this.el.innerHTML = "";
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
      this.el.innerHTML = this.pad(ronin.commander.input_el.value)+ronin.modules[target_module].methods[target_method].docs();
    }
    else if(ronin.modules[target_module]){
      this.el.innerHTML = this.pad(ronin.commander.input_el.value)+ronin.modules[target_module].hint();
    }
    else{
      this.el.innerHTML = this.pad(ronin.commander.input_el.value)+" > Idle."
    }
  }

  this.pad = function(input)
  {
    var s = "";
    for (i = 0; i < input.length+1; i++){
      s += "_";
    }
    return "<span style='color:RGBA(0,0,0,0)'>"+s+"</span>";
  }
}