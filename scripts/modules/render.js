function Render(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  this.collection = {};

  this.collection["rotate"] = new Filter_Rotate();
  this.collection["balance"] = new Filter_Balance();
  this.collection["grey"] = new Filter_Grey();
  this.collection["stencil"] = new Filter_Stencil();
  this.collection["invert"] = new Filter_Invert();
  this.collection["chromatic"] = new Filter_Chromatic();
  this.collection["sharpen"] = new Filter_Sharpen();
  
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
	
  this.hint = function(content)
  {
    var name = content.trim().replace(this.rune,"").trim().split(" ");

    var h = "";
    if(this.collection[name]){
      for (i = 0; i < this.collection[name].parameters.length; i++) {
        h += this.collection[name].parameters[i].name+" ";
      }
    }
    else{
      for (var key in this.collection){
        h += key+" ";
      }  
    }
    return this.pad(content)+h;   
  }

}
