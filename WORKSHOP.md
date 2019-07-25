# Workshop

This workshop is designed to go over the **most commonly used functions** with [Ronin](https://github.com/hundredrabbits/Ronin). The list of all available functions and their usage is located [here](https://github.com/hundredrabbits/Ronin/#library).

- **Part 1**: [Images](#Images) `(open)`, `(import)`, `(crop)`, `(export)`
- **Part 2**: [Draw](#Draw) `(stroke)`, `(fill)`, `(gradient)`, `(clear)`
- **Part 3**: [Filters](#Filters) `(pixels)`, `(saturation)`, `(convolve)`, `(sharpen)`
- **Part 4**: [Events](#Events) `(on)`, `(on "mouse-move")`, `(on "animate")`, `(on "/a")`

## Images

This section will teach the basics of opening, cropping and saving an image file. You can use the `$path` help to quickly get an image's path into Ronin, by writing `$path` and dragging a file onto the Ronin window.

### Open

To import an image, and resize the canvas to fit the image size, type the following text, drag an image file onto the Ronin window and press `cmd+r`:

```
(open $path)
```

### Import

To import an image onto the current canvas, type the following text, drag an image file onto the Ronin window, trace a shape in the canvas and press `cmd+r`:

```
(import $path 
  (guide $rect))
```

The previous code will import an image, and preserve its ratio. Alternatively, you could use a `$line` to stretch the image, or a `$pos` to simply draw the image at its original size.

```
(import $path 
  (guide $line))
```

### Crop

To crop the canvas, type the following text, drag an image file onto the Ronin window press `cmd+r`:

```
(import $path 
  (pos 0 0))
(crop 
  (rect 50 50 300 300))
```

### Export

To export the resulting image, type the following text, drag an image file onto the Ronin window, then drag a folder and add the new file's name, and press `cmd+r`:

```
(import $path)
(export $path)
```

For example, a version of that same code with file paths, might look something like the following, notice how the `(rect)` is omitted:

```
(import "~/Desktop/photo.jpg")
(export "~/Desktop/export.png")
```

## Draw

### Stroke

### Fill

### Gradient

### Clear

## Pixels

### Pixels

### saturation

### convolve

### sharpen

## Events

### On

### MouseMove

### Animate

### OSC

