function Docs()
{
  this.export = function()
  {
    var html = "";

    html += this.print_intro();

    html += "## Cursor\n";
    html += "Include `$` in a query and click on the canvas to inject the cursor position in the query.\n";
    html += "- `$ click` inject a **Pos**.\n";
    html += "- `$+ click` inject a **Pos**, and append `$+` for multiple positions.\n";
    html += "- `$ shift click` inject a **Rect**.\n";
    html += "- `#$ click` inject a **Color**.\n";
    html += "- `x` swap **Color** with secondary.\n\n";
    html += "- `z` draw under render.\n\n";
    
    html += "## Modules\n";
    html += this.print_modules(ronin.modules);
    html += this.print_license();

    fs.writeFile("/Users/VillaMoirai/Github/HundredRabbits/Ronin/README.md", html, (err) => {
      if(err){ alert("An error ocurred creating the file "+ err.message); return; }
    }); 

    return html;
  }

  this.print_intro = function()
  {
    html = "# Ronin\n";
    html += "Ronin is a graphic design tool, to paint, resize and export graphics.\n\n";
    html += "<img src='https://raw.githubusercontent.com/hundredrabbits/Ronin/master/PREVIEW.jpg' width='600'/>\n\n";
    return html;
  }

  this.print_modules = function(modules)
  {
    var html = "";

    for(module_name in modules){
      var module = modules[module_name];
      html += "## "+module_name+"\n\n";
      html += module.docs+"\n\n";
      html += this.print_methods(module.methods)+"\n";
    }
    return html+"\n";
  }

  this.print_methods = function(methods)
  {
    var html = "### Methods\n";

    for(method_name in methods){
      var method = methods[method_name];
      html += "- `"+method_name+":"+method.params+"` "+method.info+"\n";
    }
    return html;
  }

  this.print_license = function()
  {
    html = "## License\n";
    html += "See the [LICENSE](LICENSE.md) file for license rights and limitations.\n";
    return html;
  }
}