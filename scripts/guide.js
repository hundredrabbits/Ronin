function Guide(position = new Position(),rect = new Rect(),color = new Color())
{
  this.position = position;
  this.rect = rect;
  this.color = color;
  
  this.draw = function(context)
  {
    context.beginPath();
    
    if(this.position.x > 0 && this.position.y > 0 && (this.rect.w > 0 || this.rect.h > 0)){
      context.moveTo(this.position.x,this.position.y);
      context.lineTo(this.position.x + this.rect.w,this.position.y);
      context.lineTo(this.position.x + this.rect.w,this.position.y + this.rect.h);
      context.lineTo(this.position.x,this.position.y + this.rect.h);
      context.lineTo(this.position.x,this.position.y);
    }
    else if(this.position.x > 0 && this.position.y > 0){
      context.moveTo(this.position.x,this.position.y);
      context.lineTo(this.position.x + 10,this.position.y);
      context.lineTo(this.position.x,this.position.y + 10);
      context.lineTo(this.position.x,this.position.y);
    }
    else if(this.position.x > 0 && this.position.y === 0){
      context.moveTo(this.position.x,0);
      context.lineTo(this.position.x,canvas.height);
    }
    else if(this.position.x === 0 && this.position.y > 0){
      context.moveTo(0,this.position.y);
      context.lineTo(canvas.width,this.position.y);
    }
    
    context.lineCap="round";
    context.lineWidth = 1;
    context.strokeStyle = this.color.rgba();
    context.stroke();
    context.closePath();
  }
}