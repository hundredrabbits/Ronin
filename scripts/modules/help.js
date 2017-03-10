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
}