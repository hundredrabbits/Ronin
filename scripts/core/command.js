function Command(content)
{
  this.content = content;

  this.inject_position = function(injection)
  {
    console.log("> "+injection);
    console.log("- "+content);
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
      if(this.content[i].indexOf("x") >= 0 && this.content[i].indexOf("/") < 0){ return new Rect(this.content[i]); }
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
  
  this.setting = function(name)
  {
    for (i = 0; i < this.content.length; i++) {
      if(this.content[i].indexOf("=") >= 0){
        var parts = this.content[i].split("=");
        if(parts[0] == name){
          return new Setting(parts[0],parts[1]);
        }
      }
    }
    return null;
  }

  this.text = function()
  {
    var content_str = this.content.join(" ");
    if(content_str.indexOf("\"") < 0){ return null; }
    return content_str.split("\"")[1];
  }

  this.methods = function()
  {
    var a = [];
    for(i in this.content){
      if(this.content[i].indexOf(":") > 0){
        a.push(this.content[i]);
      }
    }
    return a;
  }

  this.method = function(name)
  {
    for(i in this.methods()){
      var m = new Method(this.methods()[i]);
      if(m.name == name){ return m; }
    }
  }
}