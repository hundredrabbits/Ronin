# Ronin
Ronin is a simple open-source graphic design tool.

<img src='https://raw.githubusercontent.com/hundredrabbits/Ronin/master/PREVIEW.jpg' width='600'/>

## Cursor
Include `$` in a query and click on the canvas to inject the cursor position in the query.
- `$ click` inject a **Pos**.
- `$+ click` inject a **Pos**, and append `$+` for multiple positions.
- `$ shift click` inject a **Rect**.

- `#$ click` inject a **Color**.
## Modules
## brush

Missing documentation.

### Methods
- `add:x,y&mirror_x,mirror_y` Add a new pointer to the brush
- `remove:` Remove last pointer
- `pick:x,y` Set brush color to a position's pixel.

## frame

Manager for the canvas size

### Methods
- `resize:WxH` Resize canvas to size.
- `rescale:0.5` Rescale canvas to float.
- `crop:X,Y|WxH` Crop canvas to rect.
- `clear:` Erase entire canvas
- `fill:#f00` Fill entire canvas with color
- `inspect:` View canvas details

## io

File import/export tools.

### Methods
- `open:browser` Press enter to open the file browser.
- `load:browser` Press enter to open the file browser.
- `draw:X,Y|WxH` Draw the loaded image pixels.
- `save:jpg/png` Export canvas.

## path

Trace lines and draw shapes.

### Methods
- `stroke:x,y&` 
- `fill:x,y&` 
- `svg:M0,0 L100,100` 

## magnet

Cursor magnetisation settings, changes are reflected on the grid layer.

### Methods
- `lock:10` Magnetize cursor
- `unlock:` Release cursor

## filter

Pixel filter

### Methods
- `balance:#ff0033` Filter color balance.
- `saturation:#ff00333` Filter color saturation.

## type

Missing documentation.

### Methods
- `write:text&x,y|WxH` Draw text


## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (CC).
