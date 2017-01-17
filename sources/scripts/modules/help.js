function Help(rune)
{
  Module.call(this,rune);
  
  this.active = function(cmd)
  {
    var w = window.open('about:blank','image from canvas');
    var html = "";
    html += this.view_intro();
    html += this.view_modules();
    html += this.view_units();
    html += this.view_presets();
    w.document.write("<title>Help</title><style>body { font-size:11px;background:#fff; color:#000; padding:10px} pre {}</style><pre>"+html+"</pre>");
  }
  
  //

  this.view_intro = function()
  {
    var html = "# Ronin\n## Basics\nRonin is a web based drawing application and visual language. Launch Ronin and press **:**(colon) to display the command prompt. \n```\n:\n```\n";

    html += "### Controls\n";
    html += "```\nctrl                              ; Draw Overlays\nalt                               ; Drag Surface\nshift                             ; Erase\nshift+ctrl                        ; Eyedrop\nshift+alt                         ; Move Layer\n```\n";
    return html;
  }
  
  this.view_modules = function()
  {
    html = "## Modules\n";
    Object.keys(ronin.modules).forEach(function (key) {
      html += "### "+key+" "+ronin.modules[key].constructor.name+"\n";
      html += ronin.modules[key].docs+"\n";
      html += "- Parameters: ";
      for (i = 0; i < ronin.modules[key].parameters.length; i++) {
        html += "`"+ronin.modules[key].parameters[i].name+"` ";
      }
      html += "\n";
      html += "- Variables: ";
      for(var key in ronin.modules[key].variables){
        html += "`"+key+"` ";
      }
      html += "\n\n";
    });
    
    return html;
  }

  this.view_units = function()
  {
    html = "## Units\n";
    html += "```\n5                                 ; value:    5\n5,7                               ; position: 5x 7y\n7x9                               ; rect:     7w 9h\n#ff0000                           ; color:    red\n0..5                              ; random:   0.0-5.0\n45'                               ; degree:   45/365\nrate=10                           ; variable: rate = 10\n```\n";
    return html;
  }

  this.view_presets = function()
  {
    html = "## Presets\n";
    html += "### Radial Brush\n";
    html += "```\n# 8 strands\n> 600,400 45';> 600,400 90';> 600,400 135';> 600,400 180';> 600,400 225';> 600,400 270';> 600,400 315'\n# 6 strands\n> 600,400 60';> 600,400 120';> 600,400 180';> 600,400 240';> 600,400 300'\n```\n"
    html += "### Symmetry Brush\n";
    html += "```\n# XY\n> 400x 3\n# Angular brushes\n> 400x 1,1;> 400x 2,2;> 400x 3,3; > 1,1;> 2,2;> 3,3;\n```\n"
    html += "### Angular Brush\n";
    html += "```\n# Light\n> 1,1;> 2,2;> 3,3;> 4,4\n# Hard\n> 2,2;> 4,4;> 6,6;> 8,8\n# Symmetric Light\n> 1,1 600x;> 2,2 600x;> 3,3 600x;> 4,4 600x\n```\n";
    html += "## Templates\n";
    html += "### Watermark\n";
    html += "```\n# 1280x720 ; / ../assets/photo.jpg 1280x 0,0 ; / ../assets/logo.png 60x60 20,640\n```\n";
    html += "## vectors\n";
    html += "### Ronin Logo\n";
    html += "```\n+ M150,53 A-96,97 0 0,0 246,150 M150,246 A97,-96 0 0,0 53,150 M53,101 A-48,-48 0 0,0 101,53 M246,101 A48,-48 0 0,1 198,53 M53,198 A-48,48 0 0,1 101,246 M246,198 A48,48 0 0,0 198,246 stroke_width=45 line_cap=square stroke_color=black\n```\n";
    html += "### A Circle\n";
    html += "```\n+ M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0\n```\n";
    html += "### Many Circles\n";
    html += "```\n+ M 64, 64 m -50, 0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0;+ M 64, 64 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0;+ M 64, 64 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0;+ M 64, 64 m -35, 0 a 35,35 0 1,0 70,0 a 35,35 0 1,0 -70,0;+ M 64, 64 m -30, 0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0;+ M 64, 64 m -25, 0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0;+ M 64, 64 m -20, 0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0;+ M 64, 64 m -15, 0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0;+ M 64, 64 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0;+ M 64, 64 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0\n```\n";

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