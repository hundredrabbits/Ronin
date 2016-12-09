function Commander(element,element_input)
{
  this.element = element;
  this.element_input = element_input;
  this.cmd = null;
  this.storage = [];
  this.storage_index = 0;
  this.always_show = false;
  
  this.show = function()
  {
    this.element.setAttribute('class','visible');
    this.element_input.focus();
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
  
  this.active = function(content)
  {
    this.storage.push(content.join(" "));
    this.storage_index = this.storage.length;
    
    var key = content[0][0];
    content[0] = content[0].slice(1);
    var cmd = new Command(content);
    
    if(ronin.modules[key]){
      ronin.modules[key].active(this.cmd);
    }
    
    switch(key) {
      case "~":
        this.always();
        break;
    }
    this.hide();
  }
  
  this.passive = function(content)
  {
    var key = content[0][0];
    content[0] = content[0].slice(1);
    this.cmd = new Command(content);
    ronin.module = null;
    
    if(ronin.modules[key]){
      ronin.modules[key].passive(this.cmd);
      ronin.module = ronin.modules[key];
    }
  }
}
