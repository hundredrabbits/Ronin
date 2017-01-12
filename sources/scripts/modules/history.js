function History(rune)
{
  Module.call(this,rune);
  
  this.cmds = [];
  
  this.active = function(cmd)
  {
    var w = window.open('about:blank','source');
    var html = "";
    
    for (i = 0; i < this.cmds.length; i++) {
      if(this.cmds[i][0] == this.rune){ continue; }
      html += this.cmds[i]+";<br />";
    }
    w.document.write("<title>Source</title><style>body { font-family:courier}</style>"+html+"");
  }
  
  this.add = function(content)
  {
    this.cmds.push(content);
  }
  
  this.widget = function()
  {
    if(this.cmds.length === 0){ return "";}
  
    return "^ "+this.cmds.length+" ";
  }
}