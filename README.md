# Ronin
Ronin is a simple open-source graphic design tool.

<img src='https://raw.githubusercontent.com/hundredrabbits/Ronin/master/PREVIEW.jpg' width='600'/>

## Modules
## brush
### Settings
- `size`, default 4
- `color`, default #000
- `opacity`, default 1

### Methods

### Ports
- `speed->` *0/50* The cursor speed.
- `distance->` *0/9999* The cursor distance.
- `->red->` *0/255* The brush color value(red).
- `->green->` *0/255* The brush color value(green).
- `->blue->` *0/255* The brush color value(blue).

## eraser
### Settings

### Methods

### Ports

## frame
### Settings
- `width`, default 930
- `height`, default 540

### Methods
- `resize:`, no details.
- `rescale:`, no details.
- `crop:`, no details.

### Ports

## line
### Settings

### Methods
- `tween:`, no details.
- `stroke:`, no details.

### Ports
- `step->` *0/100* The tween line index..
- `->thickness->` *4/100* The tween line thickness..


## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (CC).
