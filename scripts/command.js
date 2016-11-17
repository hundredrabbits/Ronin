function Command(content)
{
  this.content = raster(content);
  
  // Raster
  
  function raster(array) // @ {50w}x100
  {
    var str = array.join(" ");
    
    var m = str.replace(/(\{(.*)\})/g, function(a) {
      var parts = a.split(/[{}]/);
      for(var e = 0; e < parts.length; e++) {
        if(str.indexOf("{"+parts[e]+"}") == -1){ continue; }
        str = str.replace("{"+parts[e]+"}",converter(parts[e]));
      }
    });
    return str.split(" ");
  }
  
  function converter(str)
  {
    if(str == "50w"){ return "123"; }
    return str;
  }
  
  // Parser
  
  this.any = function()
  {
    if(this.content.join() === ""){ return null; }
    return new Any(this.content);
  }
  
  this.rect = function()
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf("x") >= 0){ return new Rect(this.content[i]); }
    }
    return null;
  }
  
  this.position = function()
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf(",") >= 0){ return new Position(this.content[i]); }
    }
    return null;
  }
  
  this.color = function()
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf("#") >= 0){ return new Color(this.content[i]); }
    }
    return null;
  }
  
  this.filepath = function()
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf("/") >= 0){ return new Filepath(this.content[i]); }
    }
    return null;
  }
  
  this.value = function()
  {
    for (i = 0; i < this.content.length; i++) {
      var test = /[^$\-\d]/.test(this.content[i]);
      if(!test && this.content[i] !== ""){ return new Value(this.content[i]); }
    }
    return null;
  }
  
  this.range = function()
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf("..") >= 0){ return new Range(this.content[i]); }
    }
    return null;
  }
  
  this.bang = function()
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf("!") >= 0){ return new Bang(); }
    }
    return null;
  }
  
  this.angle = function()
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf("'") >= 0){ return new Angle(this.content[i]); }
    }
    return null;
  }
  
  this.variable = function(name)
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf(name+":") >= 0){ return Variable(this.content[i]); }
    }
    return null;
  }
}