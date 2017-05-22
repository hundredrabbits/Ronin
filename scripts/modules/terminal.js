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

  this.run = function(target_cmd)
  {
    var command = target_cmd ? target_cmd : this.cmd();
    var module  = command.module();
    var method  = command.method();
    var setting = command.setting();

    console.info(command.content); // Don't remove

    if(method){
      method.run(command);
    }
    if(setting){
      module.settings[setting] = command.values();
      this.log(new Log(module,setting+" = "+command.values()));
    }
    this.hint_element.innerHTML = "";
    this.input.value = "";
    this.update();
  }

  this.update = function(value = null)
  {
    if(value){ this.input.value = value; this.input.focus(); }

    var command = this.cmd();
    var module  = command.module();
    var method  = command.method();

    if(method){
      method.preview(command);
    }
    this.hint_element.innerHTML = "<span class='input'>"+this.input.value+"</span>"+(this.input.value ? " " : "")+(module ? module.hint(method) : this.hint(method));
    ronin.cursor.set_mode(module);
  }

  this.run_multi = function(lines)
  {
    if(!ronin.terminal.is_locked){
      lines = lines.split(";");
      target_line = lines.shift();
      this.run(new Command(target_line));
    }

    if(lines.length > 0){ setTimeout(function(){ ronin.terminal.run_multi(lines.join(";")) }, 250); }
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
}

// Log

function Log(host = null,message,error = false)
{
  this.host = host;
  this.message = message;
  this.error = error;
  this.element = document.createElement("log");
  this.element.setAttribute("class",error ? "error" : "okay");
  this.element.innerHTML = "<span class='module'>"+(this.host ? this.host.name : "Ronin")+"</span> "+message;
  console.log(this.host ? this.host.name : "Ronin",this.message);
}