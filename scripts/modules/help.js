function Help(rune)
{
  Module.call(this,rune);

  this.view = document.createElement("div");
  
  this.install = function(cmd)
  {
    console.log("Installing "+ronin.modules[this.rune].constructor.name);

    this.view.setAttribute("id","help_view");
    var html = "";
    html += "<img src='media/graphics/logo.black.svg' class='logo'/>";
    html += this.view_controls();
    html += this.view_modules();
    html += this.view_units();
    html += this.view_presets();
    this.view.innerHTML = "<div class='wrapper'>"+html+"<hr/></div>";

    ronin.element.appendChild(this.view);
  }

  this.on_resize = function()
  {
    this.view.style.left = (window.innerWidth/2)-(ronin.surface.size.width/2);
    this.view.style.top = (window.innerHeight/2)+(ronin.surface.size.height/2)+20;
  }

  this.passive = function(cmd)
  {
    this.view.style.display = "block";
    ronin.cursor.element.style.display = "none";
  }

  this.key_escape = function()
  {
    this.view.style.display = "none";
  }
  
  //

  this.view_controls = function()
  {
    html = "<h1>Controls</h1>";
    html += "<ul>";
    html += "<li><b>ctrl</b> Draw Overlays</li>\n";
    html += "<li><b>alt</b> Drag Surface</li>\n";
    html += "<li><b>shift</b> Erase</li>\n";
    html += "<li><b>shift+ctrl</b> Eyedrop</li>\n";
    html += "<li><b>shift+alt</b> Move Layer</li>\n";
    html += "</ul>";
    return "<div class='cat'>"+html+"</div>";
  }
  
  this.view_modules = function()
  {
    html = "<h1>Modules</h1>";
    html += "<ul>";
    Object.keys(ronin.modules).forEach(function (key) {
      var parameters = "";
      html += "<li><i>"+key+"</i> "+ronin.modules[key].constructor.name+" ";
      for (i = 0; i < ronin.modules[key].parameters.length; i++) {
        html += "<b>"+ronin.modules[key].parameters[i].name+"</b> ";
      }
      html += "</li>\n";
    });
    html += "</ul>";
    html += "\n";
    
    return "<div class='cat'>"+html+"</div>";
  }

  this.view_units = function()
  {
    html = "<h1>Units</h1>\n\n";
    html += "<ul>";
    html += "<li>5 value: 5</li>\n";
    html += "<li>5,7 position: 5x 7y</li>\n";
    html += "<li>7x9 rect: 5w 7h</li>\n";
    html += "<li>#ff0000 color: red</li>\n";
    html += "<li>45' degree: 45/365</li>\n";
    html += "<li>rate=10 variable: rate=10</li>\n";
    html += "</ul>";
    html += "\n";
    html += "<h1>Filters</h1>\n\n";
    html += "<ul>";
    for(var filter in ronin.modules["%"].collection){
      html += "<li>"+filter+" ";
      for (i = 0; i < ronin.modules["%"].collection[filter].parameters.length; i++) {
        html += "<b>"+ronin.modules["%"].collection[filter].parameters[i].name+"</b> ";
      }
      html += "</li>\n";
    }
    html += "</ul>";
    html += "\n";
    return "<div class='cat'>"+html+"</div>";
  }

  this.view_presets = function()
  {
    html = "<h1>Presets</h1>\n\n";
    for(var key in ronin.modules["-"].collection){
      html += "<h2>"+key+"</h2><ul>";
      for(var name in ronin.modules["-"].collection[key]){
        html += "<li>"+name+"</li>"
      }
      html += "</ul>\n";
    }

    return "<div class='cat'>"+html+"</div>";
  }

  
  function pad(s,length)
  {
    if(!s){ return s; }
    
    var new_string = s;
    while(new_string.length < length){
      new_string += " ";
    }
    return new_string;
  }
}