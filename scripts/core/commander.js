function Commander(element,element_input)
{
  this.element = element;
  this.element_input = element_input;
  this.hint = new Hint();
  this.storage = [];
  this.storage_index = 0;
  this.always_show = false;

  this.queue = [];
  
  this.query = function(input_str)
  {
    if(input_str.indexOf(";") > 0){
      this.queue = input_str.split(";");
    }
    else{
      this.queue = [];
      this.queue.push(input_str)
    }
    this.run();
    this.hide();
  }

  this.run = function()
  {
    if(!commander.queue[0]){ console.log("Finished queue"); return; }

    active(commander.queue[0].trim());
    commander.queue.shift();

    setTimeout(function(){ commander.run(); }, 100);
  }

  function active(content)
  {
    console.info(content);
    var key = content[0];
    var cmd = new Command(content.substring(1).trim().split(" "));
    
    if(ronin.modules[key]){
      ronin.modules[key].active(cmd);
    }
    
    ronin.history.add(content);
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
    this.hint.update();
  }

  this.cmd = function()
  {
    var content = this.element_input.value.trim();
    var key = content[0];
    var cmd = new Command(content.substring(1).trim().split(" "));
    return cmd;
  }
  
  //
  
  this.show = function()
  {
    this.element.setAttribute('class','visible');
    this.element_input.focus();
    this.element_input.value = "";
  }

  this.always = function() {
    this.always_show = !this.always_show;
  }
  
  this.hide = function()
  {
    if (!this.always_show) {
      this.element.setAttribute('class','hidden');
    }
    this.element_input.value = "";
  }
  
  this.clear = function()
  {
    this.element_input.value = "";
  }
  
  this.next_cmd = function()
  {
    this.storage_index += this.storage_index < this.storage.length ? 1 : 0;
    this.element_input.value = this.storage[this.storage_index] ? this.storage[this.storage_index] : "";
  }
  
  this.prev_cmd = function()
  {
    this.storage_index -= this.storage_index < 1 ? 0 : 1;
    this.element_input.value = this.storage[this.storage_index];
  } 
}