function Terminal(rune)
{
  Module.call(this);

  this.element = document.createElement("div");
  this.input = document.createElement("input");
  this.hint_element = document.createElement("div");
  this.logs_element = document.createElement("div");
  this.hint_element.id = "hint";
  this.logs_element.id = "logs";
  this.logs_element.innerHTML = "<log>Hello there</log>";

  this.history = [];
  this.locks = [];

  this.add_method(new Method("load",["file_name.rin"]));

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
      module.settings[setting].update(command.values());
      this.log(new Log(module,module.settings[setting]));
    }
    this.hint_element.innerHTML = "";
    this.input.value = "";
    this.update();
  }

  this.update = function(value = null, preview = true)
  {
    if(value){ this.input.value = value; this.input.focus(); }

    var command = this.cmd();
    var module  = command.module();
    var method  = command.method();
    var autocomplete = this.find_autocomplete(command,module,method);

    if(method && preview){
      method.preview(command);
    }

    this.hint_element.innerHTML = "<span class='input'>"+this.input.value+"</span>"+(autocomplete ? '<span class="autocomplete">'+autocomplete+'</span>' : '')+(this.input.value ? " > " : "")+(module ? module.hint(method) : ronin.hint(method));
    ronin.cursor.update();
  }

  this.run_multi = function(lines)
  {
    lines = lines.split(";");
    if(!ronin.terminal.is_locked){
      target_line = lines.shift();
      this.run(new Command(target_line));
    }

    if(lines.length > 0){ setTimeout(function(){ ronin.terminal.run_multi(lines.join(";")) }, 50); }
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

  this.load = function(cmd,preview = false)
  {
    if(preview){ return; }

    ronin.load(cmd.values());

    return "Loading "+cmd.values();
  }

  this.find_autocomplete = function()
  {
    html = ""

    var entry = this.input.value;
    var module = this.cmd().module();
    var method = entry.indexOf(".") > -1 ? entry.split(".")[1] : null;

    if(entry.length == 0){ return null; }

    if(module && method){
      for(id in module.methods){
        if(method == module.methods[id].name){ break; }
        if(method == module.methods[id].name.substr(0,method.length)){ return module.methods[id].name.replace(method,""); }
      }
    }
    else{
      for(id in ronin.modules){
        if(entry == ronin.modules[id].name){ break; }
        if(entry == ronin.modules[id].name.substr(0,entry.length)){ return ronin.modules[id].name.replace(entry,""); }
      }
    }
    return null;
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