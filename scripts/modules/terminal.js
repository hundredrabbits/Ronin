function Terminal(rune)
{
  Module.call(this,rune);

  this.element = null;
  this.input_element = document.createElement("input");
  this.hint_element = document.createElement("hint");
  this.logs_element = document.createElement("logs");
  this.menu_element = document.createElement("menu");

  this.history = [];

  // Module
  this.install = function(cmd)
  {
    this.element.appendChild(this.input_element);
    this.element.appendChild(this.hint_element);
    this.element.appendChild(this.logs_element);
    this.element.appendChild(this.menu_element);

    this.hint_element.innerHTML = "_";

    this.update_log();
  }

  this.active = function(cmd)
  {
  }
  
  this.passive = function(content)
  {
    var key = content[0];
    var cmd = this.cmd();
    
    ronin.module = null;
    this.hint_element.innerHTML = "";
    
    if(ronin.modules[key]){
      ronin.modules[key].passive(cmd);
      ronin.module = ronin.modules[key];
      ronin.cursor.set_mode(ronin.module);
      this.update_hint(content);
    }
    else{
      ronin.cursor.set_mode(ronin.brush);
    }
  }

  this.cmd = function()
  {
    var content = this.input_element.value.trim();
    var key = content[0];
    var cmd = new Command(content.substring(1).trim().split(" "));
    return cmd;
  }

  // Queue

  this.queue = [];
  
  this.query = function(input_str)
  {
    this.input_element.value = "";

    if(input_str.indexOf(";") > 0){
      this.queue = input_str.split(";");
    }
    else{
      this.queue = [];
      this.queue.push(input_str)
    }
    this.run();
  }

  this.run = function()
  {
    if(!ronin.terminal.queue[0]){ console.log("Finished queue"); return; }

    active(ronin.terminal.queue[0].trim());
    ronin.terminal.queue.shift();

    setTimeout(function(){ ronin.terminal.run(); }, 100);
  }

  function active(content)
  {
    var key = content[0];
    var cmd = new Command(content.substring(1).trim().split(" "));

    if(ronin.modules[key]){
      ronin.modules[key].update_settings(cmd);
      ronin.modules[key].run_methods(cmd);
      // ronin.modules[key].active(cmd);
      ronin.terminal.history.push(content);
      ronin.terminal.history_index = ronin.terminal.history.length-1;
      ronin.terminal.update_menu();
    }
    else{
      ronin.terminal.log(new Log(ronin.terminal,"Unknown module: "+key));
    }    
  }

  //

  this.logs = [];

  this.log = function(log)
  {
    this.logs.push(log);
  }

  this.update_log = function()
  {
    if(ronin.terminal.logs[0]){
      ronin.terminal.logs_element.appendChild(ronin.terminal.logs[0].element);
      ronin.terminal.logs.shift();
    }

    setTimeout(function(){ ronin.terminal.update_log(); }, 200);
  }

  // Hint

  this.update_hint = function(content = this.input_element.value)
  {
    // ronin.terminal.input_element.setAttribute("style","color:"+ronin.brush.color.hex);

    if(content.indexOf(";") > -1){
      this.hint_element.innerHTML = this.pad(content)+" "+content.split(";").length+" commands";
    }
    else if(ronin.module){
      this.hint_element.innerHTML = ronin.module.hint(content);  
    }
    else if(content == ""){
      this.hint_element.innerHTML = "";
      for(module in ronin.modules){
        this.hint_element.innerHTML += "<b>"+module+"</b> "+ronin.modules[module].constructor.name+" ";
      }
    } 
    else{
      this.hint_element.innerHTML = this.pad(content)+" Unknown Command."
    }
  }

  this.update_menu = function()
  {
    this.menu_element.innerHTML = ronin.terminal.history.length;
  }

  this.key_escape = function()
  {
    this.input_element.value = "";
  }

  this.key_arrow_up = function()
  { 
    this.history_index -= 1;

    if(this.history_index < 0){ this.history_index = 0; }
    
    ronin.terminal.input_element.value = "> "+ronin.terminal.history[this.history_index];
  }

  this.key_arrow_down = function()
  { 
    this.history_index += 1;

    if(this.history_index >= this.history.length){ this.history_index = this.history.length-1; }

    ronin.terminal.input_element.value = "> "+ronin.terminal.history[this.history_index];
  }

  this.pad = function(input)
  {
    var s = "";
    for (i = 0; i < input.length+1; i++){
      s += "_";
    }
    return "<span style='color:#000'>"+s+"</span>";
  }
}

// Log

function Log(host,message,type = "default")
{
  this.element = document.createElement("log");
  this.element.setAttribute("class",type);
  this.element.innerHTML = "<span class='rune'>"+host.rune+"</span> "+message;
}