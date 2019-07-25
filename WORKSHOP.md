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

To import an image onto the current canvas, type the following text, drag an image file onto the Ronin window and press `cmd+r`:

```
(import $path 
  (rect 50 100 250 200))
```

The previous code will import an image, and position it at `50,100`, at a size of `250x200`. Alternatively, you could use a `(pos)` to position the image and not resize it.

```
(import $path 
  (pos 50 100))
```

### Export

To export the resulting image, type the following text, drag an image file onto the Ronin window, then drag a folder and add the new file's name, and press `cmd+r`:

```
(import $path 
  (pos 50 100))
(export $path)
```

### Crop

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

