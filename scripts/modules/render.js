function Render(rune)
{
  Module.call(this,rune);
  
  this.filters = {};

  this.add_method(new Method("balance",["color"]));
  this.add_method(new Method("stencil",["angle","color"]));
  this.add_method(new Method("chromatic",["position","float"]));

  this.filters["balance"] = new Filter_Balance();
  this.filters["grey"] = new Filter_Grey();
  this.filters["stencil"] = new Filter_Stencil();
  this.filters["invert"] = new Filter_Invert();
  this.filters["chromatic"] = new Filter_Chromatic();
  this.filters["sharpen"] = new Filter_Sharpen();
  this.filters["saturate"] = new Filter_Saturate();
  this.filters["contrast"] = new Filter_Contrast();

  this.stencil = function(cmd,preview = false)
  {
    var f = new Filter_Stencil();

    if(preview){ f.preview(cmd); }
    else{ f.render(cmd); }
  }

  this.chromatic = function(cmd,preview = false)
  {
    var f = new Filter_Chromatic();

    if(preview){ f.preview(cmd); }
    else{ f.render(cmd); }

    return "Done.";
  }
}
