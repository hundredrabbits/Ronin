function Terminal(rune)
{
  Module.call(this,">");

  this.element = document.createElement("div");
  this.input = document.createElement("input");
  this.hint_element = document.createElement("div");
  this.logs_element = document.createElement("div");
  this.hint_element.id = "hint";
  this.logs_element.id = "logs";
  this.logs_element.innerHTML = "<log>Hello there</log>";

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
    var setting = command.setting();

    if(method){
      method.run(command);
    }

    if(setting){
      module.settings[setting] = command.values();
      console.log(module.settings)
    }
    this.hint_element.innerHTML = "";
    this.input.value = "";
  }

  this.update = function(value = null)
  {
    this.input.value = value ? value : this.input.value;
    var command = this.cmd();
    var module  = command.module();
    var method  = command.method();

    if(method){
      method.preview(command);
    }
    this.hint_element.innerHTML = "<span class='input'>"+this.input.value+"</span>"+(this.input.value ? " " : "")+(module ? module.hint(method) : this.hint(method));
    ronin.cursor.set_mode(module);
    this.input.focus();
  }

  this.hint = function(method)
  {
    var html = "";
    if(this.input.value){
      for(id in ronin.modules){
        if(this.input.value != ronin.modules[id].name.substr(0,this.input.value.length)){ continue; }
        html += "<span class='module'>"+ronin.modules[id].name+"</span> ";
      }
    }
    else{
      for(id in ronin.modules){
        html += "<span class='module'>"+ronin.modules[id].name+"</span> ";
      }
    }
    return html;
  }

  this.log = function(log)
  {
    this.logs_element.innerHTML = "";
    this.logs_element.appendChild(log.element);
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
}

// Log

function Log(host,message,error = false)
{
  this.host = host;
  this.message = message;
  this.error = error;
  this.element = document.createElement("log");
  this.element.setAttribute("class",error ? "error" : "okay");
  this.element.innerHTML = "<span class='module'>"+host.name+"</span>: "+message;
  console.log(this.host.constructor.name,this.message);
}