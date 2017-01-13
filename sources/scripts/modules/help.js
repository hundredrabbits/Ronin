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
    html += "```\n# 1280x800 ; / ../assets/photo.jpg 1280x 0,0 ; / assets/logo.png 60x60 20,720\n```\n";

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