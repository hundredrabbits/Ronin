# Ronin
Ronin is a simple open-source graphic design tool.

<img src='https://raw.githubusercontent.com/hundredrabbits/Ronin/master/PREVIEW.jpg' width='600'/>

## Cursor
- `$` replace with **Pos**.
- `$+shift` replace with **Rect**.

## Modules
## brush

Missing documentation.

### Methods

### Settings
- `size`, default 4
- `color`, default #000
- `opacity`, default 1

### Ports
- `speed->` **(0/50)** The cursor speed.
- `distance->` **(0/9999)** The cursor distance.
- `->red->` **(0/255)** The brush color value(red).
- `->green->` **(0/255)** The brush color value(green).
- `->blue->` **(0/255)** The brush color value(blue).

## frame

Manager for the canvas size

### Methods
- `resize:WxH` Resize canvas to size.
- `rescale:0.5` Rescale canvas to float.
- `crop:X,Y|WxH` Crop canvas to rect.
- `clear:` Erase entire canvas
- `fill:#f00` Fill entire canvas with color

### Settings
- `width`, default 930
- `height`, default 540

### Ports

## line

Drawing lines. Tween expects something in the `$&$>>$&$` format.

### Methods
- `stroke:x1,y1&x2,y2` Stroke positions.
- `tween:tween:$&$>>$&$ step->thickness` Stroke lines between strokes.

### Settings

### Ports
- `step->` **(0/100)** The tween line index..
- `->thickness->` **(1/100)** The tween line thickness..

## io

File import/export tools.

### Methods
- `load:browser` Press enter to open the file browser.
- `draw:X,Y|WxH` Draw the loaded image pixels.
- `save:name` Export canvas.

### Settings
- `anchor`, default [object Object]

### Ports

## path

Trace lines and to draw shapes.

### Methods
- `stroke:x,y&` 
- `fill:x,y&` 

### Settings
- `thickness`, default 30
- `color`, default black
- `cap`, default square

### Ports

## magnet

Cursor magnetisation settings, changes are reflected on the grid layer.

### Methods
- `lock:undefined` undefined
- `unlock:undefined` undefined

### Settings
- `size`, default 0
- `step`, default 4

### Ports


## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (CC).
