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

This section will show how to draw some basic shapes and colorize them.

### Stroke

To draw the outline of any shape, wrap the shape(rect, line, circle, ..) inside of a `(stroke shape width color)` function, like:

```
(stroke 
  (rect 100 100 300 200) 10 "red")
```

### Fill

To fill the inside of any shape, wrap the shape(rect, line, circle, ..) inside of a `(fill shape color)` function, like:

```
(fill 
  (rect 100 100 300 200) "orange")
```

### Gradient

To colorize a stroke or a fill with a gradient, use the `(gradient line color)`:

```
(clear)
(fill 
  (circle 300 300 200) 
  (gradient 
    (line 0 0 500 500) 
    ("white" "black")))
```

To better understand how the line affects the coloring of the circle, wrap the `$line` inside a `(guide)`, as follows:

```
(clear)
(fill 
  (circle 300 300 200) 
  (gradient 
    (guide $line)
    ("white" "black")))
```

### Clear

In the previous example, we used the `(clear)` function which clears the canvas, but it can also be used to clear only a part of the canvas:

```
(clear)
(fill 
  (frame) "red")
(clear 
  (rect 100 100 300 300))
```

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

