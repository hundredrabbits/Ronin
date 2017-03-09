function Terminal(rune)
{
  Module.call(this,rune);

  this.element = null;
  this.input_element = document.createElement("input");
  this.hint_element = document.createElement("hint");
  this.logs_element = document.createElement("logs");

  // Module
  this.install = function(cmd)
  {
    this.element.appendChild(this.input_element);
    this.element.appendChild(this.hint_element);
    this.element.appendChild(this.logs_element);

    this.hint_element.innerHTML = "_";
  }

  this.active = function(cmd)
  {
  }
  
  this.passive = function(content)
  {
    var key = content[0];
    var cmd = new Command(content.substring(1).trim().split(" "));
    
    ronin.module = null;
    
    if(ronin.modules[key]){
      ronin.modules[key].passive(cmd);
      ronin.module = ronin.modules[key];
      ronin.cursor.set_mode(ronin.module);
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
      ronin.modules[key].active(cmd);
      ronin.history.add(content);
    }
    else{
      ronin.terminal.log(new Log(ronin.terminal,"Unknown module: "+key));
    }    
  }

  this.log = function(log)
  {
    this.logs_element.appendChild(log.element);
  }
}

// Log

function Log(host,message)
{
  this.element = document.createElement("log");
  this.element.innerHTML = "<span class='rune'>"+host.rune+"</span> "+message;
}