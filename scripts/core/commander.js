function Commander(element,element_input)
{
  this.element = element;
  this.element_input = element_input;
  this.hint = new Hint();
  this.storage = [];
  this.storage_index = 0;
  this.always_show = false;
  
  this.query = function(input_str)
  {
    if(input_str.indexOf(";") > 0){
      var multi = input_str.split(";");
      for (i = 0; i < multi.length; i++) {
        this.query(multi[i]);
      }
    }
    else{
      this.active(input_str);
    }
  }
  
  this.active = function(content)
  {
    var key = content[0];
    var cmd = new Command(content.substring(1).split(" "));
    
    if(ronin.modules[key]){
      ronin.modules[key].active(cmd);
    }
    
    this.hide();
    
    ronin.history.add(content);
  }
  
  this.passive = function(content)
  {
    var key = content[0];
    var cmd = new Command(content.substring(1).split(" "));
    
    ronin.module = null;
    
    if(ronin.modules[key]){
      ronin.modules[key].passive(cmd);
      ronin.module = ronin.modules[key];
    }
    this.hint.update(ronin.module,cmd);
  }
  
  //
  
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
  
}
