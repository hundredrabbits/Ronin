function Widget(rune)
{
  Module.call(this,rune);

  this.element = document.createElement("div");
  this.element.setAttribute("id","widget");

  this.install = function()
  {
    ronin.terminal.element.appendChild(this.element);
  }

  this.update = function()
  {
    var html = "";
    for (var key in ronin.modules){
      html += ronin.modules[key].widget() ? ronin.modules[key].widget()+" " : "";
    }
    this.element.innerHTML = html;
  }
}