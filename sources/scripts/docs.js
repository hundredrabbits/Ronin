function Docs()
{
  this.export = function()
  {
    var html = "";

    html += this.print_intro();
    html += "## Modules\n";
    html += this.print_modules(ronin.modules);

    html += this.print_license();

    var str = html;

    dialog.showSaveDialog((fileName) => {
      if (fileName === undefined){ return; }
      fs.writeFile(fileName+".md", str, (err) => {
        if(err){ alert("An error ocurred creating the file "+ err.message); return; }
      });
    }); 

    return html;
  }

  this.print_intro = function()
  {
    html = "# Ronin\n";
    html += "Ronin is a simple open-source graphic design tool.\n\n";
    html += "<img src='https://raw.githubusercontent.com/hundredrabbits/Ronin/master/PREVIEW.jpg' width='600'/>\n\n";
    return html;
  }

  this.print_modules = function(modules)
  {
    var html = "";

    for(module_name in modules){
      var module = modules[module_name];
      html += "## "+module_name+"\n";
      html += this.print_settings(module.settings)+"\n";
      html += this.print_methods(module.methods)+"\n";
      html += this.print_ports(module.ports)+"\n";
    }
    return html+"\n";
  }

  this.print_settings = function(settings)
  {
    var html = "### Settings\n";

    for(setting_name in settings){
      var setting_val = settings[setting_name];
      html += "- `"+setting_name+"`, default "+setting_val+"\n";
    }
    return html;
  }

  this.print_methods = function(methods)
  {
    var html = "### Methods\n";

    for(method_name in methods){
      var method_val = methods[method_name];
      html += "- `"+method_name+":`, no details.\n";
    }
    return html;
  }

  this.print_ports = function(ports)
  {
    var html = "### Ports\n";

    for(port_name in ports){
      var port = ports[port_name];
      console.log(ports);
      html += "- `"+(port.input ? '->' : '')+""+port.name+""+(port.output ? '->' : '')+"` **("+port.value+"/"+port.max+")** "+port.docs+".\n";
    }
    return html;  
  }

  this.print_license = function()
  {
    html = "## License\n";
    html += "See the [LICENSE](LICENSE.md) file for license rights and limitations (CC).\n";
    return html;
  }
}