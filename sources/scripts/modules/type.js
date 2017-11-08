function Type()
{
  Module.call(this,"type");

  this.settings = {color:"#000000",font:"Arial"}

  this.methods.write = new Method("write","text&x,y|WxH","Draw text",function(q){

    ronin.preview.clear();

    var rect = q[1];
    var size = rect.height * 2
    ronin.preview.clear();

    ronin.render.context().font = size+"px "+ronin.type.settings.font;
    ronin.render.context().fillText(q[0],rect.x * 2,(rect.y * 2)+size);
  })

  this.preview = function(q)
  {
    if(!q.methods.write || !q.methods.write[1]){ return; }

    var rect = q.methods.write[1];
    var size = rect.height * 2
    
    ronin.preview.clear();

    ronin.preview.context().font = size+"px "+this.settings.font;
    ronin.preview.context().fillText(q.methods.write[0],rect.x * 2,(rect.y * 2)+size);
  }
}