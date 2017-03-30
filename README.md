# Ronin

Ronin is a web based drawing application and visual language. 
The repository comes with a script that fires Ronin from within Localhost.
Launch Ronin and press **:**(colon) to display the command prompt. 
Enjoy

## TODOs
  General
    Splash screen
    Hide widget on mouseover
    Add locks
    Merge layers
    Export multiple layers file
  % Render
    balance auto=true ~ auto color
    balance 0.8       ~ equal RGB balance
    mirror ,100       ~ mirror
  Brush
    Texture paint
  Save
    $ 1280x800          ~ Export with size
    Auto saveAs
  History
    Undo shortcut
  > Terminal
    Auto Complete
    Progress update
    Scroll logs
    Expand logs
  ? Interrog
    Inline Help
  / Load
    Load .rin files, instead of "Presets"
    Load default.rin on startup
  * Eye
    Swatches, handle all colors


  this.collection = {};
  this.collection["grid"] = {};
  this.collection["grid"]["glyph"] = "@ 300x300; @ layer=background ; @ #A1A1A1 ; . 15x15 4,4 ; @ layer=main";
  this.collection["grid"]["icon"] = "@ 360x360; @ layer=background ; @ #000000 ; . 15x15 4,4 ; @ layer=main";
  this.collection["grid"]["rune"] = "@ 240x360; @ layer=background ; @ #000000 ; . 15x15 4,4 ; @ layer=main";

  this.collection["custom"] = {};
  this.collection["custom"]["default"] = "@ 720x405 ; / ../assets/todo.jpg 720x 0,0 ; % chromatic 2 ; / ../assets/logo.png 35x35 15,355";
  this.collection["custom"]["black"] = "@ 720x405 #ff0000 ; / ../assets/todo.jpg 720x 0,-30 ; % grey ; % sharpen ; % sharpen ; % chromatic 2 ; @ layer=icon ; / ../assets/logo.png 35x35 15,355 "; 

  this.collection["photo"] = {};
  this.collection["photo"]["black"] = "@ 720x405 #ff0000 ; / ../assets/todo.jpg 720x 0,-30 ; % sharpen 0.2 ; % chromatic 2 ; % grey";

  this.collection["brush"] = {};
  this.collection["brush"]["radial6"] = "> 600,400 60';> 600,400 120';> 600,400 180';> 600,400 240';> 600,400 300'";
  this.collection["brush"]["radial8"] = "> 600,400 45';> 600,400 90';> 600,400 135';> 600,400 180';> 600,400 225';> 600,400 270';> 600,400 315'";

  this.collection["vector"] = {};
  this.collection["vector"]["ronin"] = "+ M150,53 A-96,97 0 0,0 246,150 M150,246 A97,-96 0 0,0 53,150 M53,101 A-48,-48 0 0,0 101,53 M246,101 A48,-48 0 0,1 198,53 M53,198 A-48,48 0 0,1 101,246 M246,198 A48,48 0 0,0 198,246 stroke_width=45 line_cap=square stroke_color=black";
  this.collection["vector"]["circle"] = "+ M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0";
