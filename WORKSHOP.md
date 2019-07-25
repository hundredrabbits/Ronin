# Workshop

This workshop is designed to go over the **most commonly used functions** with [Ronin](https://github.com/hundredrabbits/Ronin). The list of all available functions and their usage is located [here](https://github.com/hundredrabbits/Ronin/#library).

- **Part 1**: [Images](#Images) `(open)`, `(import)`, `(crop)`, `(export)`
- **Part 2**: [Draw](#Draw) `(stroke)`, `(fill)`, `(gradient)`, `(clear)`
- **Part 3**: [Filters](#Filters) `(pixels)`, `(saturation)`, `(convolve)`, `(sharpen)`
- **Part 4**: [Events](#Events) `(echo)`, `(on "mouse-down")`, `(on "animate")`, `(on "/a")`

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

For example, a version of that same code with file paths, might look something like the following, notice how the `(rect)` is omitted, if a `(rect)` is not present, the entire canvas size will be exported:

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

This section will cover how to manipulate the pixels of an image.

### Pixels

First let's open an image, ideally one in color, and change every pixel of a selected area:

```
(open $path)
(pixels 
  (rect 100 100 200 200) saturation 10)
```

### saturation

In the previous example, we boosted the saturation of a region of the image, to desaturate an entire image, you can first use `(frame)` which returns the size of the entire canvas, and set the pixel filter to `saturation` and the value to `0.5`:

```
(open $path)
(pixels 
  (frame) saturation 0.5)
```

### convolve

Effects which use the surrounding pixels, or convolution matrix, are used with the `(convolve)` function, you can learn more about it [here](https://en.wikipedia.org/wiki/Kernel_(image_processing)).

### sharpen

```
(open $path)
(convolve 
  (frame) sharpen)
```

Custom convolve kernels can also be created like this:

```
(open $path)
(def blur 
  (
    (-1 -1 -1) 
    (-1 5 -1) 
    (-1 -1 -1)))
(convolve 
  (frame) blur)
```

## Events

This section will demonstrate how to use events in Ronin to create interactive scripts.

### Echo

You can print some content to the screen in Ronin, by using the `(echo)` function, for example:

```
(echo "hello")
```

### MouseDown

Let's use the `(debug)` function to display the position of the mouse cursor in the interface.

```
(on "mouse-down" echo)
```

We can define a function that happens when the `mouse-down` event is detected:

```
; define the function
(defn draw-rect 
  (e) 
  (
    (clear) 
    (fill 
      (rect 
        (of e :x) 
        (of e :y) 100 100) "red")))
; use the function
(on "mouse-down" draw-rect)
```

For more examples of functions, see the [examples](https://github.com/hundredrabbits/Ronin/tree/master/examples).

### Animate

The `animate` event fires around 30 times per second, and is a perfect tool to create animations. Following the previous example, and the pattern of creating a function and binding it to the event, let's make a function that will use the `(time)` to animate a box:

```
; define the function
(defn wob-rect 
  () 
  (
    (clear) 
    (def rect-x 300)
    (def rect-y (add (mul (sin (time 0.005)) 50) 300))
    (fill 
      (rect rect-x rect-y 100 100) "red")))
; use the function
(on "animate" wob-rect)
```

### OSC

Other programs can communicate with Ronin via OSC with the previous pattern. For example, if you send OSC data to the port `49162`, at the path `/a`, the event can be used in Ronin to trigger a function:

```
(on "/a" echo)
```

I hope this workshop has been enlightening, if you have questions or suggestions, please visit the [community](https://hundredrabbits.itch.io/ronin/community). Enjoy!
