# Ronin
Ronin is a simple open-source graphic design tool.

<img src='https://raw.githubusercontent.com/hundredrabbits/Ronin/master/PREVIEW.jpg' width='600'/>

## Modules
## brush

Missing documentation.

### Settings
- `size`, default 4
- `color`, default #000
- `opacity`, default 1

### Methods

### Ports
- `speed->` **(0/50)** The cursor speed.
- `distance->` **(0/9999)** The cursor distance.
- `->red->` **(0/255)** The brush color value(red).
- `->green->` **(0/255)** The brush color value(green).
- `->blue->` **(0/255)** The brush color value(blue).

## frame

Manager for the canvas size

### Settings
- `width`, default 930
- `height`, default 540

### Methods
- `resize:`, no details.
- `rescale:`, no details.
- `crop:`, no details.

### Ports

## line

Drawing lines. Tween expects something in the `$&$>>$&$` format.

### Settings

### Methods
- `tween:`, no details.
- `stroke:`, no details.

### Ports
- `step->` **(0/100)** The tween line index..
- `->thickness->` **(1/100)** The tween line thickness..

## io

File import/export tools.

### Settings
- `anchor`, default [object Object]

### Methods
- `import:`, no details.
- `load:`, no details.
- `save:`, no details.

### Ports

## path

Trace lines and to draw shapes.

### Settings
- `thickness`, default 30
- `color`, default black
- `cap`, default square

### Methods
- `stroke:`, no details.
- `fill:`, no details.

### Ports

## magnet

Cursor magnetisation settings, changes are reflected on the grid layer.

### Settings
- `size`, default 0
- `step`, default 4

### Methods
- `lock:`, no details.
- `unlock:`, no details.

### Ports


## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (CC).
