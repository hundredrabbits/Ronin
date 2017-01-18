function Help(rune)
{
  Module.call(this,rune);
  
  this.active = function(cmd)
  {
    var w = window.open('about:blank','image from canvas');
    var html = "";
    html += this.view_intro();
    html += this.view_controls();
    html += this.view_modules();
    html += this.view_filters();
    html += this.view_units();
    html += this.view_presets();
    w.document.write("<title>Help</title><style>body { font-size:11px;background:#111; color:#fff; padding:20px} pre { font-family:Monaco,Courier} pre div{ border-left:5px solid #222; padding-left:20px;} pre div b { text-decoration:underline; color:#999; font-weight:normal} pre div i { font-style:normal; color:#72dec2}</style><pre>"+html+"</pre>");
  }
  
  //

  this.view_intro = function()
  {
    var html = "Ronin\n\n";
    html += "<div>Ronin is a drawing application and visual language. \nLaunch Ronin and press <b>:</b> to display the command prompt.</div>\n";

    return html;
  }

  this.view_controls = function()
  {
    html = "Controls\n\n";
    html += "<div>";
    html += pad("ctrl",20)+"Draw Overlays\n";
    html += pad("alt",20)+"Drag Surface\n";
    html += pad("shift",20)+"Erase\n";
    html += pad("shift+ctrl",20)+"Eyedrop\n";
    html += pad("shift+alt",20)+"Move Layer\n";
    html += "</div>";
    html += "\n";
    return html;
  }
  
  this.view_modules = function()
  {
    html = "Modules\n\n";
    html += "<div>";
    Object.keys(ronin.modules).forEach(function (key) {
      var parameters = "";
      html += pad("<i>"+key+"</i> "+ronin.modules[key].constructor.name,27);
      for (i = 0; i < ronin.modules[key].parameters.length; i++) {
        html += "<b>"+ronin.modules[key].parameters[i].name+"</b> ";
      }
      html += "\n";
    });
    html += "</div>";
    html += "\n";
    
    return html;
  }

  this.view_filters = function()
  {
    html = "Filters\n\n";
    html += "<div>";
    for(var filter in ronin.modules["%"].collection){
      html += pad(filter,20);
      for (i = 0; i < ronin.modules["%"].collection[filter].parameters.length; i++) {
        html += "<b>"+ronin.modules["%"].collection[filter].parameters[i].name+"</b> ";
      }
      html += "\n";
    }
    html += "</div>";
    html += "\n";
    return html
  }

  this.view_units = function()
  {
    html = "Units\n\n";
    html += "<div>";
    html += pad("5",20)+"value: 5\n";
    html += pad("5,7",20)+"position: 5x 7y\n";
    html += pad("7x9",20)+"rect: 5w 7h\n";
    html += pad("#ff0000",20)+"color: red\n";
    html += pad("45'",20)+"degree: 45/365\n";
    html += pad("rate=10",20)+"variable: rate=10\n";
    html += "</div>";
    html += "\n";
    return html;
  }

  this.view_presets = function()
  {
    html = "Presets\n\n";
    html += "<div>";
    html += "Brushes\n";
    html += pad("Radial Brush(8)",20)+"> 600,400 45';> 600,400 90';> 600,400 135';> 600,400 180';> 600,400 225';> 600,400 270';> 600,400 315'\n";
    html += pad("Radial Brush(6)",20)+"> 600,400 60';> 600,400 120';> 600,400 180';> 600,400 240';> 600,400 300'\n";
    html += pad("Symmetric Brush(XY)",20)+"> 400x 3\n";
    html += pad("Angular brush",20)+"> 400x 1,1;> 400x 2,2;> 400x 3,3; > 1,1;> 2,2;> 3,3;\n";

    html += "\nGraphics\n";
    html += pad("Watermark",20)+"# 1280x720 ; / ../assets/photo.jpg 1280x 0,0 ; / ../assets/logo.png 60x60 20,640\n";
    html += pad("Ronin Logo",20)+"+ M150,53 A-96,97 0 0,0 246,150 M150,246 A97,-96 0 0,0 53,150 M53,101 A-48,-48 0 0,0 101,53 M246,101 A48,-48 0 0,1 198,53 M53,198 A-48,48 0 0,1 101,246 M246,198 A48,48 0 0,0 198,246 stroke_width=45 line_cap=square stroke_color=black\n";
    html += pad("Circle",20)+"+ M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0\n";
    html += pad("Multiple Circles",20)+"+ M 64, 64 m -50, 0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0;+ M 64, 64 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0;+ M 64, 64 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0;+ M 64, 64 m -35, 0 a 35,35 0 1,0 70,0 a 35,35 0 1,0 -70,0;+ M 64, 64 m -30, 0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0;+ M 64, 64 m -25, 0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0;+ M 64, 64 m -20, 0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0;+ M 64, 64 m -15, 0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0;+ M 64, 64 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0;+ M 64, 64 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0\n";
    html += "</div>";
    return html;
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