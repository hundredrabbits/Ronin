function Help(rune)
{
  Module.call(this,rune);

  this.view = document.createElement("div");
  
  this.active = function(cmd)
  {
    s = "hello";

    lines = [];

    // Modules
    // TODO: Have the modules return their own help string
    lines.push("Modules: ");
    Object.keys(ronin.modules).forEach(function (key) {
      html = "";
      var parameters = "";
      html += "<i>"+key+"</i> "+ronin.modules[key].constructor.name+" ";
      for (i = 0; i < ronin.modules[key].parameters.length; i++) {
        html += "<b>"+ronin.modules[key].parameters[i].name+"</b> ";
      }
      lines.push(html);
    });

    // Filters
    lines.push("Filters: ");
    for(var filter in ronin.modules["%"].collection){
      html = filter+" ";
      for (i = 0; i < ronin.modules["%"].collection[filter].parameters.length; i++) {
        html += "<b>"+ronin.modules["%"].collection[filter].parameters[i].name+"</b> ";
      }
      lines.push(html);
    }

    // Controls
    lines.push("Controls: ");
    lines.push("<b>ctrl</b> Draw Overlays\n");
    lines.push("<b>alt</b> Drag Surface\n");
    lines.push("<b>shift</b> Erase\n");
    lines.push("<b>shift+ctrl</b> Eyedrop\n");
    lines.push("<b>shift+alt</b> Move Layer\n");

    // Units
    lines.push("Units: ");
    var units = [new Value(), new Position(), new Rect(), new Color(), new Angle(), new Variable(), new Bang()]
    for(key in units){
      lines.push(units[key].render());
    }

    // Print
    for(line in lines){
      ronin.terminal.log(new Log(this,lines[line]));
    }
  }
  
  //


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