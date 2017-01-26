function Render(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.collection = {};

  this.collection["rotate"] = new Filter_Rotate();
  this.collection["balance"] = new Filter_Balance();
  this.collection["saturation"] = new Filter_Saturation();
  this.collection["stencil"] = new Filter_Stencil();
  this.collection["invert"] = new Filter_Invert();
  this.collection["chromatic"] = new Filter_Chromatic();
  
  this.active = function(cmd)
  {
    if(!this.layer){ this.create_layer(); }

    var name = cmd.content[0];

    if(!this.collection[name]){ return; }
    
    return this.collection[name].render(cmd);
  }
  
  this.passive = function(cmd)
  {
    if(!this.layer){ this.create_layer(); }
    
    var name = cmd.content[0];
    if(!this.collection[name]){ return; }

    return this.collection[name].preview(cmd);
  }
	
  this.hint = function(cmd)
  {
    var input = cmd.content.join(" ").trim().split(" ")[0];
    var s = this.pad(cmd.content.join(" "));

    if(this.collection[input]){
      for (i = 0; i < this.collection[input].parameters.length; i++) {
        s += this.collection[input].parameters[i].name+" ";
      }
    }
    else{
      for (var key in this.collection){
        s += key+" ";
      }  
    }   

    return s;
  }
}
