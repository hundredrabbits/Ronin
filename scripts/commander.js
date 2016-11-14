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
        ronin.history.active(params);
        break;
      case "$":
        ronin.save.active(params);
        break;
      case "/":
        ronin.load.active(params);
        break;
      case "&":
        ronin.brush.active(params);
        break;
      case ">":
        ronin.pointer.active(params);
        break;
      case "|":
        ronin.overlay.active(params);
        break;
      case "^":
        ronin.translate.active(params);
        break;
      case "=":
        ronin.zoom.active(params);
        break;
      case "#":
        ronin.layers.active(params);
        break;
      case ":":
        ronin.filter.active(params);
        break;
    }
    
    this.hide();
    
    /*
    var parts = command;
    
    // Canvas
    if(parts[0] == "@"){
      canvas.setAttribute('width',parts[1]+"px");
      canvas.setAttribute('height',parts[2]+"px");
      ronin.guides_element.setAttribute('width',parts[1]+"px");
      ronin.guides_element.setAttribute('height',parts[2]+"px");
    }
    
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
        ronin.history.passive(params);
        break;
      case "/":
        ronin.load.passive(params);
        break;
      case "&":
        ronin.brush.passive(params);
        break;
      case ">":
        ronin.pointer.passive(params);
        break;
      case "|":
        ronin.overlay.passive(params);
        break;
      case "^":
        ronin.translate.passive(params);
        break;
      case "=":
        ronin.zoom.passive(params);
        break;
      case "#":
        ronin.layers.passive(params);
        break;
      case ":":
        ronin.filter.passive(params);
        break;
    }
    
    /*
    // Guides
    if(parts[0] == "|"){
      parts.shift();
      ronin.guide(parts);
    }
    
    // Draw
    if(parts[0] == "/"){
      parts.shift();
      parts.shift();
      ronin.guide(parts);
    }
    */
  }
}