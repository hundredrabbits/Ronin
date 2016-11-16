function Command(content)
{
  this.content = content;
  
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
  
  this.path = function()
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf("/") >= 0){ return this.content[i]; }
    }
    return null;
  }
  
  this.value = function()
  {
    for (i = 0; i < this.content.length; i++) {
      var test = /[^$\-\d]/.test(this.content[i]);
      if(!test){ return parseFloat(this.content[i]); }
    }
    return null;
  }
  
  this.noise = function()
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf("?") >= 0){ return parseInt(this.content[i].replace('?','')); }
    }
    return null;
  }
  
  this.bang = function()
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf("!") >= 0){ return true; }
    }
    return null;
  }
  
  this.angle = function()
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf("'") >= 0){ return parseFloat(this.content[i].replace('\'','')); }
    }
    return null;
  }
}