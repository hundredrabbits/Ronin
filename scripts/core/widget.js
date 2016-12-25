function Widget()
{
  this.element = null;
  
  this.update = function()
  {
    var s = "";
    
    for (var key in ronin.modules){
      s += ronin.modules[key].widget() ? "<div class='module'>"+ronin.modules[key].widget()+"</div>" : "";
    }
  
    s += "<div class='cursor'>"+ronin.cursor.mode.widget_cursor()+"</div>";
    
    this.element.innerHTML = s;
  }
}