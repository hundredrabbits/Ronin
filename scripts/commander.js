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
  
  this.validate = function()
  {
    var parts = this.element_input.value.split(" ");
    
    // Canvas
    if(parts[0] == ":@"){
      canvas.setAttribute('width',parts[1]+"px");
      canvas.setAttribute('height',parts[2]+"px");
    }
    
    // Brush
    if(parts[0] == ":+"){
      parts.shift();
      brush.add(parts);
    }
    if(parts[0] == ":-"){
      parts.shift();
      brush.remove(parts);
    }
    
    // Save
    if(parts[0] == ":$"){
      var d=canvas.toDataURL("image/png");
      var w=window.open('about:blank','image from canvas');
      w.document.write("<title>"+parts[1]+"</title><img src='"+d+"' alt='from canvas'/>");
    }
    
    // Load
    if(parts[0] == ":/"){
      base_image = new Image();
      base_image.src = 'img/base.png';
      base_image.onload = function(){
        context.drawImage(base_image, 100, 100);
      }
    }
    
    // Guides
    if(parts[0] == ":|"){
      console.log("!!");
    }
    this.hide();
  }
  
  this.passive = function()
  {
    var parts = this.element_input.value.split(" ");
    
    // Guides
    if(parts[0] == ":|"){
      console.log("!!");
    }
    
    // Draw
    if(parts[0] == ":/"){
      base_image = new Image();
      base_image.src = 'img/base.png';
      base_image.onload = function(){
        context.drawImage(base_image, 100, 100);
      }
    }
  }
}