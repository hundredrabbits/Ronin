function Widget()
{
  this.element = null;
  
  this.update = function()
  {
    var s = "";
    
    for (var key in ronin.modules){
      s += ronin.modules[key].widget();
    }
  
    // s += "<span class='cursor'>"+ronin.cursor.mode.widget()+"</span>";
    
    this.element.innerHTML = s;
  }
}