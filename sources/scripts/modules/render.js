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

  this.layer = null;

  this.install = function()
  {
    this.layer = new Layer("Render.Preview",this);
    this.layer.element.setAttribute("style","z-index:9000");
    ronin.surface.add_layer(this.layer);
  }
  
  this.active = function(cmd)
  {
    var name = cmd.content[0];

    if(!this.collection[name]){ return; }
    
    return this.collection[name].render(cmd);
  }
  
  this.passive = function(cmd)
  {
    var name = cmd.content[0];
    if(!this.collection[name]){ return; }

    return this.collection[name].preview(cmd);
  }
	
  this.hint = function(cmd)
  {
    var input = cmd.content.join(" ").trim();
    var s = this.pad(input);

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
