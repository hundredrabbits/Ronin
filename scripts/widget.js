function Widget()
{
  this.element = null;
  
  this.update = function()
  {
    var s = "";
    
    for (var key in ronin.modules){
      s += ronin.modules[key].widget();
    }
  
    s += ronin.cursor.mode.widget();
    
    this.element.innerHTML = s;
  }
}