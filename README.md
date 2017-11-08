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
- `add:x,y&mirror_x,mirror_y` Add a new pointer to the brush
- `remove:` Remove last pointer
- `pick:x,y` Set brush color to a position's pixel.

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
- `lock:10x10` Magnetize cursor
- `unlock:` Release cursor

### Settings
- `size`, default 0
- `step`, default 4

### Ports

## filter

Pixel filter

### Methods
- `balance:#ff0033` Filter color balance.

### Settings

### Ports


## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (CC).
