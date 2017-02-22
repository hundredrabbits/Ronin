function Preset(rune)
{
  Module.call(this,rune);

  this.collection = {};
  this.collection["grid"] = {};
  this.collection["grid"]["glyph"] = "@ 300x300; @ layer=background ; @ #A1A1A1 ; . 15x15 4,4 ; @ layer=main";
  this.collection["grid"]["icon"] = "@ 360x360; @ layer=background ; @ #000000 ; . 15x15 4,4 ; @ layer=main";

  this.collection["custom"] = {};
  this.collection["custom"]["default"] = "@ 720x405 ; / ../assets/todo.jpg 720x 0,0 ; % chromatic 2 ; / ../assets/logo.png 35x35 15,355";
  this.collection["custom"]["black"] = "@ 720x405 #ff0000 ; / ../assets/todo.jpg 720x 0,-30 ; % grey ; % sharpen ; % sharpen ; % chromatic 2 ; @ layer=icon ; / ../assets/logo.png 35x35 15,355 "; 

  this.collection["photo"] = {};
  this.collection["photo"]["black"] = "@ 720x405 #ff0000 ; / ../assets/todo.jpg 720x 0,-30 ; % sharpen ; % grey % chromatic 2 ; % grey";

  this.collection["brush"] = {};
  this.collection["brush"]["radial6"] = "> 600,400 60';> 600,400 120';> 600,400 180';> 600,400 240';> 600,400 300'";
  this.collection["brush"]["radial8"] = "> 600,400 45';> 600,400 90';> 600,400 135';> 600,400 180';> 600,400 225';> 600,400 270';> 600,400 315'";

  this.collection["vector"] = {};
  this.collection["vector"]["ronin"] = "+ M150,53 A-96,97 0 0,0 246,150 M150,246 A97,-96 0 0,0 53,150 M53,101 A-48,-48 0 0,0 101,53 M246,101 A48,-48 0 0,1 198,53 M53,198 A-48,48 0 0,1 101,246 M246,198 A48,48 0 0,0 198,246 stroke_width=45 line_cap=square stroke_color=black";
  this.collection["vector"]["circle"] = "+ M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0";

  this.active = function(cmd)
  {
    var input = cmd.content.join(" ").trim().split(" ")[0];
    var name  = cmd.content.join(" ").trim().split(" ")[1];
    var value = this.collection[input][name];

    if(this.collection[input] && this.collection[input][name]){
      setTimeout(function(){ 
        commander.element.setAttribute('class','visible');
        commander.element_input.focus(); 
        commander.element_input.value = value;
      }, 100);
    }
  }

  this.hint = function(cmd)
  {
    var input = cmd.content.join(" ").trim().split(" ")[0];
    var name  = cmd.content.join(" ").trim().split(" ")[1];
    var s = this.pad(cmd.content.join(" "));

    if(this.collection[input] && this.collection[input][name]){
      s += this.collection[input][name];
    }
    else if(this.collection[input]){
      for(key in this.collection[input]) {
        s += key+" ";
      }
    }
    else{
      for(key in this.collection) {
        s += key+" ";
      }
    }
    return s;
  }
}