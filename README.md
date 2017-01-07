# Ronin
## Basics
Ronin is a web based drawing application and visual language. Launch index.html and press **:**(colon) to display the command prompt. Input the commands below to interface with the different tools. 
```
:
```
### Loading/Saving
Requires you to run Ronin through localhost. Navigate to the Ronin folder, and run the simple http server.
```
cd /path/to/ronin/                ; Navigate to Ronin through the terminal
python -m SimpleHTTPServer 8000   ; Start localhost
http://localhost:8000/            ; Enjoy Ronin
```
### Controls
```
ctrl                              ; Draw Overlays
alt                               ; Drag Surface
shift                             ; Erase
shift+ctrl                        ; Eyedrop
shift+alt                         ; Move Layer
```
## Modules
### # Surface
Missing documentation.
- Parameters: `Rect` `Color` `Bang` 
- Variables: `layer` 

### / FileLoad
Missing documentation.
- Parameters: `Filepath` `Position` `Rect` 
- Variables: 

### $ FileSave
Missing documentation.
- Parameters: `Any` 
- Variables: 

### ^ History
Missing documentation.
- Parameters: 
- Variables: 

### | Overlay
Missing documentation.
- Parameters: `Position` `Rect` 
- Variables: 

### % Render
Missing documentation.
- Parameters: `Any` 
- Variables: 

### > Brush
Missing documentation.
- Parameters: `Position` `Rect` `Angle` `Color` `Value` `Bang` 
- Variables: `natural` `banking` 

### . Eraser
Missing documentation.
- Parameters: `Value` 
- Variables: 

### * Eye
Missing documentation.
- Parameters: 
- Variables: 

### & Typographe
Missing documentation.
- Parameters: `Position` `Color` `Value` 
- Variables: `text` 

### _ Stroke
Missing documentation.
- Parameters: `Any` 
- Variables: 

### + Vector
Missing documentation.
- Parameters: `Any` `Position` 
- Variables: 

### ? Help
Missing documentation.
- Parameters: 
- Variables: 

## Units
```
5                                 ; value:    5
5,7                               ; position: 5x 7y
7x9                               ; rect:     7w 9h
#ff0000                           ; color:    red
0..5                              ; random:   0.0-5.0
45'                               ; degree:   45/365
rate=10                           ; variable: rate = 10
```
## Presets
### Radial Brush
```
# 8 strands
> 600,400 45';> 600,400 90';> 600,400 135';> 600,400 180';> 600,400 225';> 600,400 270';> 600,400 315'
# 6 strands
> 600,400 60';> 600,400 120';> 600,400 180';> 600,400 240';> 600,400 300'
```
### Symmetry Brush
```
# XY
> 400x 3
# Angular brushes
> 400x 1,1;> 400x 2,2;> 400x 3,3; > 1,1;> 2,2;> 3,3;
```
### Angular Brush
```
# Light
> 1,1;> 2,2;> 3,3;> 4,4
# Hard
> 2,2;> 4,4;> 6,6;> 8,8
# Symmetric Light
> 1,1 600x;> 2,2 600x;> 3,3 600x;> 4,4 600x
```