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
  
  this.active = function(content)
  {
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
    }
    
    this.hide();
  }
  
  this.passive = function(content)
  {
    var key = content[0];
    content.shift();
    this.cmd = new Command(content);
    
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
    }
  }
}