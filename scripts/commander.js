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
  
  this.validate = function(command)
  {
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
    this.hide();
  }
  
  this.passive = function()
  {
    var parts = this.element_input.value.split(" ");
    
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
  }
}