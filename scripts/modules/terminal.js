function Terminal(rune)
{
  Module.call(this,">");

  this.element = document.createElement("div");
  this.textarea = document.createElement("textarea");
  this.hint_element = document.createElement("hint");
  this.logs_element = document.createElement("logs");
  this.menu_element = document.createElement("menu");
  this.status_element = document.createElement("status");

  this.history = [];
  this.locks = [];

  this.add_method(new Method("save",["text"]));
  this.add_method(new Method("load",["path"]));

  // Module
  this.install = function(cmd)
  {
    this.element.appendChild(this.textarea);
    this.element.appendChild(this.hint_element);
    this.element.appendChild(this.logs_element);
    this.element.appendChild(this.menu_element);
    this.element.appendChild(this.status_element);

    this.status_element.innerHTML = "Ready.";
    this.textarea.value = ""
    this.hint_element.innerHTML = "";

    this.validation_timer();
    this.timer = 20;
  }

  this.timer = 0;
  this.history = "";

  this.validation_timer = function()
  {
    this.timer += 1;
    setTimeout(function(){ ronin.terminal.validation_timer(); }, 100);
    this.validate();
  }

  this.has_changed = function()
  {
    return ronin.terminal.history != ronin.terminal.textarea.value ? true : false;
  }

  this.validate = function()
  {
    if(this.timer < 10){ return; }

    if(ronin.terminal.has_changed() == true){ 
      ronin.terminal.run();
    }
    this.history = this.textarea.value;
    this.timer = 0;
  }

  this.run = function()
  {
    this.hint_element.innerHTML = "";
    var queue = ronin.terminal.textarea.value.split("\n")
    for(id in queue){
      this.hint_element.innerHTML += "<line><text class='input'>"+this.syntax_highlight(queue[id])+"</text><text class='status'>"+this.run_line(queue.length - id,queue[id])+"</text></line><br />";
    }
  }

  this.run_line = function(id,line)
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
      return ronin[module_name][method_name](parameters,id == 1 ? true : false);
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

  this.syntax_highlight = function(line)
  {
    var line = line;
    
    // Method
    if(line.indexOf(".") > 0){
      var module = line.split(".")[0];
      var method = line.split(".")[1].split(" ")[0];
      line = line.replace(module,"<span class='module'>"+module+"</span>");  
      line = line.replace(method,"<span class='method'>"+method+"</span>");  
    }

    // Setting
    if(line.indexOf(":") > 0){
      var module = line.split(":")[0];
      var setting = line.split(":")[1].split(" ")[0];
      line = line.replace(module,"<span class='module'>"+module+"</span>");  
      line = line.replace(setting,"<span class='setting'>"+setting+"</span>");  
    }
    
    return line;
  }

  this.update_active_line = function(new_line)
  {
    var lines = this.textarea.value.split("\n");

    lines[lines.length-1] = new_line;

    this.textarea.value = lines.join("\n");
    this.timer = 10;
  }

  this.update = function()
  {
    if(ronin.terminal.has_changed() == true){ 
      this.status_element.innerHTML = "Changes Pending.";
    }
    else{ 
      this.status_element.innerHTML = "Idle.";
    }

    this.status_element.innerHTML += "<span class='details'>"+this.textarea.value.length+"c "+this.textarea.value.split("\n").length+"l</span>";

    this.hint_element.innerHTML = "";
    var queue = ronin.terminal.textarea.value.split("\n")
    for(id in queue){
      this.hint_element.innerHTML += "<line><text class='input'>"+this.syntax_highlight(queue[id])+"</text></line><br />";
    }
  }

  this.log = function(log)
  {

  }

  this.load = function readTextFile(name)
  {    
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
                ronin.terminal.textarea.value = allText;
            }
        }
    }
    rawFile.send(null);
  }

  this.cmd = function()
  {
    var lines = ronin.terminal.textarea.value.split("\n");
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