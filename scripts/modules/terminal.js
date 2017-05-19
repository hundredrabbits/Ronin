function Terminal(rune)
{
  Module.call(this,">");

  this.element = document.createElement("div");
  this.input = document.createElement("input");
  this.hint_element = document.createElement("hint");
  this.logs_element = document.createElement("logs");

  this.history = [];
  this.locks = [];

  this.add_method(new Method("save",["text"]));
  this.add_method(new Method("load",["path"]));

  // Module
  this.install = function(cmd)
  {
    this.element.appendChild(this.input);
    this.element.appendChild(this.hint_element);
    this.element.appendChild(this.logs_element);
    
    this.input.value = ""
    this.hint_element.innerHTML = "";
  }

  this.run = function()
  {
    this.hint_element.innerHTML = "";
    this.run_line(this.input.value,false);
    this.input.value = "";
  }

  this.run_line = function(line,is_preview)
  {
    var content = line;

    if(content.trim() == ""){ ronin.cursor.set_mode(ronin.brush); return "~"; }
    if(content.trim()[0] == "~"){ return "~"; }

    if(content.indexOf(".") > -1){
      var module_name = content.split(" ")[0].split(".")[0]
    }
    else if(content.indexOf(":") > -1){
      var module_name = content.split(" ")[0].split(":")[0]
    }
    else{
      var module_name = content.split(" ")[0];
    }

    var method_name = content.indexOf(".") > -1 ? content.split(" ")[0].split(".")[1] : "default";
    var setting_name = content.indexOf(":") > -1 ? content.split(" ")[0].split(":")[1] : null;

    var parameters = content.split(" "); parameters.shift();
    var parameters = new Command(parameters);

    ronin.cursor.set_mode(ronin[module_name]);

    if(ronin[module_name] && ronin[module_name][method_name]){
      return ronin[module_name][method_name](parameters,is_preview);
    }
    else if(ronin[module_name] && ronin[module_name].settings[setting_name]){
      return ronin[module_name].update_setting(setting_name,parameters);
    }
    else if(ronin["render"].collection[method_name]){
      return ronin["render"].collection[method_name].render(parameters);
    }
    else if(setting_name){
      return 0, "Unknown Setting";
    }
    else if(ronin[module_name]){
      return 0, "Unknown Method";
    }
    else if(module_name == "render"){
      return 0, "Unknown Filter";
    }
    else{
      return 0, "Unknown Module";
    }
    return  0, "Unknown";
  }

  this.log = function(log)
  {

  }

  this.update = function()
  {
    this.hint_element.innerHTML = "<span class='input'>"+this.input.value+"</span> "+this.run_line(this.input.value,true);
  }

  this.filename = "default.rin";

  this.load = function readTextFile(name)
  {    
    this.filename = name;
    var file = "presets/"+name+'?'+new Date().getTime();
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                ronin.terminal.input.value = allText;
            }
        }
    }
    rawFile.send(null);
    ronin.widget.update();
  }

  this.cmd = function()
  {
    var lines = ronin.terminal.input.value.split("\n");
    var last = lines[lines.length-1];
    return new Command(last.split(" "));
  }
}

// Log

function Log(host,message,error = false)
{
  this.host = host;
  this.message = message;
  this.error = error;
  this.element = document.createElement("log");
  this.element.setAttribute("class",error ? "error" : "okay");
  this.element.innerHTML = "<span class='rune'>"+(host.rune ? host.rune : ">")+"</span> "+message;
  console.log(this.host.constructor.name,this.message);
}