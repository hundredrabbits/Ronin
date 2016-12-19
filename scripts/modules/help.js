function Help(rune)
{
  Module.call(this,rune);
  
  this.active = function(cmd)
  {
    var w = window.open('about:blank','image from canvas');
    var html = "";
    html += this.view_modules();
    html += this.view_cursors();
    html += "<hr />"
    w.document.write("<title>Help</title><style>body { font-size:11px;background:#555; color:#ccc; padding:50px} pre { width:300px; float:left} hr { clear:both}</style>"+html+"");
  }
  
  //
  
  this.view_modules = function()
  {
    html = "  Modules\n\n";
    Object.keys(ronin.modules).forEach(function (key) {
      html += key+" <b>"+ronin.modules[key].constructor.name+"</b>\n";
      html += ""
      for (i = 0; i < ronin.modules[key].parameters.length; i++) {
        html += "  "+pad(ronin.modules[key].parameters[i].name,14);
        html += pad(new ronin.modules[key].parameters[i]().example,14)+" \n";
      }
      for (i = 0; i < ronin.modules[key].variables.length; i++) {
        html += "  "+pad(ronin.modules[key].variables[i].key,14)+"= ";
        for (c = 0; c < ronin.modules[key].variables[i].candidates.length; c++) {
          html += ronin.modules[key].variables[i].candidates[c]+" ";
        }
        html += "\n";
      }
      html += "\n"
    });
    
    return "<pre>"+html+"</pre>";
  }
  
  this.view_cursors = function()
  {
    html = "  Cursors\n\n";
    // Object.keys(ronin.modules).forEach(function (key) {
    //   html += key+" <b>"+ronin.modules[key].constructor.name+"</b>\n";
    //   html += ""
    //   for (i = 0; i < ronin.modules[key].parameters.length; i++) {
    //     html += "  "+pad(ronin.modules[key].parameters[i].name,14);
    //     html += pad(new ronin.modules[key].parameters[i]().example,14)+" \n";
    //   }
    //   for (i = 0; i < ronin.modules[key].variables.length; i++) {
    //     html += "  "+pad(ronin.modules[key].variables[i].key,14)+"= ";
    //     for (c = 0; c < ronin.modules[key].variables[i].candidates.length; c++) {
    //       html += ronin.modules[key].variables[i].candidates[c]+" ";
    //     }
    //     html += "\n";
    //   }
    //   html += "\n"
    // });
    
    return "<pre>"+html+"</pre>";
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