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
    this.element.innerHTML = ronin.cursor.widget();
  }

  this.update_widget = function()
  {
    if(!this.active_layer){ return; }

    var s = "";
    
    s += "<span class='module'>";
    for (var key in ronin.modules){
      s += ronin.modules[key].widget() ? ronin.modules[key].widget()+" " : "";
    }
    s += "</span>";
  
    s += "<span class='cursor'>"+ronin.cursor.mode.mouse_mode()+"</span>";
    
    var keys = Object.keys(ronin.frame.layers);
    var loc = keys.indexOf(this.active_layer.name);

    if(keys.length > 1){
      s += "<span class='layer'>"+ronin.frame.active_layer.widget()+"("+(loc+1)+"/"+keys.length+")</span>";
    }
    else{
      s += "<span class='layer'>"+ronin.frame.active_layer.widget()+"</span>";
    }
  
    this.widget_element.innerHTML = s;
  }
}