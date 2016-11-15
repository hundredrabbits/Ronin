function Command(cmd_array)
{
  this.cmd_array = cmd_array;
  
  this.rect = function()
  {
    for (i = 0; i < this.cmd_array.length; i++) {
      if(this.cmd_array[i].indexOf("x") >= 0){ return new Rect(this.cmd_array[i]); }
    }
    return null;
  }
  
  this.position = function()
  {
    for (i = 0; i < this.cmd_array.length; i++) {
      if(this.cmd_array[i].indexOf(",") >= 0){ return new Position(this.cmd_array[i]); }
    }
    return null;
  }
  
  this.color = function()
  {
    for (i = 0; i < this.cmd_array.length; i++) {
      if(this.cmd_array[i].indexOf("#") >= 0){ return new Color(this.cmd_array[i]); }
    }
    return null;
  }
  
  this.path = function()
  {
    for (i = 0; i < this.cmd_array.length; i++) {
      if(this.cmd_array[i].indexOf("/") >= 0){ return this.cmd_array[i]; }
    }
    return null;
  }
  
  this.value = function()
  {
    for (i = 0; i < this.cmd_array.length; i++) {
      var test = /[^$\-\d]/.test(this.cmd_array[i]);
      if(!test){ return parseFloat(this.cmd_array[i]); }
    }
    return null;
  }
  
  this.noise = function()
  {
    for (i = 0; i < this.cmd_array.length; i++) {
      if(this.cmd_array[i].indexOf("?") >= 0){ return parseInt(this.cmd_array[i][1]); }
    }
    return null;
  }
  
  this.bang = function()
  {
    for (i = 0; i < this.cmd_array.length; i++) {
      if(this.cmd_array[i].indexOf("!") >= 0){ return true; }
    }
    return null;
  }
}