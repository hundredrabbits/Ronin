function Guide(position,rect)
{
  this.position = position;
  this.rect = rect;
  
  this.draw = function(context)
  {
    context.beginPath();
    
    if(this.position.x > 0 && this.position.y === 0){
      context.moveTo(this.position.x,0);
      context.lineTo(this.position.x,canvas.height);
    }
    else if(this.position.x === 0 && this.position.y > 0){
      context.moveTo(0,this.position.y);
      context.lineTo(canvas.width,this.position.y);
    }
    else if(this.position.x > 0 && this.position.y > 0 && this.rect.w > 0 && this.rect.h > 0){
      context.moveTo(this.position.x,0);
      context.lineTo(this.position.x,200);
      context.lineTo(x + w,y);
      context.lineTo(x + w,y + h);
      context.lineTo(x,y + h);
      context.lineTo(x,y);
    }
    else{
      console.log(this.position);
    }
    
    context.lineCap="round";
    context.lineWidth = 1;
    context.strokeStyle = "rgba(255,0,0,1)";
    context.stroke();
    context.closePath();
  }
}