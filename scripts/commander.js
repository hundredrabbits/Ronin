function Commander(element,element_input)
{
  this.element = element;
  this.element_input = element_input;
  
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
      case "~":
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
      case "^":
        ronin.translate.active(cmd);
        break;
      case "=":
        ronin.zoom.active(cmd);
        break;
      case "#":
        ronin.layers.active(cmd);
        break;
      case ":":
        ronin.filter.active(cmd);
        break;
    }
    
    this.hide();
    
    /*
    var parts = command;
    
    // Brush
    if(parts[0] == "&"){
      parts.shift();
      brush.settings(parts);
    }
    
    // Pointers
    if(parts[0] == ">"){
      parts.shift();
      brush.add(parts);
    }
    
    // Save
    if(parts[0] == "$"){
      var d=canvas.toDataURL("image/png");
      var w=window.open('about:blank','image from canvas');
      w.document.write("<title>"+parts[1]+"</title><img src='"+d+"' alt='from canvas'/>");
    }
    
    // Load
    if(parts[0] == "/"){
      parts.shift();
      ronin.load_image(parts);
    }
    
    // Fill
    if(parts[0] == "*"){
      parts.shift();
      ronin.fill(parts);
    }
    
    // Guides
    if(parts[0] == "|"){
      parts.shift();
      ronin.add_guide(parts);
    }
    
    */
  }
  
  this.passive = function(cmd_array)
  {
    var key = cmd_array[0];
    cmd_array.shift();
    var cmd = new Command(cmd_array);
    
    switch(key) {
      case "@":
        ronin.canvas.passive(cmd);
        break;
      case "~":
        ronin.history.passive(cmd);
        break;
      case "/":
        ronin.file.passive(cmd);
        break;
      case ">":
        ronin.brush.passive(cmd);
        break;
      case "|":
        ronin.overlay.passive(cmd);
        break;
      case "^":
        ronin.translate.passive(cmd);
        break;
      case "=":
        ronin.zoom.passive(cmd);
        break;
      case "#":
        ronin.layers.passive(cmd);
        break;
      case ":":
        ronin.filter.passive(cmd);
        break;
    }
    
    /*
    
    // Draw
    if(parts[0] == "/"){
      parts.shift();
      parts.shift();
      ronin.guide(parts);
    }
    */
  }
}