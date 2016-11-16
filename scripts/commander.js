function Commander(element,element_input)
{
  this.element = element;
  this.element_input = element_input;
  this.cmd = null;
  this.storage = [];
  this.storage_index = 0;
  
  this.show = function()
  {
    this.element.setAttribute('class','visible');
    this.element_input.focus();
  }
  
  this.hide = function()
  {
    this.element.setAttribute('class','hidden');
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
    
    var key = content[0];
    content.shift();
    var cmd = new Command(content);
    
    switch(key) {
      case "@":
        ronin.canvas.active(cmd);
        break;
      case "$":
        ronin.file.save(cmd);
        break;
      case "/":
        ronin.file.active(cmd);
        break;
      case ">":
        ronin.brush.active(cmd);
        break;
      case "|":
        ronin.overlay.active(cmd);
        break;
      case "-":
        ronin.stroke.active(cmd);
        break;
      case "^": // TODO
        ronin.translate.active(cmd);
        break;
      case "=": // TODO
        ronin.zoom.active(cmd);
        break;
      case "#": // TODO
        ronin.layers.active(cmd);
        break;
      case ":":
        ronin.filter.active(cmd);
        break;
      case "+":
        ronin.vector.active(cmd);
        break;
    }
    this.hide();
  }
  
  this.passive = function(content)
  {
    var key = content[0];
    content.shift();
    this.cmd = new Command(content);
    ronin.module = null;
    
    switch(key) {
      case "@":
        ronin.canvas.passive(this.cmd);
        ronin.module = ronin.canvas;
        break;
      case "/":
        ronin.file.passive(this.cmd);
        ronin.module = ronin.file;
        break;
      case ">":
        ronin.brush.passive(this.cmd);
        ronin.module = ronin.brush;
        break;
      case "|":
        ronin.overlay.passive(this.cmd);
        ronin.module = ronin.overlay;
        break;
      case "^": // TODO
        ronin.translate.passive(this.cmd);
        ronin.module = ronin.translate;
        break;
      case "=": // TODO
        ronin.zoom.passive(this.cmd);
        ronin.module = ronin.zoom;
        break;
      case "$":
        ronin.module = ronin.file;
        break;
      case ":":
        ronin.filter.passive(this.cmd);
        ronin.module = ronin.filter;
        break;
      case "+":
        ronin.vector.passive(this.cmd);
        ronin.module = ronin.vector;
        break;
    }
  }
}