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

## frame

Manager for the canvas size

### Methods
- `resize:WxH` Resize canvas to size.
- `rescale:0.5` Rescale canvas to float.
- `crop:X,Y|WxH` Crop canvas to rect.
- `clear:` Erase entire canvas
- `fill:#f00` Fill entire canvas with color
- `inspect:` View canvas details

### Settings

## io

File import/export tools.

### Methods
- `load:browser` Press enter to open the file browser.
- `draw:X,Y|WxH` Draw the loaded image pixels.
- `save:jpg/png` Export canvas.

### Settings

## path

Trace lines and to draw shapes.

### Methods
- `stroke:x,y&` 
- `fill:x,y&` 
- `svg:M0,0 L100,100` 

### Settings
- `thickness`, default 4
- `color`, default red
- `cap`, default square

## magnet

Cursor magnetisation settings, changes are reflected on the grid layer.

### Methods
- `lock:10` Magnetize cursor
- `unlock:` Release cursor

### Settings
- `size`, default 0
- `step`, default 4

## filter

Pixel filter

### Methods
- `balance:#ff0033` Filter color balance.
- `saturation:0.5,0.5` Filter color saturation.

### Settings

## type

Missing documentation.

### Methods
- `write:text&x,y|WxH` Draw text

### Settings
- `color`, default #000000
- `font`, default Gotham Light
- `anchor`, default center


## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (CC).
