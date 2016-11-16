function Vector()
{
  Module.call(this);
  
  // Module
  
  this.passive = function(cmd)
  {
    ronin.overlay.clear();
    ronin.overlay.context().lineCap="round";
    ronin.overlay.context().lineWidth = ronin.brush.size;
    ronin.overlay.context().strokeStyle = "red";
    ronin.overlay.context().stroke(new Path2D(cmd.content.join(" ")));
  }
  
  this.active = function(cmd)
  {
    ronin.overlay.clear();
    ronin.canvas.context().lineCap="round";
    ronin.canvas.context().lineWidth = ronin.brush.size;
    ronin.canvas.context().strokeStyle = ronin.brush.color.rgba();
    ronin.canvas.context().stroke(new Path2D(cmd.content.join(" ")));
  }
  
  this.hint = function(cmd)
  {
    return "Vector: ";
  }
  
  // + M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0 ; Draw a circle
  // M100,100 h200 a20,20 0 0 1 20,20 v200 a20,20 0 0 1 -20,20 h-200 a20,20 0 0 1 -20,-20 v-200 a20,20 0 0 1 20,-20 z
  
  // Large
  // @ 128x128;> 2 #ffffff;+ M 64, 64 m -50, 0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0;+ M 64, 64 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0;+ M 64, 64 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0;+ M 64, 64 m -35, 0 a 35,35 0 1,0 70,0 a 35,35 0 1,0 -70,0;+ M 64, 64 m -30, 0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0;+ M 64, 64 m -25, 0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0;+ M 64, 64 m -20, 0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0;+ M 64, 64 m -15, 0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0;+ M 64, 64 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0;+ M 64, 64 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0;$ logo
  // Icon
  // @ 128x128;> 4 #ffffff;+ M 64, 64 m -50, 0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0;+ M 64, 64 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0;+ M 64, 64 m -30, 0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0;+ M 64, 64 m -20, 0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0;+ M 64, 64 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0;$ logo
}