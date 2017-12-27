function Type()
{
  Module.call(this,"type");

  this.settings = {color:"#000000",font:"Gotham Light",anchor:"center"}

  this.methods.write = new Method("write","text&x,y|WxH","Draw text",function(q){

    var rect = q[1];
    var size = rect.height * 2
    ronin.preview.clear();

    ronin.cursor.target.context().textAlign = ronin.type.settings.anchor;
    ronin.cursor.target.context().font = size+"px "+ronin.type.settings.font.replace("+"," ");
    ronin.cursor.target.context().fillText(q[0].replace("+"," "),rect.x * 2,(rect.y * 2)+size);
  })

  this.preview = function(q)
  {
    if(!q.methods.write || !q.methods.write[1]){ return; }

    var rect = q.methods.write[1];
    var size = rect.height * 2
    
    ronin.preview.clear();

    ronin.preview.context().textAlign = this.settings.anchor;
    ronin.preview.context().font = size+"px "+this.settings.font.replace("+"," ");
    ronin.preview.context().fillText(q.methods.write[0].replace("+"," "),rect.x * 2,(rect.y * 2)+size);
  }
}