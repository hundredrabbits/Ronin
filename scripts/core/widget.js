function Widget()
{
  this.element = null;
  
  this.update = function()
  {
    var s = "";
    
    s += "<div class='module'>";
    for (var key in ronin.modules){
      s += ronin.modules[key].widget() ? ronin.modules[key].widget()+"<br />" : "";
    }
    s += "</div>";
  
    s += "<div class='cursor'>"+ronin.cursor.mode.widget_cursor()+"</div>";
    
    this.element.innerHTML = s;
  }

  this.on_resize = function()
  {
    this.element.style.left = (window.innerWidth/2)-(ronin.frame.settings["size"].width/2);
    this.element.style.top = (window.innerHeight/2)+(ronin.frame.settings["size"].height/2)+20;
    this.element.style.width = ronin.frame.settings["size"].width+"px";
    
    this.update();
  }
}