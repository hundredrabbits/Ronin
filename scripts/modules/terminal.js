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
  this.add_method(new Method("display",["mini/hide/full"]));

  // Module
  this.install = function(cmd)
  {
    this.element.appendChild(this.textarea);
    this.element.appendChild(this.hint_element);
    this.element.appendChild(this.logs_element);
    this.element.appendChild(this.menu_element);
    this.element.appendChild(this.status_element);

    this.status_element.innerHTML = "Ready.";
    this.textarea.value = "frame.select background\nframe.resize 400x400\nbrush:color #ff0000\nbrush.add_pointer 1,1\nbrush.add_pointer 2,2\nlayer.fill #A1A1A1\nrender.stencil #72dec2\ntype:size 50\ntype.write 50,150 \"RONIN\"\ntype:size 15\ntype.write 55,180 \"VER 0.1\""
    this.hint_element.innerHTML = "";

    this.validation_timer();
    this.load("default.rin");
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

    this.update_status();

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

    if(content.trim() == ""){ return "~"; }
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

    if(id == 1){ ronin.cursor.set_mode(ronin[module_name]); }

    if(ronin[module_name] && ronin[module_name][method_name]){
      return ronin[module_name][method_name](parameters,id == 1 ? true : false);
    }
    else if(ronin[module_name] && ronin[module_name].settings[setting_name]){
      return ronin[module_name].update_setting(setting_name,parameters);
    }
    else if(ronin["render"].collection[method_name]){
      return ronin["render"].collection[method_name].render(parameters);
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
    return line;
  }

  this.update_active_line = function(new_line)
  {
    var lines = this.textarea.value.split("\n");

    lines[lines.length-1] = new_line;

    this.textarea.value = lines.join("\n");
    this.timer = 10;
  }

  this.update_status = function()
  {
    if(ronin.terminal.has_changed() == true){ 
      this.status_element.innerHTML = "Changes Pending.";
    }
    else{ 
      this.status_element.innerHTML = "Idle.";
    }

    this.status_element.innerHTML += "<span class='details'>"+this.textarea.value.length+"c "+this.textarea.value.split("\n").length+"l</span>";
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