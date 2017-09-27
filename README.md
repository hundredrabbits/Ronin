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
- `speed->` (I:*false* 0, O:*true* 50), The cursor speed.
- `distance->` (I:*false* 0, O:*true* 9999), The cursor distance.
- `->red->` (I:*true* 0, O:*true* 255), The brush color value(red).
- `->green->` (I:*true* 0, O:*true* 255), The brush color value(green).
- `->blue->` (I:*true* 0, O:*true* 255), The brush color value(blue).

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
- `steps`, default 100

### Methods
- `tween:`, no details.
- `stroke:`, no details.

### Ports


## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (CC).
