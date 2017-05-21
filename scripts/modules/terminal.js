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

    var command = this.cmd();
    var module  = command.module();
    var method  = command.method();

    if(method){
      method.run(command);
    }
    this.hint_element.innerHTML = "";
    this.input.value = "";
  }

  this.update = function()
  {
    var command = this.cmd();
    var module  = command.module();
    var method  = command.method();

    if(method){
      method.preview(command);
    }
    this.hint_element.innerHTML = "<span class='input'>"+this.input.value+"</span> "+(module ? module.hint() : this.hint());
  }

  this.hint = function()
  {
    var html = "";
    for(id in ronin.modules){
      html += ronin.modules[id].name+" ";
    }
    return html;
  }

  this.cmd = function()
  {
    return new Command(this.input.value);
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

  this.parsed_input = function()
  {
    var content = this.input.value;

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

    return {module_name: module_name, method_name: method_name, setting_name: setting_name, parameters: parameters};
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