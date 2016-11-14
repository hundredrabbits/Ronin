function Commander(element,element_input)
{
  this.element = element;
  this.element_input = element_input;
  this.cmd = null;
  
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
  
  this.active = function(cmd_array)
  {
    var key = cmd_array[0];
    cmd_array.shift();
    var cmd = new Command(cmd_array);
    
    switch(key) {
      case "@":
        ronin.canvas.active(cmd);
        break;
      case "~": // TODO
        ronin.history.active(cmd);
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
    }
    
    this.hide();
  }
  
  this.passive = function(cmd_array)
  {
    var key = cmd_array[0];
    cmd_array.shift();
    this.cmd = new Command(cmd_array);
    
    switch(key) {
      case "@":
        ronin.canvas.passive(this.cmd);
        ronin.module = ronin.canvas;
        break;
      case "~":
        ronin.history.passive(this.cmd);
        ronin.module = ronin.history;
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
      case ":":
        ronin.filter.passive(this.cmd);
        ronin.module = ronin.filter;
        break;
    }
  }
}