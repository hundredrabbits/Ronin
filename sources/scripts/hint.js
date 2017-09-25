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
      html += module.hint()+" ";
    }
    this.el.innerHTML = this.pad(ronin.commander.input_el.value)+html;
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